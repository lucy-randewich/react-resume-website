import { alpha, Box, Typography } from "@mui/material";
import type { LeaderboardEntry } from "../../services/supabase";

interface LeaderboardScoreListProps {
  entries: LeaderboardEntry[];
  hasHighScore: boolean;
}

const LeaderboardHeading = () => (
  <>
    <Typography
      sx={{
        mb: 0.5,
        color: "text.secondary",
        fontSize: ".62rem",
        fontWeight: 800,
        letterSpacing: ".12em",
        textTransform: "uppercase",
      }}
    >
      Shrimp tank
    </Typography>
    <Typography
      component="h2"
      sx={{
        fontFamily: "h2.fontFamily",
        fontSize: "1.5rem",
        lineHeight: 1.2,
      }}
    >
      High scores
    </Typography>
  </>
);

export const LeaderboardScoreList = ({
  entries,
  hasHighScore,
}: LeaderboardScoreListProps) => (
  <Box
    sx={{
      mt: hasHighScore ? 2.5 : 0,
      pt: hasHighScore ? 2.5 : 0,
      borderTop: hasHighScore ? 1 : 0,
      borderColor: "divider",
    }}
  >
    {entries.length === 0 ? (
      <Box sx={{ pr: 4 }}>
        <LeaderboardHeading />
        <Typography sx={{ mt: 1, color: "text.secondary" }}>
          No scores yet.
        </Typography>
      </Box>
    ) : (
      <Box>
        <Box sx={{ pr: 4, mb: 1.4 }}>
          <LeaderboardHeading />
        </Box>
        {entries.map((entry, index) => (
          <Box
            key={entry.id}
            sx={{
              display: "grid",
              gridTemplateColumns: "38px minmax(0, 1fr) auto",
              gap: 1.5,
              minHeight: 46,
              borderTop: 1,
              borderColor: "divider",
              alignItems: "center",
              "&:first-of-type": {
                borderColor: "transparent",
              },
            }}
          >
            <Box
              sx={(theme) => ({
                width: 26,
                height: 26,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                bgcolor:
                  index === 0
                    ? alpha(theme.palette.primary.main, 0.12)
                    : alpha(theme.palette.text.primary, 0.05),
                color:
                  index === 0
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                fontFamily: "h2.fontFamily",
                fontSize: ".95rem",
                lineHeight: 1,
              })}
            >
              {index + 1}
            </Box>
            <Typography
              sx={{
                fontSize: ".9rem",
                fontWeight: index === 0 ? 700 : 600,
                color: index === 0 ? "text.primary" : "text.secondary",
              }}
            >
              {entry.playerName}
            </Typography>
            <Typography
              sx={{
                fontSize: ".92rem",
                fontWeight: 800,
                color: "text.primary",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {entry.score}
            </Typography>
          </Box>
        ))}
      </Box>
    )}
  </Box>
);
