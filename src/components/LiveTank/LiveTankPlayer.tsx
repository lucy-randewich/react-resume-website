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
  getVideoData: () => { isLive?: boolean };
}

interface LiveTankPlayerProps {
  videoId: string;
  youtubeUrl: string;
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
  youtubeUrl,
  onStatusChange,
}: LiveTankPlayerProps) => {
  const playerId = useId().replaceAll(":", "");
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let isMounted = true;
    onStatusChange?.("checking");

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
            if (!isMounted) return;

            const isLive = event.target.getVideoData().isLive === true;
            setIsOffline(!isLive);
            onStatusChange?.(isLive ? "live" : "offline");
          },
          onStateChange: (event) => {
            const endedState = window.YT?.PlayerState?.ENDED ?? 0;

            if (
              isMounted &&
              (event.data === endedState ||
                event.target.getVideoData().isLive !== true)
            ) {
              setIsOffline(true);
              onStatusChange?.("offline");
            }
          },
          onError: () => {
            if (isMounted) {
              setIsOffline(true);
              onStatusChange?.("offline");
            }
          },
        },
      });
    });

    return () => {
      isMounted = false;
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
      {isOffline ? (
        <LiveTankOfflineState youtubeUrl={youtubeUrl} />
      ) : (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            bgcolor: "#000",
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
      )}
    </Box>
  );
};
