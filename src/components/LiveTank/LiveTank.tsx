import { Box } from "@mui/material";
import { useState } from "react";
import { layout } from "../../theme";
import { SectionEyebrow, SectionHeading } from "../shared";
import { LiveTankPlayer, type LiveTankStatus } from "./LiveTankPlayer";

const shrimpCamVideoId = "s_mt9HUTN10";
const shrimpCamUrl = `https://youtube.com/live/${shrimpCamVideoId}`;

interface LiveTankProps {
  id?: string;
}

const statusLabels: Record<LiveTankStatus, string> = {
  checking: "Checking stream",
  live: "Live now",
  offline: "Offline",
};

export const LiveTank = ({ id }: LiveTankProps) => {
  const [streamStatus, setStreamStatus] = useState<LiveTankStatus>("checking");

  return (
    <section id={id}>
      <Box
        sx={{
          maxWidth: 1080,
          mx: "auto",
          minHeight: { md: `calc(100vh - ${layout.headerHeight}px)` },
          px: { xs: 2.5, md: 4 },
          py: { xs: 6, md: 6.5 },
          display: "grid",
          alignItems: "center",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              justifyContent: "space-between",
              gap: 2,
              mb: { xs: 2.5, md: 3 },
            }}
          >
          </Box>

          <LiveTankPlayer
            videoId={shrimpCamVideoId}
            youtubeUrl={shrimpCamUrl}
            onStatusChange={setStreamStatus}
          />
        </Box>
      </Box>
    </section>
  );
};
