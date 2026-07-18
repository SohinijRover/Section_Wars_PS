import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/teamgrid.css";

/**
 * TeamCard
 * --------
 * One square placeholder card. Swap the .team-card__photo <div> for an
 * <img src="..."> later — every hover effect keeps working unchanged.
 */
function TeamCard({ letter, index }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`team-card reveal reveal--zoom ${isVisible ? "is-visible" : ""}`}
      // Stagger: each card in the row arrives slightly after the previous one.
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className="team-card__frame">
        {/* PHOTO PLACEHOLDER — replace this div with your team <img> */}
        <div className="team-card__photo">
          <span className="team-card__letter">{letter}</span>
          <span className="team-card__hint">Team photo</span>
        </div>
        {/* Corner brackets, drawn on hover like a sniper scope locking on */}
        <span className="team-card__corner team-card__corner--tl" />
        <span className="team-card__corner team-card__corner--br" />
      </div>

      <footer className="team-card__label">
        <span className="team-card__section">Section {letter}</span>
      </footer>
    </article>
  );
}

/**
 * TeamGrid
 * --------
 * Reusable roster section. BM and HRM both render this with different
 * props — one implementation, zero duplicated markup or CSS.
 *
 * Props:
 *   id       — anchor target (e.g. "bm") for smooth scrolling
 *   eyebrow  — small Cinzel label above the title
 *   title    — big display title ("Business Management")
 *   sections — array of section letters (["A","B","C","D"])
 */
export default function TeamGrid({ id, eyebrow, title, sections }) {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section id={id} className="team-grid">
      <div className="container">
        <header
          ref={headerRef}
          className={`team-grid__header reveal ${headerVisible ? "is-visible" : ""}`}
        >
          <p className="team-grid__eyebrow">{eyebrow}</p>
          <h2 className="team-grid__title">{title}</h2>
        </header>

        <div className="team-grid__cards">
          {sections.map((letter, index) => (
            <TeamCard key={letter} letter={letter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
