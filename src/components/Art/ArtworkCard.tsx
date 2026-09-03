import { Box, Typography } from "@mui/material";

import { shadows } from "../../theme";
import type { Artwork } from "./artwork.types";

interface ArtworkCardProps {
  artwork: Artwork;
  onOpen: () => void;
}

export const ArtworkCard = ({ artwork, onOpen }: ArtworkCardProps) => (
  <Box>
    <Box
      component="button"
      type="button"
      aria-label={`View details for ${artwork.title}`}
      onClick={onOpen}
      sx={{
        position: "relative",
        display: "block",
        width: "100%",
        p: 0,
        overflow: "hidden",
        cursor: "pointer",
        color: "inherit",
        bgcolor: "background.paper",
        border: 1,
        borderColor: "divider",
        transition: "transform .22s ease, box-shadow .22s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: shadows.card,
        },
        "&:focus-visible": {
          outline: 2,
          outlineColor: "primary.main",
          outlineOffset: 4,
        },
        "&:hover img": { transform: "scale(1.012)" },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "none",
          "&:hover": { transform: "none" },
          "& img": { transition: "none" },
          "&:hover img": { transform: "none" },
        },
      }}
    >
      <Box
        component="img"
        src={artwork.image}
        alt={artwork.alt}
        width={artwork.width}
        height={artwork.height}
        loading="lazy"
        decoding="async"
        sx={{
          display: "block",
          width: "100%",
          height: "auto",
          aspectRatio: "4 / 3",
          objectFit: "cover",
          transition: "transform .35s ease",
        }}
      />
      <Typography
        component="span"
        sx={(theme) => ({
          position: "absolute",
          right: { xs: 12, sm: 18 },
          bottom: { xs: 12, sm: 18 },
          px: 1.5,
          py: 0.8,
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          fontSize: ".72rem",
          fontWeight: 700,
          letterSpacing: ".04em",
        })}
      >
        View
      </Typography>
    </Box>
  </Box>
);
