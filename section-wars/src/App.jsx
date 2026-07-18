import { useState } from "react";
import SectionWarsLoading from "./SectionWarsLoading.jsx";
import SectionWarsLanding from "./SectionWarsLanding.jsx";
import SectionWars from "./SectionWars.jsx";

// export default function App() {
//   const [entered, setEntered] = useState(false);

//   return entered ? (
//     <SectionWarsLanding />
//   ) : (
//     <SectionWarsLoading onEnter={() => setEntered(true)} />
//   );
// }

export default function App() {
  return <SectionWars />;
}