import TeamGrid from "./TeamGrid";

/**
 * BMSection — Business Management roster (Sections A–D).
 */

const bmImages = [
  "https://i.ibb.co/yckT4X3t/bma.jpg",
  "https://i.ibb.co/4wTPGqws/bmb.jpg",
  "https://i.ibb.co/tpzKv3Ls/bmc.jpg",
  "https://i.ibb.co/5g1PzWvk/bmd.jpg",
];

export default function BMSection() {
  return (
    <TeamGrid
      id="bm"
      eyebrow="The first family"
      title="Business Management"
      sections={["A", "B", "C", "D"]}
      images={bmImages}
    />
  );
}
