import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { alpha, IconButton } from "@mui/material";
import { colors } from "../../theme";

interface TankTopControlsProps {
  isFocusMode: boolean;
  isMuted: boolean;
  onClose: () => void;
  onOpenLeaderboard: () => void;
  onToggleAudio: () => void;
  onToggleFocusMode: () => void;
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
  isFocusMode,
  isMuted,
  onClose,
  onOpenLeaderboard,
  onToggleAudio,
  onToggleFocusMode,
}: TankTopControlsProps) => (
  <>
    <IconButton
      className="tank-interface leaderboard-button"
      aria-label="Show leaderboard"
      title="Show leaderboard"
      onClick={onOpenLeaderboard}
      sx={controlSx(135)}
    >
      <LeaderboardOutlinedIcon />
    </IconButton>
    <IconButton
      className="tank-interface sound-button"
      aria-label={isMuted ? "Unmute tank sounds" : "Mute tank sounds"}
      onClick={onToggleAudio}
      sx={controlSx(94)}
    >
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
    <IconButton
      className="tank-interface focus-button"
      aria-label={isFocusMode ? "Exit focus mode" : "Enter focus mode"}
      onClick={onToggleFocusMode}
      sx={controlSx(53)}
    >
      {isFocusMode ? <FullscreenExitIcon /> : <FullscreenIcon />}
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
