import { useEffect, useRef, useState } from "react";
import "../styles/musicplayer.css";

const TRACK_SRC = "/audio/fair-theme.mp3"; // ← drop your track here, keep the name
const TRACK_VOLUME = 0.25;                  // 25% — background, not foreground

/**
 * MusicPlayer — Fair edition
 * --------------------------
 * Looping festive score at low volume.
 * Flow (identical logic to the dark edition):
 *   1. Try autoplay on mount.
 *   2. Blocked? → show a bouncy "Start the music" pill.
 *   3. Playing → only the corner mute/unmute equalizer remains.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = TRACK_VOLUME;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsBlocked(true)); // browser autoplay policy
  }, []);

  const startMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => {
      setIsPlaying(true);
      setIsBlocked(false);
    });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      startMusic();
      return;
    }
    audio.muted = !audio.muted;
    setIsPlaying(!audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} loop preload="auto" />

      {isBlocked && (
        <button className="music-cta" onClick={startMusic}>
          <span className="music-cta__dot" /> Start the music
        </button>
      )}

      <button
        className={`music-toggle ${isPlaying ? "music-toggle--on" : ""}`}
        onClick={toggleMute}
        aria-label={isPlaying ? "Mute music" : "Unmute music"}
        title={isPlaying ? "Mute" : "Unmute"}
      >
        <span className="music-toggle__bar" />
        <span className="music-toggle__bar" />
        <span className="music-toggle__bar" />
      </button>
    </>
  );
}
