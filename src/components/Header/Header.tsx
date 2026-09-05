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
import { portfolioNavigationItem, trailingNavigationItems } from "./navigation";

interface HeaderProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export const Header = ({ mode, onToggleMode }: HeaderProps) => {
  const [isTankOpen, setIsTankOpen] = useState(false);
  const [isShrimpMenuDismissed, setIsShrimpMenuDismissed] = useState(false);
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
    preloadLeaderboard();
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

  const renderNavigationItem = ({
    label,
    to,
  }: {
    label: string;
    to: string;
  }) => {
    const hashSection = to.startsWith("/#") ? to.slice(2) : null;
    const isPortfolio = to === "/";
    const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
    const normalizedDestination = to.replace(/\/+$/, "") || "/";
    const isActive = isPortfolio
      ? normalizedPath === "/"
      : normalizedPath === normalizedDestination;

    return (
      <Button
        key={to}
        component={hashSection || isPortfolio ? "button" : RouterLink}
        to={hashSection || isPortfolio ? undefined : to}
        onClick={
          hashSection
            ? () => scrollToSection(hashSection)
            : isPortfolio
              ? goHome
              : undefined
        }
        aria-current={isActive ? "page" : undefined}
        sx={{
          display: {
            xs: label === "Artwork" ? "inline-flex" : "none",
            sm: "inline-flex",
          },
          "@media (max-width: 359px)": {
            display: "none",
          },
          color: isActive ? "primary.main" : "inherit",
          minWidth: 0,
          px: { xs: 1, sm: 1.5 },
          fontSize: ".84rem",
          fontWeight: isActive ? 700 : 500,
          "&:hover": {
            color: "primary.main",
            bgcolor: "transparent",
          },
        }}
      >
        {label}
      </Button>
    );
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
              fontSize: { xs: ".9rem", sm: "1rem" },
              letterSpacing: "-.03em",
              whiteSpace: "nowrap",
              flexShrink: 0,
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
            {renderNavigationItem(portfolioNavigationItem)}
            <Box
              onMouseLeave={() => setIsShrimpMenuDismissed(false)}
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                ...(isShrimpMenuDismissed
                  ? {}
                  : {
                      "&:hover .shrimp-menu, &:focus-within .shrimp-menu": {
                        opacity: 1,
                        visibility: "visible",
                        transform: "translate(-50%, 0)",
                        pointerEvents: "auto",
                      },
                    }),
                "@media (prefers-reduced-motion: reduce)": {
                  "& .shrimp-menu": {
                    transition: "none",
                  },
                },
              }}
            >
              <Button
                onClick={() => setIsShrimpMenuDismissed(false)}
                aria-haspopup="menu"
                sx={{
                  position: "relative",
                  overflow: "visible",
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
                Shrimps
              </Button>
              <Box
                className="shrimp-menu"
                role="menu"
                aria-label="Shrimp pages"
                sx={(theme) => ({
                  position: "absolute",
                  zIndex: 4,
                  top: "calc(100% + 6px)",
                  left: "50%",
                  width: "max-content",
                  p: 0.5,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, auto)",
                  gap: 0.125,
                  opacity: 0,
                  visibility: "hidden",
                  pointerEvents: "none",
                  transform: "translate(-50%, -6px)",
                  bgcolor: alpha(theme.palette.background.default, 0.97),
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2.5,
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 12px 28px rgb(0 0 0 / 30%)"
                      : "0 12px 28px rgb(23 23 22 / 11%)",
                  backdropFilter: "blur(12px)",
                  transition:
                    "opacity .16s ease, transform .2s ease, visibility .16s",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    bottom: "100%",
                    left: 0,
                    height: 8,
                  },
                })}
              >
                <Button
                  role="menuitem"
                  aria-label="Shrimp game"
                  onClick={(event) => {
                    setIsShrimpMenuDismissed(true);
                    event.currentTarget.blur();
                    setIsTankOpen(true);
                  }}
                  sx={{
                    color: "text.primary",
                    minWidth: 56,
                    px: 1.2,
                    py: 0.65,
                    borderRadius: 2,
                    fontSize: ".76rem",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    textTransform: "none",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  Game
                </Button>
                <Button
                  component={RouterLink}
                  to="/shrimp-cam/"
                  role="menuitem"
                  aria-label="Shrimp cam"
                  onClick={(event) => {
                    setIsShrimpMenuDismissed(true);
                    event.currentTarget.blur();
                  }}
                  sx={{
                    color:
                      location.pathname.replace(/\/+$/, "") === "/shrimp-cam"
                        ? "primary.main"
                        : "text.primary",
                    minWidth: 56,
                    px: 1.2,
                    py: 0.65,
                    borderRadius: 2,
                    fontSize: ".76rem",
                    fontWeight: 600,
                    lineHeight: 1.4,
                    textTransform: "none",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  Cam
                </Button>
              </Box>
            </Box>
            {trailingNavigationItems.map(renderNavigationItem)}
            <IconButton
              onClick={onToggleMode}
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              color="inherit"
              size="small"
              sx={(theme) => ({
                position: "relative",
                width: 34,
                height: 34,
                ml: { xs: 0.25, sm: 0.75 },
                overflow: "hidden",
                borderRadius: "50%",
                transition:
                  "color .25s ease, transform .2s ease, background-color .25s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 4,
                  borderRadius: "50%",
                  bgcolor: alpha(theme.palette.primary.main, 0.12),
                  opacity: 0,
                  transform: "scale(.55)",
                  transition:
                    "opacity .25s ease, transform .35s cubic-bezier(.2,.8,.2,1)",
                },
                "& .theme-icon-stack": {
                  position: "relative",
                  width: 20,
                  height: 20,
                  transition: "transform .35s cubic-bezier(.2,.8,.2,1)",
                },
                "& .theme-icon": {
                  position: "absolute",
                  inset: 0,
                  transition:
                    "opacity .22s ease, transform .42s cubic-bezier(.2,.8,.2,1)",
                },
                "& .theme-icon--moon": {
                  opacity: mode === "light" ? 1 : 0,
                  transform:
                    mode === "light"
                      ? "rotate(0deg) scale(1)"
                      : "rotate(70deg) scale(.45)",
                },
                "& .theme-icon--sun": {
                  opacity: mode === "dark" ? 1 : 0,
                  transform:
                    mode === "dark"
                      ? "rotate(0deg) scale(1)"
                      : "rotate(-70deg) scale(.45)",
                },
                "&:hover, &:focus-visible": {
                  color: "primary.main",
                  bgcolor: "transparent",
                },
                "&:hover::before, &:focus-visible::before": {
                  opacity: 1,
                  transform: "scale(1)",
                },
                "&:hover .theme-icon-stack, &:focus-visible .theme-icon-stack":
                  {
                    transform:
                      mode === "light"
                        ? "translateY(-1px) rotate(-8deg) scale(1.04)"
                        : "translateY(-1px) rotate(12deg) scale(1.04)",
                  },
                "&:active .theme-icon-stack": {
                  transform: "scale(.88)",
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                  "&::before, & .theme-icon, & .theme-icon-stack": {
                    transition: "none",
                  },
                  "&:hover .theme-icon-stack, &:focus-visible .theme-icon-stack, &:active .theme-icon-stack":
                    {
                      transform: "none",
                    },
                },
              })}
            >
              <Box className="theme-icon-stack" aria-hidden="true">
                <DarkModeOutlinedIcon
                  className="theme-icon theme-icon--moon"
                  fontSize="small"
                />
                <LightModeOutlinedIcon
                  className="theme-icon theme-icon--sun"
                  fontSize="small"
                />
              </Box>
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
