import useMouseParallax from "../hooks/useMouseParallax";
import "../styles/hero.css";

// Bunting flag colors cycle through the fair palette.
const BUNTING_COLORS = ["#c0392b", "#f5a623", "#0e7c7b"];
const BUNTING_FLAGS = 18;

/**
 * Hero — Fair edition
 * -------------------
 * Full-viewport festive opener:
 *   • A string of triangular bunting flags sways along the top edge.
 *   • A giant sunburst slowly rotates behind the title (circus poster).
 *   • Mouse parallax: --mx/--my CSS vars move layers at different depths.
 *   • CTA smooth-scrolls down to the BM roster.
 */
export default function Hero() {
  const parallaxRef = useMouseParallax();

  const enterBattlefield = () => {
    document.getElementById("bm")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" ref={parallaxRef} aria-label="XLRI Section Wars">
      {/* Rotating sunburst — deepest parallax layer */}
      <div className="hero__sunburst" aria-hidden="true" />

      {/* Swaying bunting across the top */}
      <div className="hero__bunting" aria-hidden="true">
        {Array.from({ length: BUNTING_FLAGS }, (_, i) => (
          <span
            key={i}
            className="hero__flag"
            style={{
              background: BUNTING_COLORS[i % BUNTING_COLORS.length],
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">XLRI presents</p>

        <h1 className="hero__title">
          <span className="hero__title-line">Section</span>
          <span className="hero__title-line hero__title-line--pop">Wars</span>
        </h1>

        <p className="hero__subtitle">
          Seven sections. One fairground. Endless fun.
        </p>

        <button className="btn-fair" onClick={enterBattlefield}>
          Enter the Battlefield
        </button>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="hero__scroll-line" />
        Scroll
      </div>
    </section>
  );
}
