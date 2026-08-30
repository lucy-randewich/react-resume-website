import { Box } from "@mui/material";
import { useEffect, useId, useRef, useState } from "react";
import { LiveTankOfflineState } from "./LiveTankOfflineState";

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          host?: string;
          playerVars?: Record<string, number>;
          events?: {
            onReady?: (event: { target: YouTubePlayer }) => void;
            onStateChange?: (event: {
              data: number;
              target: YouTubePlayer;
            }) => void;
            onError?: () => void;
          };
        },
      ) => YouTubePlayer;
      PlayerState?: {
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubePlayer {
  destroy: () => void;
  getDuration: () => number;
  getVideoData: () => { isLive?: boolean };
}

interface LiveTankPlayerProps {
  videoId: string;
  onStatusChange?: (status: LiveTankStatus) => void;
}

export type LiveTankStatus = "checking" | "live" | "offline";

const youtubeScriptId = "youtube-iframe-api";

const loadYouTubeApi = () =>
  new Promise<void>((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const existingScript = document.getElementById(youtubeScriptId);
    const previousCallback = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve();
    };

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.id = youtubeScriptId;
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.body.appendChild(script);
  });

export const LiveTankPlayer = ({
  videoId,
  onStatusChange,
}: LiveTankPlayerProps) => {
  const playerId = useId().replaceAll(":", "");
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [playerStatus, setPlayerStatus] = useState<LiveTankStatus>("checking");

  useEffect(() => {
    let isMounted = true;
    let statusTimer: number | undefined;
    onStatusChange?.("checking");

    const updateStatus = (status: LiveTankStatus) => {
      if (!isMounted) return;
      setPlayerStatus(status);
      onStatusChange?.(status);
    };

    loadYouTubeApi().then(() => {
      if (!isMounted || !window.YT?.Player) {
        return;
      }

      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            statusTimer = window.setTimeout(() => {
              const videoData = event.target.getVideoData();
              const isLive =
                videoData.isLive === true || event.target.getDuration() === 0;

              updateStatus(isLive ? "live" : "offline");
            }, 1200);
          },
          onStateChange: (event) => {
            const endedState = window.YT?.PlayerState?.ENDED ?? 0;

            if (event.data === endedState) {
              updateStatus("offline");
            } else if (event.target.getVideoData().isLive === true) {
              updateStatus("live");
            }
          },
          onError: () => {
            window.clearTimeout(statusTimer);
            updateStatus("offline");
          },
        },
      });
    });

    return () => {
      isMounted = false;
      window.clearTimeout(statusTimer);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [onStatusChange, playerId, videoId]);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 18px 52px rgb(0 0 0 / 28%)"
            : "0 18px 52px rgb(23 23 22 / 10%)",
        aspectRatio: "16 / 9",
      })}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          bgcolor: "#000",
          opacity: playerStatus === "live" ? 1 : 0,
          pointerEvents: playerStatus === "live" ? "auto" : "none",
          "& iframe": {
            display: "block",
            width: "100%",
            height: "100%",
            border: 0,
          },
        }}
      >
        <div id={playerId} />
      </Box>
      {playerStatus === "offline" && <LiveTankOfflineState />}
    </Box>
  );
};
