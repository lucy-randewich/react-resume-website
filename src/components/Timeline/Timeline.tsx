import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import cv from "../../assets/documents/lucy-randewich-cv.pdf";
import { layout } from "../../theme";
import { SectionEyebrow } from "../shared";
import { educationEntry, experienceEntries } from "./timeline.data";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
  id?: string;
}

export const Timeline = ({ id }: TimelineProps) => {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  return (
    <section id={id}>
      <Box
        sx={{
          maxWidth: layout.contentWidth,
          mx: "auto",
          py: { xs: 8, md: 12 },
          px: { xs: 2.5, md: 4 },
        }}
      >
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <SectionEyebrow>Experience</SectionEyebrow>
        </Box>
        <Box sx={{ borderTop: 1, borderColor: "divider" }}>
          {experienceEntries.map((entry) => (
            <TimelineItem
              key={entry.title}
              entry={entry}
              isExpanded={expandedRole === entry.title}
              onToggle={() =>
                setExpandedRole((current) =>
                  current === entry.title ? null : entry.title,
                )
              }
            />
          ))}
          <TimelineItem
            entry={educationEntry}
            isExpanded={expandedRole === educationEntry.title}
            onToggle={() =>
              setExpandedRole((current) =>
                current === educationEntry.title ? null : educationEntry.title,
              )
            }
          />
        </Box>

        <Button
          component="a"
          href={cv}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<ArrowOutwardIcon />}
          sx={{ mt: 3, px: 0, color: "text.primary", fontWeight: 700 }}
        >
          View full CV
        </Button>
      </Box>
    </section>
  );
};
