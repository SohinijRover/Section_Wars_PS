import TeamGrid from "./TeamGrid";

/**
 * BMSection — Business Management roster (Sections A–D).
 * Thin wrapper: all layout/animation lives in the reusable <TeamGrid />.
 */
export default function BMSection() {
  return (
    <TeamGrid
      id="bm"
      eyebrow="The headline act"
      title="Business Management"
      sections={["A", "B", "C", "D"]}
    />
  );
}
