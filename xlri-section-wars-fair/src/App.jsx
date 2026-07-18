import { useCallback, useState } from "react";

import Loader from "./components/Loader";
import CustomCursor from "./components/CustomCursor";
import ParticleField from "./components/ParticleField";
import MusicPlayer from "./components/MusicPlayer";
import Hero from "./components/Hero";
import BMSection from "./components/BMSection";
import HRMSection from "./components/HRMSection";
import Footer from "./components/Footer";

/**
 * App
 * ---
 * Orchestrates the two states of the site:
 *
 *   1. isLoading === true  → only the cinematic <Loader /> is mounted.
 *   2. isLoading === false → the loader unmounts and the full landing
 *      page mounts, which triggers every hero entrance animation and
 *      the music autoplay attempt at exactly the right moment.
 *
 * Layer order (z-index):
 *   smoke (0) → embers (0) → content (1) → vignette (40) →
 *   music controls (60) → cursor (999). Loader sits above all (100).
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Stable callback so <Loader /> effects don't re-run on re-renders.
  const handleLoaderFinish = useCallback(() => setIsLoading(false), []);

  if (isLoading) {
    return <Loader onFinish={handleLoaderFinish} />;
  }

  return (
    <>
      {/* Ambient, fixed layers */}
      <div className="smoke-layer" aria-hidden="true" />
      <ParticleField />
      <div className="vignette" aria-hidden="true" />

      {/* UI chrome */}
      <CustomCursor />
      <MusicPlayer />

      {/* Page content — single vertical scroll */}
      <main>
        <Hero />
        <div className="separator" />
        <BMSection />
        <div className="separator" />
        <HRMSection />
      </main>
      <Footer />
    </>
  );
}
