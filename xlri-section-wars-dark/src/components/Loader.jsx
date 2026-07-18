import { useEffect, useState } from "react";
import "../styles/loader.css";

/**
 * Loader
 * ------
 * Full-screen cinematic intro (~3.8s total):
 *
 *  Phase "load"  (0.0s – 2.3s): a revolver cylinder spins while its six
 *                               chambers load with glowing red bullets.
 *  Phase "title" (2.3s – 3.2s): the event title stamps onto the screen.
 *  Phase "exit"  (3.2s – 3.8s): everything fades to black, then we hand
 *                               control back to <App /> via onFinish().
 */
const CHAMBER_COUNT = 6;
const CHAMBER_RADIUS = 34; // distance of each chamber from the cylinder center

export default function Loader({ onFinish }) {
  const [phase, setPhase] = useState("load");

  useEffect(() => {
    const toTitle = setTimeout(() => setPhase("title"), 2300);
    const toExit = setTimeout(() => setPhase("exit"), 3200);
    const done = setTimeout(onFinish, 3800);
    return () => [toTitle, toExit, done].forEach(clearTimeout);
  }, [onFinish]);

  // Pre-compute the six chamber positions around the cylinder (every 60°).
  const chambers = Array.from({ length: CHAMBER_COUNT }, (_, i) => {
    const angle = (i / CHAMBER_COUNT) * Math.PI * 2 - Math.PI / 2;
    return {
      cx: 60 + CHAMBER_RADIUS * Math.cos(angle),
      cy: 60 + CHAMBER_RADIUS * Math.sin(angle),
      delay: i * 0.32, // bullets load one after another
    };
  });

  return (
    <div className={`loader ${phase === "exit" ? "loader--exit" : ""}`}>
      {/* Rising smoke behind the revolver */}
      <div className="loader__smoke" />

      {phase === "load" && (
        <div className="loader__stage">
          {/* Revolver cylinder drawn in SVG so it stays crisp at any size */}
          <svg className="loader__cylinder" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="56" className="cylinder__body" />
            <circle cx="60" cy="60" r="10" className="cylinder__axis" />
            {chambers.map(({ cx, cy, delay }, i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="11" className="cylinder__chamber" />
                {/* The "bullet" fades in chamber by chamber */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="7"
                  className="cylinder__bullet"
                  style={{ animationDelay: `${delay}s` }}
                />
              </g>
            ))}
          </svg>
          <p className="loader__caption">Loading the chamber…</p>
        </div>
      )}

      {phase !== "load" && (
        <div className="loader__stage">
          <h1 className="loader__title">
            XLRI <span>Section Wars</span>
          </h1>
          <p className="loader__tagline">Choose your side.</p>
        </div>
      )}
    </div>
  );
}
