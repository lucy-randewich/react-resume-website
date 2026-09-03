import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Typography } from "@mui/material";

import { fonts } from "../../theme";
import type { Artwork } from "./artwork.types";

interface ArtworkDialogProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const ArtworkDialog = ({ artwork, onClose }: ArtworkDialogProps) => (
  <Dialog
    open={artwork !== null}
    onClose={onClose}
    fullWidth
    maxWidth="lg"
    aria-label={artwork?.title ?? "Artwork"}
    slotProps={{
      paper: {
        sx: {
          position: "relative",
          width: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
          maxHeight: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
          m: { xs: 1.5, sm: 4 },
          overflow: "auto",
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
          boxShadow: "0 24px 80px rgb(0 0 0 / 24%)",
        },
      },
      backdrop: {
        sx: {
          bgcolor: "rgb(0 0 0 / 54%)",
          backdropFilter: "blur(8px)",
        },
      },
    }}
  >
    <IconButton
      aria-label="Close artwork"
      onClick={onClose}
      sx={{
        position: "absolute",
        zIndex: 1,
        top: { xs: 10, sm: 16 },
        right: { xs: 10, sm: 16 },
        color: "text.primary",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        "&:hover": { bgcolor: "background.default" },
      }}
    >
      <CloseIcon />
    </IconButton>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "minmax(0, 1.65fr) minmax(280px, .7fr)",
        },
        minHeight: { md: 560 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Box
          component="img"
          src={artwork?.image}
          alt={artwork?.alt ?? ""}
          width={artwork?.width}
          height={artwork?.height}
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            maxHeight: { xs: "52dvh", md: "calc(100dvh - 96px)" },
            objectFit: "contain",
          }}
        />
      </Box>

      <Box
        sx={{
          alignSelf: "center",
          px: { xs: 3, sm: 4, md: 5 },
          pt: { xs: 7, md: 8 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Typography
          component="h2"
          sx={{
            m: 0,
            fontFamily: fonts.display,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 400,
            lineHeight: 1.15,
          }}
        >
          {artwork?.title}
        </Typography>
        <Typography
          sx={{
            mt: 1.5,
            color: "text.secondary",
            fontSize: ".72rem",
            fontWeight: 600,
            letterSpacing: ".11em",
            textTransform: "uppercase",
          }}
        >
          {artwork?.medium}
        </Typography>
        <Typography
          sx={{
            mt: 3,
            pt: 3,
            borderTop: 1,
            borderColor: "divider",
            color: "text.secondary",
            fontSize: ".95rem",
            lineHeight: 1.75,
          }}
        >
          {artwork?.description}
        </Typography>
      </Box>
    </Box>
  </Dialog>
);
