import { useEffect, useRef } from "react";
import "../styles/particles.css";

/**
 * ParticleField
 * -------------
 * Floating embers rendered on a single fixed <canvas> behind the content.
 *
 * Performance notes (why canvas, not 60 DOM nodes):
 *   • One draw surface, one requestAnimationFrame loop → GPU friendly.
 *   • No React state — particles live in a ref, so this component
 *     never re-renders after mount.
 *   • The loop pauses automatically for reduced-motion users.
 */
const PARTICLE_COUNT = 55;

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return; // static page for users who prefer no motion

    // Create one ember with randomized size, speed, drift and flicker.
    const spawnParticle = (startAnywhere = false) => ({
      x: Math.random() * canvas.width,
      // New embers start below the screen; initial batch is scattered.
      y: startAnywhere ? Math.random() * canvas.height : canvas.height + 10,
      radius: 0.8 + Math.random() * 2.2,
      speedY: 0.25 + Math.random() * 0.7,   // rising speed
      driftX: (Math.random() - 0.5) * 0.35,  // sideways sway
      alpha: 0.15 + Math.random() * 0.5,
      flicker: Math.random() * Math.PI * 2,  // phase offset for twinkle
    });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y -= p.speedY;
        p.x += p.driftX;

        // Recycle embers that float off the top.
        if (p.y < -10) Object.assign(p, spawnParticle());

        // Gentle sine flicker so embers "breathe".
        const twinkle = 0.65 + 0.35 * Math.sin(time / 400 + p.flicker);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 60, 30, ${p.alpha * twinkle})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 42, 42, 0.8)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => spawnParticle(true));
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
