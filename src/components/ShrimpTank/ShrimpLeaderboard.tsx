import CloseIcon from "@mui/icons-material/Close";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getLeaderboard,
  isSupabaseConfigured,
  submitLeaderboardScore,
  type LeaderboardEntry,
} from "../../services/supabase";

interface ShrimpLeaderboardProps {
  score: number;
  initialEntries: LeaderboardEntry[] | null;
  initialHasError: boolean;
  onEntriesChange: (entries: LeaderboardEntry[]) => void;
  onClose: () => void;
}

export const ShrimpLeaderboard = ({
  score,
  initialEntries,
  initialHasError,
  onEntriesChange,
  onClose,
}: ShrimpLeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(
    initialEntries,
  );
  const [name, setName] = useState("");
  const [hasSkipped, setHasSkipped] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasError, setHasError] = useState(initialHasError);

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  useEffect(() => {
    setHasError(initialHasError);
  }, [initialHasError]);

  useEffect(() => {
    if (!isSupabaseConfigured || entries !== null || hasError) return;
    let isCurrent = true;
    void getLeaderboard()
      .then((scores) => {
        if (!isCurrent) return;
        setEntries(scores);
        onEntriesChange(scores);
      })
      .catch(() => {
        if (isCurrent) setHasError(true);
      });
    return () => {
      isCurrent = false;
    };
  }, [entries, hasError, onEntriesChange]);

  const lowestScore = entries?.at(-1)?.score ?? 0;
  const canPotentiallySaveScore = score > 0 && !hasSkipped && !hasSubmitted;
  const hasHighScore = Boolean(
    entries &&
      canPotentiallySaveScore &&
      (entries.length < 5 || score > lowestScore),
  );

  const saveScore = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName || isSaving) return;

    setIsSaving(true);
    setHasError(false);
    try {
      const updatedEntries = await submitLeaderboardScore(trimmedName, score);
      setEntries(updatedEntries);
      onEntriesChange(updatedEntries);
      setHasSubmitted(true);
    } catch {
      setHasError(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-label={hasHighScore ? "Add your leaderboard name" : "High scores"}
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.default",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            boxShadow: "0 24px 70px rgb(0 0 0 / 18%)",
            minHeight: canPotentiallySaveScore ? 430 : 310,
          },
        },
        backdrop: {
          sx: { backdropFilter: "blur(8px)" },
        },
      }}
    >
      <IconButton
        aria-label="Close leaderboard"
        onClick={onClose}
        size="small"
        sx={{
          position: "absolute",
          top: 14,
          right: 14,
          color: "text.secondary",
          zIndex: 1,
          "&:hover": {
            bgcolor: "action.hover",
            color: "text.primary",
          },
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          px: { xs: 2.5, sm: 3 },
          pb: { xs: 2.5, sm: 3 },
          pt: canPotentiallySaveScore ? 5 : 2,
          minHeight: canPotentiallySaveScore ? 430 : 310,
          position: "relative",
        }}
      >
        {!isSupabaseConfigured || hasError ? (
          <Typography color="text.secondary">
            The leaderboard is taking a little rest. Please try again later.
          </Typography>
        ) : entries === null ? (
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
        ) : (
          <Box>
            {hasHighScore && (
              <Box component="form" onSubmit={saveScore}>
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
                  <Box
                    sx={(theme) => ({
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: 118,
                      borderRadius: 1.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                    })}
                  >
                    <Typography
                      sx={{
                        fontFamily: "h2.fontFamily",
                        fontSize: "2.3rem",
                        lineHeight: 1,
                        letterSpacing: "-.05em",
                      }}
                    >
                      {score}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.6,
                        fontSize: ".58rem",
                        fontWeight: 700,
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                      }}
                    >
                      pellets
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      autoFocus
                      fullWidth
                      size="small"
                      label="Your name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      slotProps={{ htmlInput: { maxLength: 16 } }}
                      sx={(theme) => ({
                        bgcolor: "background.paper",
                        "& .MuiInputLabel-root": {
                          fontSize: ".82rem",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 1.5,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.divider,
                        },
                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: theme.palette.text.secondary,
                          },
                      })}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      disabled={!name.trim() || isSaving}
                      sx={{
                        mt: 1,
                        py: 0.9,
                        borderRadius: 1.5,
                        fontWeight: 700,
                        boxShadow: "none",
                        "&:hover": { boxShadow: "none" },
                      }}
                    >
                      {isSaving ? "Saving…" : "Save score"}
                    </Button>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", justifyContent: "center", mt: 1.25 }}
                >
                  <Button
                    onClick={() => setHasSkipped(true)}
                    color="inherit"
                    size="small"
                    sx={{ color: "text.secondary", minWidth: 0, px: 1.25 }}
                  >
                    Skip
                  </Button>
                </Box>
              </Box>
            )}
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
                  <Typography sx={{ mt: 1, color: "text.secondary" }}>
                    No scores yet.
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      pr: 4,
                      mb: 1.4,
                    }}
                  >
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
                          color:
                            index === 0 ? "text.primary" : "text.secondary",
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
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
