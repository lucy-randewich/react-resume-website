import { Box } from "@mui/material";
import { layout } from "../../theme";
import { LiveTankPlayer } from "./LiveTankPlayer";

const shrimpCamVideoId = "s_mt9HUTN10";

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
          <Box
            sx={{
              display: "flex",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              justifyContent: "space-between",
              gap: 2,
              mb: { xs: 2.5, md: 3 },
            }}
          ></Box>

          <LiveTankPlayer videoId={shrimpCamVideoId} />
        </Box>
      </Box>
    </section>
  );
};
