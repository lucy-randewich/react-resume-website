import { alpha, Box } from "@mui/material";
import { colors } from "../../theme";

interface TankScoreProps {
  hasStarted: boolean;
  score: number;
  worldRecord: number | null;
}

export const TankScore = ({
  hasStarted,
  score,
  worldRecord,
}: TankScoreProps) => (
  <Box
    className="tank-score tank-interface"
    aria-label={`Score: ${score}. High score: ${worldRecord ?? "unavailable"}.`}
    sx={{
      position: "absolute",
      zIndex: 3,
      top: hasStarted ? 18 : 78,
      left: 28,
      color: colors.tank.score,
      bgcolor: hasStarted
        ? alpha(colors.paper, 0.24)
        : alpha(colors.paper, 0.34),
      px: hasStarted ? 0.65 : 0.75,
      py: hasStarted ? 0.2 : 0.25,
      fontSize: hasStarted ? ".72rem" : ".68rem",
      letterSpacing: hasStarted ? ".08em" : ".1em",
      fontWeight: 700,
      textTransform: "uppercase",
      transition:
        "top .45s ease, background-color .45s ease, padding .45s ease, font-size .45s ease, letter-spacing .45s ease",
    }}
  >
    score{" "}
    <Box
      component="span"
      sx={{ fontFamily: "h2.fontFamily", fontSize: ".95rem", ml: 0.35 }}
    >
      {String(score).padStart(2, "0")}
    </Box>
    <Box
      component="span"
      sx={{
        display: "block",
        mt: 0.15,
        fontSize: ".52rem",
        letterSpacing: ".07em",
        opacity: 0.82,
        textTransform: "lowercase",
      }}
    >
      high score{" "}
      {worldRecord === null ? "-" : String(worldRecord).padStart(2, "0")}
    </Box>
  </Box>
);
