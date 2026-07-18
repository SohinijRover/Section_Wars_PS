import TeamGrid from "./TeamGrid";

/**
 * HRMSection — Human Resource Management roster (Sections A–C).
 * Same reusable <TeamGrid />, different data.
 */
export default function HRMSection() {
  return (
    <TeamGrid
      id="hrm"
      eyebrow="The rival house"
      title="Human Resource Management"
      sections={["A", "B", "C"]}
    />
  );
}
