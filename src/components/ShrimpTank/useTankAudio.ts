import { useCallback, useEffect, useRef, useState } from "react";

const MASTER_VOLUME = 0.34;
const AUDIO_FADE_MS = 1800;
const AUDIO_LAYERS = [
  { url: "/assets/shrimp/audio/relax-beat-arulo.mp3", volume: 0.58 },
  {
    url: "/assets/shrimp/audio/water-flowing-ambience-loop.mp3",
    volume: 0.08,
  },
] as const;

const playCollectionChime = (context: AudioContext, destination: AudioNode) => {
  [659.25, 830.61].forEach((frequency, index) => {
    const startAt = context.currentTime + index * 0.035;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(
      index === 0 ? 0.045 : 0.026,
      startAt + 0.025,
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.85);
    oscillator.connect(gain).connect(destination);
    oscillator.start(startAt);
    oscillator.stop(startAt + 0.9);
  });
};

export const useTankAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const audioLayersRef = useRef<HTMLAudioElement[]>([]);
  const fadeFramesRef = useRef(new Map<HTMLAudioElement, number>());

  const fadeInAudio = useCallback((audio: HTMLAudioElement, volume: number) => {
    const startedAt = performance.now();

    const fade = (now: number) => {
      const progress = Math.min(
        Math.max((now - startedAt) / AUDIO_FADE_MS, 0),
        1,
      );
      audio.volume = volume * progress;
      if (progress < 1) {
        fadeFramesRef.current.set(audio, requestAnimationFrame(fade));
      } else {
        fadeFramesRef.current.delete(audio);
      }
    };

    fadeFramesRef.current.set(audio, requestAnimationFrame(fade));
  }, []);

  const stop = useCallback(() => {
    fadeFramesRef.current.forEach((frame) => cancelAnimationFrame(frame));
    fadeFramesRef.current.clear();
    audioLayersRef.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    audioLayersRef.current = [];
    if (contextRef.current) void contextRef.current.close();
    contextRef.current = null;
    masterGainRef.current = null;
  }, []);

  const start = useCallback(() => {
    stop();
    const context = new AudioContext();
    const masterGain = context.createGain();
    masterGain.gain.value = MASTER_VOLUME;
    masterGain.connect(context.destination);
    contextRef.current = context;
    masterGainRef.current = masterGain;

    audioLayersRef.current = AUDIO_LAYERS.map(({ url, volume }) => {
      const audio = new Audio(url);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      void audio
        .play()
        .then(() => fadeInAudio(audio, volume))
        .catch(() => {
          // Browsers may block audio if opening the tank was not treated as a gesture.
        });
      return audio;
    });
    setIsMuted(false);
  }, [fadeInAudio, stop]);

  const toggle = useCallback(() => {
    const context = contextRef.current;
    if (!context) return;
    if (context.state === "running") {
      void context.suspend();
      audioLayersRef.current.forEach((audio) => audio.pause());
      setIsMuted(true);
    } else {
      void context.resume();
      audioLayersRef.current.forEach((audio) => {
        void audio.play().catch(() => undefined);
      });
      setIsMuted(false);
    }
  }, []);

  const playCollection = useCallback(() => {
    const context = contextRef.current;
    const destination = masterGainRef.current;
    if (!context || !destination || context.state !== "running") return;
    playCollectionChime(context, destination);
  }, []);

  useEffect(() => stop, [stop]);

  return { isMuted, playCollection, start, stop, toggle };
};
