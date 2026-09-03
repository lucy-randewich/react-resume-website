import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { layout } from "../../theme";
import { LiveTankInfo } from "./LiveTankInfo";
import { LiveTankPlayer, type LiveTankStatus } from "./LiveTankPlayer";

const shrimpCamVideoId = "aWHxtpEWJeo";

interface LiveTankProps {
  id?: string;
}

export const LiveTank = ({ id }: LiveTankProps) => {
  const [status, setStatus] = useState<LiveTankStatus>("checking");
  const statusLabel =
    status === "live"
      ? "Live now"
      : status === "offline"
        ? "Offline"
        : "Connecting";

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
          <LiveTankPlayer
            videoId={shrimpCamVideoId}
            onStatusChange={setStatus}
          />
          <Box
            sx={{
              mt: 1.25,
              px: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.1 }}>
              <Typography
                component="h1"
                sx={{ fontSize: ".86rem", fontWeight: 700, lineHeight: 1.4 }}
              >
                Shrimp cam
              </Typography>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.6,
                  color: "text.secondary",
                  fontSize: ".7rem",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor:
                      status === "live"
                        ? "success.main"
                        : status === "offline"
                          ? "text.disabled"
                          : "primary.main",
                  }}
                />
                {statusLabel}
              </Box>
            </Box>
            <LiveTankInfo />
          </Box>
        </Box>
      </Box>
    </section>
  );
};
