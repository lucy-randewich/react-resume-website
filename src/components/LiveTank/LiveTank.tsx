import { Box } from "@mui/material";
import { layout } from "../../theme";
import { LiveTankInfo } from "./LiveTankInfo";
import { LiveTankPlayer } from "./LiveTankPlayer";

const shrimpCamVideoId = "aWHxtpEWJeo";

interface LiveTankProps {
  id?: string;
}

export const LiveTank = ({ id }: LiveTankProps) => {
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
          <LiveTankPlayer videoId={shrimpCamVideoId} />
          <LiveTankInfo />
        </Box>
      </Box>
    </section>
  );
};
