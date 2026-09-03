import CloseIcon from "@mui/icons-material/Close";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { alpha, IconButton } from "@mui/material";
import { colors } from "../../theme";

interface TankTopControlsProps {
  isMuted: boolean;
  onClose: () => void;
  onOpenLeaderboard: () => void;
  onToggleAudio: () => void;
}

const controlSx = (right: number) => ({
  position: "absolute",
  zIndex: 3,
  right,
  top: 12,
  color: colors.tank.ink,
  "&:hover": { bgcolor: alpha(colors.paper, 0.45) },
});

export const TankTopControls = ({
  isMuted,
  onClose,
  onOpenLeaderboard,
  onToggleAudio,
}: TankTopControlsProps) => (
  <>
    <IconButton
      className="tank-interface leaderboard-button"
      aria-label="Show leaderboard"
      title="Show leaderboard"
      onClick={onOpenLeaderboard}
      sx={controlSx(94)}
    >
      <LeaderboardOutlinedIcon />
    </IconButton>
    <IconButton
      className="tank-interface sound-button"
      aria-label={isMuted ? "Unmute tank sounds" : "Mute tank sounds"}
      onClick={onToggleAudio}
      sx={controlSx(53)}
    >
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
    <IconButton
      className="tank-interface close-button"
      aria-label="Close shrimp tank"
      onClick={onClose}
      sx={controlSx(12)}
    >
      <CloseIcon />
    </IconButton>
  </>
);
