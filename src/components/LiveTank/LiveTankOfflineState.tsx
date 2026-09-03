import { alpha, Box, Typography } from "@mui/material";
import { colors } from "../../theme";
import { shrimpAssets } from "../ShrimpTank/shrimp.constants";
import { ShrimpSprite } from "../ShrimpTank/ShrimpSprite";
import { TankBubbles } from "../ShrimpTank/TankBubbles";
import "../ShrimpTank/ShrimpTank.css";

interface LiveTankOfflineStateProps {
  isChecking?: boolean;
}

export const LiveTankOfflineState = ({
  isChecking = false,
}: LiveTankOfflineStateProps) => (
  <Box
    className="tank-shell"
    aria-live="polite"
    sx={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      color: colors.tank.ink,
      bgcolor: colors.tank.water,
      backgroundImage: `linear-gradient(${alpha(colors.paper, 0.08)}, ${alpha(colors.tank.ink, 0.08)}), url('${shrimpAssets.background}')`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }}
  >
    <Box className="tank-light" aria-hidden="true" />
    <TankBubbles />

    <Box
      sx={{
        position: "absolute",
        zIndex: 3,
        top: { xs: 18, sm: 24 },
        left: { xs: 20, sm: 28 },
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "1.7rem", sm: "2.25rem" },
          letterSpacing: "-.045em",
          lineHeight: 1,
        }}
      >
        {isChecking ? "Shrimp cam" : "Stream offline"}
      </Typography>
    </Box>

    <Box
      sx={{
        position: "absolute",
        zIndex: 3,
        top: { xs: 18, sm: 24 },
        right: { xs: 18, sm: 26 },
        display: "flex",
        alignItems: "center",
        gap: 0.75,
        px: 1.15,
        py: 0.65,
        color: colors.tank.score,
        bgcolor: alpha(colors.paper, 0.46),
        border: `1px solid ${alpha(colors.tank.ink, 0.16)}`,
        borderRadius: 999,
        fontSize: ".62rem",
        fontWeight: 800,
        letterSpacing: ".1em",
        lineHeight: 1,
        textTransform: "uppercase",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        component="span"
        sx={{
          width: 6,
          height: 6,
          bgcolor: colors.accent,
          borderRadius: "50%",
          animation: isChecking
            ? "statusPulse 1.6s ease-in-out infinite"
            : "none",
          "@keyframes statusPulse": {
            "0%, 100%": { opacity: 0.45 },
            "50%": { opacity: 1 },
          },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
          },
        }}
      />
      {isChecking ? "Connecting" : "Offline"}
    </Box>

    <Box
      sx={{
        position: "absolute",
        zIndex: 2,
        left: "50%",
        bottom: { xs: "17%", sm: "19%" },
        width: { xs: 86, sm: 112 },
        animation: "offlineShrimpDrift 7s ease-in-out infinite",
        "@keyframes offlineShrimpDrift": {
          "0%, 100%": { transform: "translate(-52%, 1px) rotate(-1deg)" },
          "50%": { transform: "translate(-48%, -9px) rotate(1deg)" },
        },
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          transform: "translateX(-50%)",
        },
      }}
    >
      <ShrimpSprite
        className="offline-shrimp"
        label="Cherry shrimp"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </Box>
  </Box>
);
