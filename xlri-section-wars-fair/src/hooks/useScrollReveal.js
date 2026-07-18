import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal
 * ----------------
 * Lightweight scroll-triggered reveal using the native IntersectionObserver —
 * no animation library needed.
 *
 * Usage:
 *   const [ref, isVisible] = useScrollReveal();
 *   <div ref={ref} className={`reveal ${isVisible ? "is-visible" : ""}`}>
 *
 * The element animates once, then the observer disconnects (no wasted work).
 */
export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // fire once → no re-renders afterwards
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
