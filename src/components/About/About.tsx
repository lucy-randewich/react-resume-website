import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button, Typography } from "@mui/material";
import profileImage1024 from "../../assets/images/profile/lucy-randewich-1024.webp";
import profileImage480 from "../../assets/images/profile/lucy-randewich-480.webp";
import profileImage768 from "../../assets/images/profile/lucy-randewich-768.webp";
import cv from "../../assets/documents/lucy-randewich-cv.pdf";
import { layout } from "../../theme";
import { profileFacts } from "./about.constants";

interface AboutProps {
  id?: string;
}

export const About = ({ id }: AboutProps) => (
  <section id={id}>
    <Box
      sx={{
        maxWidth: layout.contentWidth,
        mx: "auto",
        minHeight: { md: `calc(100vh - ${layout.headerHeight}px)` },
        px: { xs: 2.5, md: 4 },
        py: { xs: 8, md: 11 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.15fr .85fr" },
        gap: { xs: 6, md: 10 },
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "3.25rem", sm: "4.4rem", lg: "5.5rem" },
            lineHeight: 0.98,
            letterSpacing: "-.055em",
            maxWidth: 720,
            m: 0,
          }}
        >
          Building reliable systems rapidly.
        </Typography>
        <Typography
          sx={{
            mt: 3.5,
            fontSize: { xs: "1.05rem", md: "1.2rem" },
            lineHeight: 1.7,
            color: "text.secondary",
            maxWidth: 590,
          }}
        >
          I’m a Full-Stack Software Engineer with experience across insurance
          systems, machine-learning applications and cyber-security research
          tooling.
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 4 }}>
          <Button
            component="a"
            href="#projects"
            variant="contained"
            sx={{
              bgcolor: "text.primary",
              color: "background.default",
              px: 2.5,
              py: 1.25,
              "&:hover": { bgcolor: "primary.main" },
            }}
          >
            View selected work
          </Button>
          <Button
            component="a"
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            endIcon={<ArrowOutwardIcon />}
            sx={{
              borderColor: "text.primary",
              color: "text.primary",
              px: 2.5,
              py: 1.25,
              "&:hover": {
                borderColor: "primary.main",
                color: "primary.main",
                bgcolor: "transparent",
              },
            }}
          >
            Open CV
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            borderTop: 1,
            borderColor: "divider",
            mt: 7,
            pt: 2.5,
            gap: 2.5,
          }}
        >
          {profileFacts.map(({ label, value }) => (
            <Box key={label}>
              <Typography
                sx={{
                  fontSize: ".7rem",
                  color: "text.secondary",
                  textTransform: "uppercase",
                  letterSpacing: ".1em",
                  mb: 0.5,
                }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontSize: ".9rem",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  color: "primary.main",
                }}
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: { xs: 440, md: "none" },
          justifySelf: { xs: "center", md: "end" },
          width: "100%",
        }}
      >
        <Box
          component="img"
          src={profileImage768}
          srcSet={`${profileImage480} 480w, ${profileImage768} 768w, ${profileImage1024} 1024w`}
          sizes="(max-width: 899px) calc(100vw - 40px), 36vw"
          alt="Lucy Randewich"
          width={768}
          height={960}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            aspectRatio: "4 / 5",
            objectFit: "cover",
            filter: "saturate(.82)",
          }}
        />
      </Box>
    </Box>
  </section>
);
