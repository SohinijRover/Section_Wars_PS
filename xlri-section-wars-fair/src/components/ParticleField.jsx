import { useEffect, useRef } from "react";
import "../styles/particles.css";

/**
 * ParticleField — Fair edition
 * ----------------------------
 * Confetti gently falling on a single fixed <canvas>.
 *
 * Same performance model as the dark edition:
 *   • one canvas + one requestAnimationFrame loop
 *   • particles live in plain objects (no React state → no re-renders)
 *   • disabled entirely for prefers-reduced-motion users
 */
const CONFETTI_COUNT = 60;
const CONFETTI_COLORS = ["#c0392b", "#f5a623", "#0e7c7b", "#e97451"];

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let pieces = [];
    let animationId = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // One confetti piece: small rotating rectangle drifting downward.
    const spawnPiece = (startAnywhere = false) => ({
      x: Math.random() * canvas.width,
      y: startAnywhere ? Math.random() * canvas.height : -12,
      w: 5 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      speedY: 0.4 + Math.random() * 0.9,
      swayPhase: Math.random() * Math.PI * 2, // sideways sine wiggle
      swayAmp: 0.4 + Math.random() * 0.8,
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.06,
      alpha: 0.5 + Math.random() * 0.5,
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of pieces) {
        p.y += p.speedY;
        p.x += Math.sin(time / 700 + p.swayPhase) * p.swayAmp; // gentle sway
        p.rotation += p.rotationSpeed;

        // Recycle pieces that fall past the bottom.
        if (p.y > canvas.height + 12) Object.assign(p, spawnPiece());

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    pieces = Array.from({ length: CONFETTI_COUNT }, () => spawnPiece(true));
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
