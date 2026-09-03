import { Typography } from "@mui/material";

export const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <Typography
    component="h2"
    sx={{
      color: "primary.main",
      fontSize: { xs: ".95rem", md: "1.05rem" },
      letterSpacing: ".12em",
      fontWeight: 700,
      lineHeight: 1.2,
      textTransform: "uppercase",
      m: 0,
    }}
  >
    {children}
  </Typography>
);
