import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Typography } from "@mui/material";
import { shadows } from "../../theme";
import type { Project } from "./projects.types";

export const ProjectCard = ({ project }: { project: Project }) => (
  <Box
    sx={{
      position: "relative",
      bgcolor: "background.paper",
      color: "text.primary",
      border: 1,
      borderColor: "divider",
      display: "flex",
      flexDirection: { xs: "column", lg: "row" },
      minHeight: 310,
      transition: "transform .2s ease, box-shadow .2s ease",
      "&:hover, &:has(.project-card-link:focus-visible)": {
        transform: "translateY(-4px)",
        boxShadow: shadows.card,
      },
      "&:hover .project-link-label, &:has(.project-card-link:focus-visible) .project-link-label":
        {
          color: "primary.main",
        },
      "&:has(.project-card-link:focus-visible)": {
        outline: "2px solid",
        outlineColor: "primary.main",
        outlineOffset: 3,
      },
    }}
  >
    <Box
      component="a"
      className="project-card-link"
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.linkLabel}: ${project.title}`}
      sx={{ position: "absolute", inset: 0, zIndex: 1 }}
    />
    <Box
      component="img"
      src={project.image}
      alt=""
      width={project.imageDimensions.width}
      height={project.imageDimensions.height}
      loading="lazy"
      sx={{
        width: { xs: "100%", lg: "44%" },
        height: { xs: 190, lg: "auto" },
        minHeight: { lg: "100%" },
        objectFit: "contain",
        bgcolor: "background.default",
        p: 2,
      }}
    />
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
      }}
    >
      <Typography
        sx={{
          color: "primary.main",
          fontSize: ".68rem",
          textTransform: "uppercase",
          letterSpacing: ".1em",
          fontWeight: 700,
        }}
      >
        {project.detail}
      </Typography>
      <Typography
        component="h3"
        sx={{ fontSize: "1.7rem", lineHeight: 1.05, mt: 1.4, mb: 1.2 }}
      >
        {project.title}
      </Typography>
      <Typography
        sx={{ color: "text.secondary", fontSize: ".9rem", lineHeight: 1.55 }}
      >
        {project.summary}
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: ".75rem",
          lineHeight: 1.4,
          mt: 2,
        }}
      >
        {project.skills}
      </Typography>
      <Box
        component="span"
        className="project-link-label"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.6,
          color: "text.primary",
          mt: "auto",
          pt: 2.2,
          fontWeight: 700,
          fontSize: ".875rem",
          transition: "color .2s ease",
        }}
      >
        {project.linkLabel}
        <ArrowOutwardIcon sx={{ fontSize: "1.15rem" }} />
      </Box>
    </Box>
  </Box>
);
