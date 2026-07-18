import useScrollReveal from "../hooks/useScrollReveal";
import "../styles/footer.css";

/**
 * Footer — closing frame of the film.
 * Fades in on scroll like an end-credits card.
 */
export default function Footer() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <footer
      ref={ref}
      className={`footer reveal ${isVisible ? "is-visible" : ""}`}
    >
      <h2 className="footer__title">XLRI Section Wars</h2>
      <p className="footer__tagline">Choose your side.</p>
    </footer>
  );
}
