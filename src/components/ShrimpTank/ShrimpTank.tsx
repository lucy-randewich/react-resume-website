import { useEffect, useRef, useState } from "react";
import { alpha, Box, Dialog, Typography } from "@mui/material";
import {
  isSupabaseConfigured,
  startShrimpGameSession,
} from "../../services/supabase";
import { colors, shadows } from "../../theme";
import { MOVEMENTS, shrimpAssets } from "./shrimp.constants";
import { ShrimpControls } from "./ShrimpControls";
import { ShrimpSprite } from "./ShrimpSprite";
import { TankBubbles } from "./TankBubbles";
import { TankScore } from "./TankScore";
import { TankTopControls } from "./TankTopControls";
import { useShrimpGame } from "./useShrimpGame";
import { useShrimpHighScores } from "./useShrimpHighScores";
import { useTankAudio } from "./useTankAudio";
import "./ShrimpTank.css";

interface ShrimpTankProps {
  isOpen: boolean;
  onClose: (score: number, gameSessionId: string | null) => void;
  onOpenLeaderboard: () => void;
}

export const ShrimpTank = ({
  isOpen,
  onClose,
  onOpenLeaderboard,
}: ShrimpTankProps) => {
  const tankRef = useRef<HTMLDivElement>(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [gameSessionId, setGameSessionId] = useState<string | null>(null);
  const {
    isMuted,
    playCollection,
    start: startAudio,
    stop: stopAudio,
    toggle: toggleAudio,
  } = useTankAudio();
  const game = useShrimpGame();
  const highScores = useShrimpHighScores(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => tankRef.current?.focus(), 100);
    startAudio();
    return () => window.clearTimeout(focusTimer);
  }, [isOpen, startAudio]);

  useEffect(() => {
    if (!isOpen || !isSupabaseConfigured) return;
    let isCurrent = true;
    void startShrimpGameSession()
      .then((sessionId) => {
        if (isCurrent) setGameSessionId(sessionId);
      })
      .catch(() => {
        if (isCurrent) setGameSessionId(null);
      });
    return () => {
      isCurrent = false;
    };
  }, [isOpen]);

  const closeTank = () => {
    onClose(game.score, gameSessionId);
    stopAudio();
    game.reset();
    setIsFocusMode(false);
    setGameSessionId(null);
  };

  const moveShrimp = (xChange: number, yChange: number) => {
    if (game.move(xChange, yChange)) playCollection();
  };

  const returnFocusToTank = () => tankRef.current?.focus();

  const handleTankKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const movement = MOVEMENTS[event.key];
    if (!movement) return;
    event.preventDefault();
    moveShrimp(...movement);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeTank}
      onKeyDown={handleTankKeyDown}
      maxWidth={isFocusMode ? "md" : "xs"}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            overflow: "hidden",
            boxShadow: shadows.dialog,
            transition: "max-width .6s ease, width .6s ease",
          },
        },
        backdrop: {
          sx: {
            bgcolor: alpha(colors.ink, 0.38),
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          },
        },
      }}
    >
      <Box
        className={`tank-shell${game.hasStarted ? " has-started" : ""}`}
        sx={{
          bgcolor: colors.tank.water,
          backgroundImage: `linear-gradient(${alpha(colors.paper, 0.08)}, ${alpha(colors.tank.ink, 0.08)}), url('${shrimpAssets.background}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          minHeight: isFocusMode ? { xs: 520, md: 620 } : 430,
          position: "relative",
          overflow: "hidden",
          p: 3.5,
        }}
      >
        <Box className="tank-light" aria-hidden="true" />
        <TankTopControls
          isFocusMode={isFocusMode}
          isMuted={isMuted}
          onClose={closeTank}
          onOpenLeaderboard={() => {
            onOpenLeaderboard();
            returnFocusToTank();
          }}
          onToggleAudio={() => {
            toggleAudio();
            returnFocusToTank();
          }}
          onToggleFocusMode={() => {
            setIsFocusMode((current) => !current);
            returnFocusToTank();
          }}
        />
        <TankBubbles />
        {!game.hasStarted && (
          <Typography
            component="h2"
            sx={{
              position: "absolute",
              zIndex: 2,
              top: 11,
              left: 28,
              color: colors.tank.ink,
              fontSize: "2.6rem",
              letterSpacing: "-.05em",
              lineHeight: 1,
              m: 0,
            }}
          >
            Shrimp tank
          </Typography>
        )}
        <TankScore
          hasStarted={game.hasStarted}
          score={game.score}
          worldRecord={highScores.worldRecord}
        />
        {game.isPartyTime && (
          <Typography className="party-message" aria-live="polite">
            SHRIMPLY THE BEST!
          </Typography>
        )}
        {!game.hasStarted && (
          <Typography
            className="keyboard-hint"
            aria-label="Use the arrow keys to move"
            sx={{
              position: "absolute",
              zIndex: 3,
              top: { xs: 122, sm: 76 },
              right: 28,
              color: colors.tank.hint,
              bgcolor: alpha(colors.paper, 0.48),
              border: `1px solid ${alpha(colors.tank.ink, 0.16)}`,
              borderRadius: 1.5,
              px: 1.25,
              py: 0.75,
              fontSize: ".62rem",
              fontWeight: 800,
              letterSpacing: ".08em",
              lineHeight: 1.2,
              textAlign: "center",
              textTransform: "uppercase",
              boxShadow: `0 4px 14px ${alpha(colors.tank.ink, 0.08)}`,
            }}
          >
            Use arrow keys to swim
            <Box
              component="span"
              sx={{
                display: "block",
                mt: 0.45,
                fontSize: "1rem",
                letterSpacing: ".18em",
                lineHeight: 1,
              }}
            >
              ← ↑ ↓ →
            </Box>
          </Typography>
        )}
        <Box
          ref={tankRef}
          role="application"
          aria-label="Shrimp tank game. Use the arrow keys to move the shrimp."
          tabIndex={0}
          sx={{ position: "absolute", inset: 0, zIndex: 2, outline: "none" }}
        >
          {game.food.map((pellet) => (
            <Box
              key={`${pellet.x}-${pellet.y}`}
              component="img"
              src={shrimpAssets.pellet}
              alt=""
              className="tank-food"
              draggable={false}
              sx={{
                left: `calc(${pellet.x} * 11.5% + 4%)`,
                top: `calc(${pellet.y} * 13% + 34%)`,
              }}
            />
          ))}
          {game.collectionEffect && (
            <Box
              key={game.collectionEffect.id}
              className="collection-ripple"
              sx={{
                left: `calc(${game.collectionEffect.position.x} * 11.5% + 4%)`,
                top: `calc(${game.collectionEffect.position.y} * 13% + 34%)`,
              }}
            />
          )}
          <ShrimpSprite
            className="game-shrimp"
            label="Your cherry shrimp"
            style={{
              left: `calc(${game.shrimpPosition.x} * 11.5% + 4%)`,
              top: `calc(${game.shrimpPosition.y} * 13% + 34%)`,
            }}
            isPartyTime={game.isPartyTime}
            isEating={game.isEating}
            isMoving={game.isMoving}
            swimFrame={game.swimFrame}
            facing={game.facing}
          />
        </Box>
        <ShrimpControls onMove={moveShrimp} />
      </Box>
    </Dialog>
  );
};
