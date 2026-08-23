import { Box, CircularProgress, Skeleton } from "@mui/material";

interface LeaderboardLoadingStateProps {
  canPotentiallySaveScore: boolean;
}

export const LeaderboardLoadingState = ({
  canPotentiallySaveScore,
}: LeaderboardLoadingStateProps) => (
  <Box aria-hidden="true">
    {canPotentiallySaveScore && (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "88px minmax(0, 1fr)",
          alignItems: "stretch",
          gap: 2,
          p: 1,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Skeleton
          variant="rounded"
          sx={{ minHeight: 118, borderRadius: 1.5 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column", pt: 2 }}>
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={38} sx={{ mt: 1 }} />
        </Box>
      </Box>
    )}
    <Box
      sx={{
        mt: canPotentiallySaveScore ? 2.5 : 0,
        pt: canPotentiallySaveScore ? 2.5 : 0,
        borderTop: canPotentiallySaveScore ? 1 : 0,
        borderColor: "divider",
      }}
    >
      <Skeleton width={140} height={34} sx={{ mb: 1 }} />
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: "grid",
            gridTemplateColumns: "38px minmax(0, 1fr) 36px",
            gap: 1.5,
            minHeight: 46,
            borderTop: 1,
            borderColor: "divider",
            alignItems: "center",
          }}
        >
          <Skeleton width={18} />
          <Skeleton width={`${76 - index * 7}%`} />
          <Skeleton width={24} />
        </Box>
      ))}
    </Box>
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
      }}
    >
      <CircularProgress size={24} />
    </Box>
  </Box>
);
