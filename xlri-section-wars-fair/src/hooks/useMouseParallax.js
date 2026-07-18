import { useEffect, useRef } from "react";

/**
 * useMouseParallax
 * ----------------
 * Tracks the mouse and writes normalized coordinates (-1 … 1) into CSS
 * custom properties (--mx / --my) on the returned element.
 *
 * Why CSS variables instead of React state?
 *   → Zero re-renders. The browser moves the layers on the compositor,
 *     which keeps the parallax at a smooth 60fps.
 *
 * Child layers consume it like:
 *   transform: translate(calc(var(--mx) * 20px), calc(var(--my) * 20px));
 */
export default function useMouseParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip entirely for touch devices / reduced-motion users.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;

    const handleMove = (event) => {
      // Throttle DOM writes to one per animation frame.
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;  // -1 … 1
        const y = (event.clientY / window.innerHeight) * 2 - 1; // -1 … 1
        element.style.setProperty("--mx", x.toFixed(3));
        element.style.setProperty("--my", y.toFixed(3));
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
