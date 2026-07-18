import { useEffect, useRef, useState } from "react";
import "../styles/musicplayer.css";

const TRACK_SRC = "/audio/cartel-theme.mp3"; // ← replace file, keep the name
const TRACK_VOLUME = 0.25;                    // 25% — background, not foreground

/**
 * MusicPlayer
 * -----------
 * Looping background score at low volume.
 *
 * Browsers block autoplay-with-sound until the user interacts with the
 * page, so the flow is:
 *   1. Try to autoplay on mount.
 *   2. If blocked → show a prominent "Play the score" pill (bottom center).
 *   3. Once playing → only the small corner mute/unmute control remains.
 */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  // Attempt autoplay once the component mounts (right after the loader).
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = TRACK_VOLUME;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsBlocked(true)); // autoplay policy kicked in
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
      // If mute was pressed before music ever started, this also starts it.
      startMusic();
      return;
    }
    audio.muted = !audio.muted;
    setIsPlaying(!audio.muted);
  };

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} loop preload="auto" />

      {/* Prominent fallback when the browser blocks autoplay */}
      {isBlocked && (
        <button className="music-cta" onClick={startMusic}>
          <span className="music-cta__dot" /> Play the score
        </button>
      )}

      {/* Fixed corner control — equalizer bars animate while playing */}
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
