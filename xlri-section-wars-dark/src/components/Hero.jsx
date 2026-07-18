import useMouseParallax from "../hooks/useMouseParallax";
import "../styles/hero.css";

/**
 * Hero
 * ----
 * Full-viewport cinematic opener.
 *
 * Parallax: useMouseParallax() writes --mx / --my CSS variables on the
 * section; each layer multiplies them by a different distance, so the
 * background, title and glow drift at different speeds (depth illusion).
 *
 * Entrance: pure CSS keyframes staggered with animation-delay — they play
 * the moment the loader unmounts, so the page "arrives" like a film title.
 */
export default function Hero() {
  const parallaxRef = useMouseParallax();

  // Smooth-scrolls to the first roster section.
  const enterBattlefield = () => {
    document.getElementById("bm")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" ref={parallaxRef} aria-label="XLRI Section Wars">
      {/* Depth layer 1 — big red ambient glow, moves the most */}
      <div className="hero__glow" aria-hidden="true" />

      {/* Depth layer 2 — the title block */}
      <div className="hero__content">
        <p className="hero__eyebrow">XLRI presents</p>

        <h1 className="hero__title">
          <span className="hero__title-line">Section</span>
          <span className="hero__title-line hero__title-line--red">Wars</span>
        </h1>

        <p className="hero__subtitle">
          Seven sections. One turf. No mercy.
        </p>

        <button className="btn-cartel" onClick={enterBattlefield}>
          Enter the Battlefield
        </button>
      </div>

      {/* Scroll hint at the bottom edge */}
      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        Scroll
      </div>
    </section>
  );
}
