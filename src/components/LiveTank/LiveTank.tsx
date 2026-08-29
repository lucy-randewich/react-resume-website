import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { layout } from "../../theme";
import { SectionEyebrow, SectionHeading } from "../shared";

const shrimpCamVideoId = "q3tQH2b-hjQ";
const shrimpCamUrl = `https://youtube.com/live/${shrimpCamVideoId}`;
const liveTankEmbedUrl = `https://www.youtube-nocookie.com/embed/${shrimpCamVideoId}`;

interface LiveTankProps {
  id?: string;
}

export const LiveTank = ({ id }: LiveTankProps) => (
  <section id={id}>
    <Box
      sx={{
        maxWidth: layout.contentWidth,
        mx: "auto",
        minHeight: { md: `calc(100vh - ${layout.headerHeight}px)` },
        px: { xs: 2.5, md: 4 },
        py: { xs: 8, md: 10 },
        display: "grid",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: ".72fr 1.28fr" },
          gap: { xs: 4, md: 7 },
          alignItems: "center",
        }}
      >
        <Box>
          <SectionEyebrow>Live tank</SectionEyebrow>
          <SectionHeading>Shrimp cam.</SectionHeading>
          <Typography
            sx={{
              mt: 2.5,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.75,
              maxWidth: 480,
            }}
          >
            A quiet window into my shrimp tank. 24/7 live stream of my lovely
            shrimps. Stay a while and watch them go about their shrimpy
            business.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, max-content))",
              gap: 1,
              mt: 3,
              color: "text.secondary",
            }}
          >
            {["Live on YouTube", "Ambient viewing", "Aquascape"].map((item) => (
              <Typography
                key={item}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 999,
                  px: 1.35,
                  py: 0.55,
                  fontSize: ".72rem",
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mt: 3 }}>
            <Button
              component="a"
              href={shrimpCamUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              endIcon={<ArrowOutwardIcon />}
              sx={{
                borderColor: "text.primary",
                color: "text.primary",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  bgcolor: "transparent",
                },
              }}
            >
              Open on YouTube
            </Button>
            <Button
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ color: "text.secondary" }}
            >
              Back to homepage
            </Button>
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            position: "relative",
            overflow: "hidden",
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 18px 52px rgb(0 0 0 / 28%)"
                : "0 18px 52px rgb(23 23 22 / 10%)",
            aspectRatio: "16 / 9",
          })}
        >
          <Box
            component="iframe"
            title="Live shrimp tank stream"
            src={liveTankEmbedUrl}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: 0,
            }}
          />
        </Box>
      </Box>
    </Box>
  </section>
);
