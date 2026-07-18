import TeamGrid from "./TeamGrid";

/**
 * HRMSection — Human Resource Management roster (Sections A–C).
 */

const hrmImages = [
  "https://i.ibb.co/pBXvsJWv/hrma.jpg",
  "https://i.ibb.co/wrKZXN66/hrmb.jpg",
  "https://i.ibb.co/b5sHn6H9/hrmc.jpg",
];

export default function HRMSection() {
  return (
    <TeamGrid
      id="hrm"
      eyebrow="The crowd favourites"
      title="Human Resource Management"
      sections={["A", "B", "C"]}
      images={hrmImages}
    />
  );
}
