import { alpha, Box, Button, TextField, Typography } from "@mui/material";

interface LeaderboardScoreFormProps {
  score: number;
  name: string;
  isSaving: boolean;
  onNameChange: (name: string) => void;
  onSkip: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

export const LeaderboardScoreForm = ({
  score,
  name,
  isSaving,
  onNameChange,
  onSkip,
  onSubmit,
}: LeaderboardScoreFormProps) => (
  <Box component="form" onSubmit={onSubmit}>
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
          onChange={(event) => onNameChange(event.target.value)}
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
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
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
          {isSaving ? "Saving..." : "Save score"}
        </Button>
      </Box>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "center", mt: 1.25 }}>
      <Button
        onClick={onSkip}
        color="inherit"
        size="small"
        sx={{ color: "text.secondary", minWidth: 0, px: 1.25 }}
      >
        Skip
      </Button>
    </Box>
  </Box>
);
