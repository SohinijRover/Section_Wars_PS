import { useEffect, useRef } from "react";
import "../styles/cursor.css";

/**
 * CustomCursor
 * ------------
 * A red dot + trailing ring replacing the native cursor on desktop.
 *
 *   • Dot   → snaps to the pointer instantly.
 *   • Ring  → lerps toward the pointer each frame (smooth cinematic lag).
 *   • Hovering anything interactive (a, button, .team-card__frame)
 *     expands the ring like a crosshair locking on.
 *
 * DOM is updated directly via refs inside requestAnimationFrame —
 * zero React re-renders while the mouse moves.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on precise pointers (skip phones/tablets entirely).
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const mouse = { x: -100, y: -100 }; // start off-screen
    const ringPos = { x: -100, y: -100 };
    let animationId = 0;

    const handleMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    };

    // Expand the ring over interactive targets.
    const handleOver = (event) => {
      const interactive = event.target.closest("a, button, .team-card__frame");
      ring.classList.toggle("cursor-ring--active", Boolean(interactive));
    };

    const animate = () => {
      // Linear interpolation: ring closes 18% of the gap per frame.
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`;
      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
