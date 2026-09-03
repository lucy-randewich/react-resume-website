import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

import { layout } from "../../theme";
import { ArtworkCard } from "./ArtworkCard";
import { ArtworkDialog } from "./ArtworkDialog";
import { artworks } from "./artwork.data";
import type { Artwork } from "./artwork.types";

interface ArtProps {
  id?: string;
}

export const Art = ({ id }: ArtProps) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <section id={id}>
      <Box
        sx={{
          maxWidth: layout.contentWidth,
          mx: "auto",
          minHeight: `calc(100svh - ${layout.headerHeight}px)`,
          px: { xs: 2.5, md: 4 },
          py: { xs: 8, md: 11 },
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box sx={{ maxWidth: 680 }}>
          <Typography
            component="h1"
            sx={{
              m: 0,
              fontSize: { xs: "3.5rem", sm: "4.5rem", md: "5.5rem" },
              lineHeight: 0.98,
              letterSpacing: "-.055em",
            }}
          >
            Mini Art Gallery
          </Typography>
          <Typography
            sx={{
              mt: 3.5,
              maxWidth: 560,
              color: "text.secondary",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              lineHeight: 1.7,
            }}
          >
            Here's a small selection of my paintings.
          </Typography>
        </Box>
        <Box
          component="a"
          href="#artwork-grid"
          sx={{
            position: "absolute",
            bottom: { xs: 28, md: 36 },
            left: { xs: 20, md: 32 },
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            color: "text.primary",
            textDecoration: "none",
            fontSize: ".82rem",
            fontWeight: 600,
            letterSpacing: ".04em",
            "& svg": {
              animation: "artwork-scroll-cue 1.8s ease-in-out infinite",
            },
            "@keyframes artwork-scroll-cue": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(5px)" },
            },
            "@media (prefers-reduced-motion: reduce)": {
              "& svg": { animation: "none" },
            },
          }}
        >
          Scroll
          <KeyboardArrowDownIcon fontSize="small" />
        </Box>
      </Box>

      <Box
        id="artwork-grid"
        sx={{
          maxWidth: layout.contentWidth,
          mx: "auto",
          px: { xs: 2.5, md: 4 },
          pb: { xs: 8, md: 12 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: { xs: 2.5, md: 3 },
          }}
        >
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.title}
              artwork={artwork}
              onOpen={() => setSelectedArtwork(artwork)}
            />
          ))}
        </Box>
      </Box>

      <ArtworkDialog
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </section>
  );
};
