import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { useState } from "react";

const shrimpCamFaqs = [
  {
    id: "residents",
    question: "Who are these delightful little fellas?",
    paragraphs: [
      "This tank is home to nine adult cherry shrimps and one baby. I love them all very much. They are a mix of males and females, so hopefully soon we will get a bigger population of shrimpies. Neocaridina are freshwater shrimps native to Southeast Asia, and they are known for their bright red color and peaceful nature. They are a popular choice for aquarium enthusiasts because they are easy to care for and can help keep the tank clean by eating algae. They're always busy going about their shrimpy business.",
    ],
  },
  {
    id: "stream",
    question: "How does the stream work?",
    paragraphs: [
      "A GoPro Hero 8 is connected via USB to a Raspberry Pi which sends the video feed to YouTube, allowing it to be embedded here.",
    ],
  },
  {
    id: "why",
    question: "Why a shrimp tank?",
    paragraphs: [
      <>
        I scrolled back through my Instagram DMs to find the reels which sparked
        my interest in shrimp keeping. I found these culprits:
        <Link
          href="https://www.instagram.com/reel/DVuAMJzknvz/"
          target="_blank"
          rel="noreferrer"
          sx={{ ml: 0.5 }}
        >
          this reel
        </Link>
        , and
        <Link
          href="https://www.instagram.com/reel/DYm0KU0BHXi/"
          target="_blank"
          rel="noreferrer"
          sx={{ ml: 0.5 }}
        >
          this one
        </Link>
        . We got rid of the TV in our flat and the shrimp tank has now replaced
        it as a sort of living room centerpiece. The shrimps have a calming aura
        about them but they also do silly shit sometimes too. They&apos;re the
        perfect doomscroll antidote.
      </>,
    ],
  },
  {
    id: "specs",
    question: "What's the aquarium setup?",
    paragraphs: [
      "The aquarium is a 10-gallon tank equipped with only a sponge filter and lighting. The lights are on a timer which gradually turns on at around 9am and off 10 hours later. The substrate is Fluval Stratum, into which Monte Carlo is planted and intended to carpet the bottom of the tank over time. There is a mystery leafy plant in one corner of the tank. The hardscape consists of only one piece of driftwood which has weeping moss attached to it. The tank has no other inhabitants besides some detritus worms and other various microfauna. Tank maintenance consists of helping the shrimps by cleaning the algae off the glass every so often, trimming the plants, and topping up evaporation with RO water.",
    ],
  },
] as const;

export const LiveTankInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | false>(
    false,
  );
  const titleId = "shrimp-cam-description-title";

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        aria-controls={isOpen ? "shrimp-cam-description" : undefined}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        size="small"
        sx={{
          minWidth: 0,
          px: 0.5,
          color: "text.secondary",
          fontSize: ".78rem",
          fontWeight: 600,
          textTransform: "none",
          "&:hover": {
            color: "primary.main",
            bgcolor: "transparent",
          },
        }}
      >
        What is this?
      </Button>

      <Dialog
        id="shrimp-cam-description"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby={titleId}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              position: "relative",
              width: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
              height: {
                xs: "calc(100dvh - 24px)",
                sm: "min(560px, calc(100dvh - 64px))",
              },
              maxHeight: { xs: "calc(100% - 24px)", sm: "calc(100% - 64px)" },
              m: { xs: 1.5, sm: 4 },
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
              borderRadius: { xs: 2.5, sm: 3.5 },
              bgcolor: "background.default",
              boxShadow: "0 28px 80px rgb(0 0 0 / 18%)",
            },
          },
          backdrop: {
            sx: {
              bgcolor: "rgb(0 0 0 / 34%)",
              backdropFilter: "blur(8px)",
            },
          },
        }}
      >
        <IconButton
          aria-label="Close"
          onClick={() => setIsOpen(false)}
          sx={{
            position: "absolute",
            zIndex: 1,
            top: { xs: 12, sm: 18 },
            right: { xs: 12, sm: 18 },
            color: "text.secondary",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent
          sx={{
            width: "100%",
            maxWidth: 680,
            mx: "auto",
            px: { xs: 3, sm: 6, md: 8 },
            py: { xs: 5.5, sm: 7, md: 8 },
            overflowY: "auto",
            overscrollBehavior: "contain",
            scrollbarGutter: "stable",
          }}
        >
          <Typography
            id={titleId}
            sx={{
              mb: 1.5,
              color: "primary.main",
              fontSize: ".68rem",
              fontWeight: 700,
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            About the Shrimp Cam
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            {shrimpCamFaqs.map(({ id, question, paragraphs }) => (
              <Accordion
                key={id}
                expanded={expandedQuestion === id}
                onChange={(_, isExpanded) =>
                  setExpandedQuestion(isExpanded ? id : false)
                }
                disableGutters
                elevation={0}
                square
                sx={{
                  borderTop: 1,
                  borderColor: "divider",
                  bgcolor: "transparent",
                  "&::before": { display: "none" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    px: 0,
                    py: 0.75,
                    minHeight: 64,
                    "&.Mui-expanded": { minHeight: 64 },
                    "& .MuiAccordionSummary-content": { my: 1.5 },
                    "& .MuiAccordionSummary-content.Mui-expanded": {
                      my: 1.5,
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      color: "text.secondary",
                    },
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      pr: 2,
                      fontSize: { xs: ".98rem", sm: "1.05rem" },
                      fontWeight: 650,
                      letterSpacing: "-.015em",
                    }}
                  >
                    {question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0, pb: 3 }}>
                  {paragraphs.map((paragraph, paragraphIndex) => (
                    <Typography
                      key={`${id}-${paragraphIndex}`}
                      sx={{
                        mt: 1.5,
                        color: "text.secondary",
                        fontSize: { xs: ".95rem", sm: "1rem" },
                        lineHeight: 1.75,
                        "&:first-of-type": { mt: 0 },
                      }}
                    >
                      {paragraph}
                    </Typography>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
