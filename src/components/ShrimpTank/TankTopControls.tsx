import CloseIcon from "@mui/icons-material/Close";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { alpha, Box, IconButton } from "@mui/material";
import { colors } from "../../theme";

interface TankTopControlsProps {
  isMuted: boolean;
  onClose: () => void;
  onOpenLeaderboard: () => void;
  onToggleAudio: () => void;
}

const controlSx = {
  color: colors.tank.ink,
  width: { xs: 34, sm: 40 },
  height: { xs: 34, sm: 40 },
  "&:hover": { bgcolor: alpha(colors.paper, 0.45) },
};

export const TankTopControls = ({
  isMuted,
  onClose,
  onOpenLeaderboard,
  onToggleAudio,
}: TankTopControlsProps) => (
  <Box
    sx={{
      position: "absolute",
      zIndex: 5,
      top: { xs: 8, sm: 12 },
      right: { xs: 8, sm: 12 },
      display: "flex",
      alignItems: "center",
      gap: { xs: 0, sm: 0.125 },
    }}
  >
    <IconButton
      className="tank-interface leaderboard-button"
      aria-label="Show leaderboard"
      title="Show leaderboard"
      onClick={onOpenLeaderboard}
      sx={controlSx}
    >
      <LeaderboardOutlinedIcon />
    </IconButton>
    <IconButton
      className="tank-interface sound-button"
      aria-label={isMuted ? "Unmute tank sounds" : "Mute tank sounds"}
      onClick={onToggleAudio}
      sx={controlSx}
    >
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
    <IconButton
      className="tank-interface close-button"
      aria-label="Close shrimp tank"
      onClick={onClose}
      sx={controlSx}
    >
      <CloseIcon />
    </IconButton>
  </Box>
);
