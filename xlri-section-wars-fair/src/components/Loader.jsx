import { useEffect, useState } from "react";
import "../styles/loader.css";

/**
 * Loader — Fair edition, extended "game reel" sequence (~6.4s total)
 * ------------------------------------------------------------------
 * The loader plays four mini-scenes back to back, like a highlight
 * reel of the battles ahead:
 *
 *   Phase "gun"    (0.0s – 1.7s): revolver cylinder spins, six bullets
 *                                 load chamber by chamber.
 *   Phase "swords" (1.7s – 3.3s): two swords swing in and CLINK twice,
 *                                 sparks flying at each clash.
 *   Phase "chess"  (3.3s – 5.0s): a knight hops across a mini board —
 *                                 strategy joins the fight.
 *   Phase "title"  (5.0s – 5.9s): the event title bounces in.
 *   Phase "exit"   (5.9s – 6.4s): fade out → onFinish() → landing page.
 *
 * Each phase is a plain string in state; one effect walks the schedule
 * with accumulated setTimeouts (all cleared on unmount).
 */
const PHASE_SCHEDULE = [
  { id: "swords", at: 1700 },
  { id: "chess", at: 3300 },
  { id: "title", at: 5000 },
  { id: "exit", at: 5900 },
];
const TOTAL_DURATION = 6400;

/* --- Scene geometry constants --- */
const CHAMBER_COUNT = 6;
const CHAMBER_RADIUS = 34;   // revolver: distance of chambers from center
const BOARD_SQUARES = 5;     // chess: squares in the mini board strip

/* Captions shown under each scene */
const CAPTIONS = {
  gun: "Lock and Load …",
  swords: "Sharpen the Swords…",
  chess: "Opening Gambit …",
};

export default function Loader({ onFinish }) {
  const [phase, setPhase] = useState("gun");

  useEffect(() => {
    const timers = PHASE_SCHEDULE.map(({ id, at }) =>
      setTimeout(() => setPhase(id), at)
    );
    timers.push(setTimeout(onFinish, TOTAL_DURATION));
    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  /* Revolver: pre-compute the six chamber positions (every 60°). */
  const chambers = Array.from({ length: CHAMBER_COUNT }, (_, i) => {
    const angle = (i / CHAMBER_COUNT) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 60 + CHAMBER_RADIUS * Math.cos(angle),
      cy: 60 + CHAMBER_RADIUS * Math.sin(angle),
      delay: i * 0.2, // bullets load one after another
    };
  });

  const isScene = phase === "gun" || phase === "swords" || phase === "chess";

  return (
    <div className={`loader ${phase === "exit" ? "loader--exit" : ""}`}>
      <div className="loader__sunburst" />

      {/* ---------- Scene 1: revolver loading ---------- */}
      {phase === "gun" && (
        <div className="loader__stage" key="gun">
          <svg className="loader__scene-svg" viewBox="0 0 120 120" aria-hidden="true">
            <g className="revolver__spinner">
              <circle cx="60" cy="60" r="56" className="revolver__body" />
              <circle cx="60" cy="60" r="10" className="revolver__axis" />
              {chambers.map(({ cx, cy, delay }, i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="11" className="revolver__chamber" />
                  <circle
                    cx={cx}
                    cy={cy}
                    r="7"
                    className="revolver__bullet"
                    style={{ animationDelay: `${delay}s` }}
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>
      )}

      {/* ---------- Scene 2: swords clinking ---------- */}
      {phase === "swords" && (
        <div className="loader__stage" key="swords">
          <svg className="loader__scene-svg" viewBox="0 0 160 120" aria-hidden="true">
            {/* Left sword: blade + guard + grip, pivots near the grip */}
            <g className="sword sword--left">
              <polygon points="76,18 82,24 34,86 30,82" className="sword__blade" />
              <rect x="24" y="80" width="20" height="5" rx="2" className="sword__guard"
                    transform="rotate(-45 34 84)" />
              <rect x="22" y="86" width="12" height="5" rx="2" className="sword__grip"
                    transform="rotate(-45 26 90)" />
            </g>
            {/* Right sword (mirrored) */}
            <g className="sword sword--right">
              <polygon points="84,18 78,24 126,86 130,82" className="sword__blade" />
              <rect x="116" y="80" width="20" height="5" rx="2" className="sword__guard"
                    transform="rotate(45 126 84)" />
              <rect x="126" y="86" width="12" height="5" rx="2" className="sword__grip"
                    transform="rotate(45 134 90)" />
            </g>
            {/* Spark star at the crossing point — flashes on each clink */}
            <g className="clash-spark">
              {[0, 45, 90, 135].map((deg) => (
                <line
                  key={deg}
                  x1="80" y1="14" x2="80" y2="30"
                  className="clash-spark__ray"
                  transform={"rotate(" + deg + " 80 22)"}
                />
              ))}
            </g>
          </svg>
        </div>
      )}

      {/* ---------- Scene 3: chess knight hopping ---------- */}
      {phase === "chess" && (
        <div className="loader__stage" key="chess">
          <svg className="loader__scene-svg" viewBox="0 0 160 120" aria-hidden="true">
            {/* Mini board strip: alternating maroon / cream squares */}
            {Array.from({ length: BOARD_SQUARES }, (_, i) => (
              <rect
                key={i}
                x={12 + i * 28}
                y="78"
                width="28"
                height="28"
                className={i % 2 === 0 ? "board__square--dark" : "board__square--light"}
              />
            ))}
            {/* The knight (♞) hops square to square across the board */}
            <text x="16" y="72" className="knight">♞</text>
          </svg>
        </div>
      )}

      {/* Caption + progress dots shown during the three scenes */}
      {isScene && (
        <div className="loader__meta">
          <p className="loader__caption">{CAPTIONS[phase]}</p>
          <div className="loader__dots" aria-hidden="true">
            {["gun", "swords", "chess"].map((id) => (
              <span
                key={id}
                className={"loader__dot" + (phase === id ? " loader__dot--active" : "")}
              />
            ))}
          </div>
        </div>
      )}

      {/* ---------- Finale: title ---------- */}
      {(phase === "title" || phase === "exit") && (
        <div className="loader__stage" key="title">
          <h1 className="loader__title">
            XLRI <span>Section Wars</span>
          </h1>
          <p className="loader__tagline">The fair is open!</p>
        </div>
      )}
    </div>
  );
}
