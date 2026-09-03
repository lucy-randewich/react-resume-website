import { Box } from "@mui/material";
import { layout } from "../../theme";
import { SectionEyebrow } from "../shared";
import { ProjectCard } from "./ProjectCard";
import { projects } from "./projects.data";

interface ProjectsProps {
  id?: string;
}

export const Projects = ({ id }: ProjectsProps) => (
  <section id={id}>
    <Box
      sx={{
        bgcolor: "action.hover",
        py: { xs: 8, md: 12 },
        px: { xs: 2.5, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: layout.contentWidth, mx: "auto" }}>
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <SectionEyebrow>Some stuff I've made</SectionEyebrow>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </Box>
      </Box>
    </Box>
  </section>
);
