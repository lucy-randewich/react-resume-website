import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useCallback, useEffect, useRef, useState } from "react";
import { alpha, AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import type { PaletteMode } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  getLeaderboard,
  isSupabaseConfigured,
  type LeaderboardEntry,
} from "../../services/supabase";
import { layout } from "../../theme";
import { ShrimpLeaderboard, ShrimpTank } from "../ShrimpTank";
import { navigationItems } from "./navigation";

interface HeaderProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export const Header = ({ mode, onToggleMode }: HeaderProps) => {
  const [isTankOpen, setIsTankOpen] = useState(false);
  const [leaderboardScore, setLeaderboardScore] = useState<number | null>(null);
  const [leaderboardSessionId, setLeaderboardSessionId] = useState<
    string | null
  >(null);
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    LeaderboardEntry[] | null
  >(null);
  const [hasLeaderboardError, setHasLeaderboardError] = useState(false);
  const leaderboardRequestRef = useRef<Promise<void> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const preloadLeaderboard = useCallback(() => {
    if (
      !isSupabaseConfigured ||
      leaderboardEntries !== null ||
      leaderboardRequestRef.current
    ) {
      return;
    }

    setHasLeaderboardError(false);
    leaderboardRequestRef.current = getLeaderboard()
      .then(setLeaderboardEntries)
      .catch(() => setHasLeaderboardError(true))
      .finally(() => {
        leaderboardRequestRef.current = null;
      });
  }, [leaderboardEntries]);

  useEffect(() => {
    const preloadTimer = window.setTimeout(preloadLeaderboard, 900);
    return () => window.clearTimeout(preloadTimer);
  }, [preloadLeaderboard]);

  const scrollToSection = (sectionId: string) => {
    const scroll = () =>
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });

    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      window.setTimeout(scroll, 80);
      return;
    }

    scroll();
  };

  const goHome = () => {
    if (location.pathname !== "/") {
      navigate("/");
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={(theme) => ({
          bgcolor: alpha(theme.palette.background.default, 0.92),
          color: "text.primary",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Toolbar
          sx={{
            maxWidth: layout.contentWidth,
            width: "100%",
            mx: "auto",
            minHeight: `${layout.headerHeight}px !important`,
            px: { xs: 2.5, md: 4 },
          }}
        >
          <Box
            component="button"
            onClick={goHome}
            aria-label="Back to top"
            sx={{
              border: 0,
              bgcolor: "transparent",
              p: 0,
              color: "inherit",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-.03em",
              "&:hover": { color: "primary.main" },
            }}
          >
            Lucy Randewich
          </Box>
          <Box
            component="nav"
            sx={{
              ml: "auto",
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.25, sm: 1 },
            }}
          >
            {navigationItems.map(({ label, to }) => {
              const hashSection = to.startsWith("/#") ? to.slice(2) : null;
              return (
                <Button
                  key={to}
                  component={hashSection ? "button" : RouterLink}
                  to={hashSection ? undefined : to}
                  onClick={
                    hashSection ? () => scrollToSection(hashSection) : undefined
                  }
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    color: "inherit",
                    minWidth: 0,
                    px: { xs: 1, sm: 1.5 },
                    fontSize: ".84rem",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {label}
                </Button>
              );
            })}
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                "&:hover .shrimp-menu, &:focus-within .shrimp-menu": {
                  opacity: 1,
                  transform: "translate(-50%, 0)",
                  pointerEvents: "auto",
                },
                "@media (prefers-reduced-motion: reduce)": {
                  "& .shrimp-menu": {
                    transition: "none",
                  },
                },
              }}
            >
              <Button
                sx={{
                  position: "relative",
                  overflow: "visible",
                  color: "inherit",
                  minWidth: 0,
                  px: 1.5,
                  fontSize: ".84rem",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                Shrimps
              </Button>
              <Box
                className="shrimp-menu"
                sx={(theme) => ({
                  position: "absolute",
                  zIndex: 4,
                  top: "100%",
                  left: "50%",
                  minWidth: 160,
                  px: 0.75,
                  pb: 0.75,
                  pt: 1.5,
                  display: "grid",
                  gap: 0.25,
                  opacity: 0,
                  pointerEvents: "none",
                  transform: "translate(-50%, -4px)",
                  transition:
                    "opacity .18s ease, transform .22s ease, background-color .2s ease",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: "8px 0 0",
                    zIndex: -1,
                    bgcolor: alpha(theme.palette.background.default, 0.96),
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 16px 36px rgb(0 0 0 / 34%)"
                        : "0 16px 36px rgb(23 23 22 / 12%)",
                  },
                })}
              >
                <Button
                  onClick={() => setIsTankOpen(true)}
                  sx={{
                    justifyContent: "flex-start",
                    color: "text.primary",
                    px: 1.25,
                    fontSize: ".8rem",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  Shrimp tank game
                </Button>
                <Button
                  component={RouterLink}
                  to="/shrimp-cam/"
                  sx={{
                    justifyContent: "flex-start",
                    color: "text.primary",
                    px: 1.25,
                    fontSize: ".8rem",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  Shrimp livestream
                </Button>
              </Box>
            </Box>
            <IconButton
              onClick={onToggleMode}
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              color="inherit"
              size="small"
              sx={(theme) => ({
                ml: { xs: 0.25, sm: 0.75 },
                transition:
                  "background-color .25s ease, color .25s ease, transform .25s ease",
                "& svg": {
                  transition: "transform .35s ease",
                  transformOrigin: "center",
                },
                "&:hover, &:focus-visible": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  transform: "translateY(-1px)",
                },
                "&:hover svg, &:focus-visible svg": {
                  transform:
                    mode === "light"
                      ? "rotate(-18deg) scale(1.08)"
                      : "rotate(24deg) scale(1.08)",
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                  "& svg": { transition: "none" },
                  "&:hover, &:focus-visible": {
                    transform: "none",
                  },
                  "&:hover svg, &:focus-visible svg": {
                    transform: "none",
                  },
                },
              })}
            >
              {mode === "light" ? (
                <DarkModeOutlinedIcon fontSize="small" />
              ) : (
                <LightModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <ShrimpTank
        isOpen={isTankOpen}
        onOpenLeaderboard={() => {
          preloadLeaderboard();
          setLeaderboardScore(0);
          setLeaderboardSessionId(null);
        }}
        onClose={(score, gameSessionId) => {
          setIsTankOpen(false);
          preloadLeaderboard();
          setLeaderboardScore(score);
          setLeaderboardSessionId(gameSessionId);
        }}
      />
      {leaderboardScore !== null && (
        <ShrimpLeaderboard
          score={leaderboardScore}
          gameSessionId={leaderboardSessionId}
          initialEntries={leaderboardEntries}
          initialHasError={hasLeaderboardError}
          onEntriesChange={setLeaderboardEntries}
          onClose={() => setLeaderboardScore(null)}
        />
      )}
    </>
  );
};
