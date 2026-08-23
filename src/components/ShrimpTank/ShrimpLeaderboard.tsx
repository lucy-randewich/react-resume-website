import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getLeaderboard,
  isSupabaseConfigured,
  submitLeaderboardScore,
  type LeaderboardEntry,
} from "../../services/supabase";
import { LeaderboardLoadingState } from "./LeaderboardLoadingState";
import { LeaderboardScoreForm } from "./LeaderboardScoreForm";
import { LeaderboardScoreList } from "./LeaderboardScoreList";

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
  const [loadedEntries, setLoadedEntries] = useState<LeaderboardEntry[] | null>(
    null,
  );
  const [name, setName] = useState("");
  const [hasSkipped, setHasSkipped] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoadError, setHasLoadError] = useState(false);
  const entries = initialEntries ?? loadedEntries;
  const hasError = initialHasError || hasLoadError;

  useEffect(() => {
    if (!isSupabaseConfigured || entries !== null || hasError) return;
    let isCurrent = true;
    void getLeaderboard()
      .then((scores) => {
        if (!isCurrent) return;
        setLoadedEntries(scores);
        onEntriesChange(scores);
      })
      .catch(() => {
        if (isCurrent) setHasLoadError(true);
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
    setHasLoadError(false);
    try {
      const updatedEntries = await submitLeaderboardScore(trimmedName, score);
      setLoadedEntries(updatedEntries);
      onEntriesChange(updatedEntries);
      setHasSubmitted(true);
    } catch {
      setHasLoadError(true);
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
          <LeaderboardLoadingState
            canPotentiallySaveScore={canPotentiallySaveScore}
          />
        ) : (
          <Box>
            {hasHighScore && (
              <LeaderboardScoreForm
                score={score}
                name={name}
                isSaving={isSaving}
                onNameChange={setName}
                onSkip={() => setHasSkipped(true)}
                onSubmit={saveScore}
              />
            )}
            <LeaderboardScoreList
              entries={entries}
              hasHighScore={hasHighScore}
            />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
