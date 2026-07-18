# XLRI Section Wars — Event Microsite

A single-page, cartel-themed cinematic microsite built with **React + plain CSS**
(no UI libraries, no animation libraries).

## Run it

```bash
npm install
npm run dev        # → http://localhost:5173
```

Production build:

```bash
npm run build      # output in /dist
npm run preview    # serve the build locally
```

## Add your assets

| Asset        | Where                                                        |
|--------------|--------------------------------------------------------------|
| Music track  | `public/audio/cartel-theme.mp3` (looping instrumental)       |
| Team photos  | Replace `.team-card__photo` div in `src/components/TeamGrid.jsx` with `<img src="..." alt="Section A" />` — hover effects keep working |

## Project structure

```
src/
├── components/
│   ├── Loader.jsx        # revolver-cylinder intro (~3.8s), then fades out
│   ├── Hero.jsx          # cinematic hero, mouse parallax, CTA
│   ├── TeamGrid.jsx      # reusable roster grid + square photo cards
│   ├── BMSection.jsx     # Business Management (A–D) — wraps TeamGrid
│   ├── HRMSection.jsx    # Human Resource Mgmt (A–C) — wraps TeamGrid
│   ├── MusicPlayer.jsx   # looping bg score @25%, autoplay fallback, mute toggle
│   ├── ParticleField.jsx # canvas ember particles (one rAF loop, no re-renders)
│   ├── CustomCursor.jsx  # dot + lerped ring cursor (desktop only)
│   └── Footer.jsx
├── hooks/
│   ├── useScrollReveal.js   # IntersectionObserver reveal-on-scroll
│   └── useMouseParallax.js  # writes --mx/--my CSS vars (zero re-renders)
├── styles/
│   ├── variables.css     # design tokens: colors, fonts, glows, easing
│   ├── global.css        # base styles, smoke, vignette, reveal utilities
│   └── *.css             # one stylesheet per component
├── App.jsx               # loader → landing page orchestration
└── main.jsx
```

## Performance notes (worth mentioning in a review)

- **Animations run on `transform`/`opacity` only** → compositor-friendly 60fps.
- **Particles use one `<canvas>` + one `requestAnimationFrame` loop**, stored in
  refs — the component never re-renders after mount.
- **Parallax and cursor write to the DOM directly** (CSS variables / transforms)
  instead of React state, so mouse movement causes zero re-renders.
- **Scroll reveals fire once** and disconnect their IntersectionObserver.
- **`prefers-reduced-motion` is respected** — animations and particles switch off.
