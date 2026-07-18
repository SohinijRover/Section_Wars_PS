# Section Wars '26 — MAXI

A cinematic noir-themed event site: a silent-film loading intro (safehouse → shootout → logo stamp), followed by the full landing page with the cartels, operations, and gallery sections.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:5173 (it should open automatically).

## Flow

1. `SectionWarsLoading` plays the intro sequence (you can hit **SKIP INTRO**).
2. Clicking **ENTER THE WAR** switches to `SectionWarsLanding` — the full page with hero, invitation, cartels (tap to flip), operations, and gallery.

## Structure

```
section-wars/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                 # entry point
    ├── index.css                # base reset + page background
    ├── App.jsx                  # wires intro → landing
    ├── SectionWarsLoading.jsx   # cinematic loading sequence
    └── SectionWarsLanding.jsx   # main landing page
```

## Build for production

```bash
npm run build
npm run preview
```
