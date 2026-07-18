# XLRI Section Wars — Fair Edition 🎡

The jolly, festive re-theme of the Section Wars microsite. Same React + plain-CSS
architecture as the dark cartel edition — only the theme layer changed.

Palette inspired by the MAXI Fair (maxi-xlri.in) mela branding:
cream canvas · festive red · marigold yellow · teal accent.
**All colors live in `src/styles/variables.css`** — paste exact hex codes there
if you want to match the MAXI site pixel-perfectly.

## Run it

```bash
npm install
npm run dev        # → http://localhost:5173
```

## What changed vs the dark edition

| Piece          | Dark cartel edition            | Fair edition                          |
|----------------|--------------------------------|---------------------------------------|
| Loader         | Spinning revolver cylinder     | 3-scene reel: gun loads → swords clink → knight hops → title |
| Background     | Black→red gradients, smoke     | Cream canvas, sunburst, pastel blobs  |
| Particles      | Rising red embers              | Falling multicolor confetti           |
| Hero           | Neon flicker title             | Bunting flags + wobbling poster title |
| Cards          | Sniper-corner glow cards       | Ticket-stub cards with playful tilt   |
| Fonts          | Bebas Neue / Cinzel / Oswald   | Alfa Slab One / Baloo 2               |
| Music          | /audio/cartel-theme.mp3        | /audio/fair-theme.mp3                 |

Component APIs, hooks (`useScrollReveal`, `useMouseParallax`), file structure and
all performance patterns are identical — great for explaining "theming via
design tokens" in a review.

## Add your assets

- Music → `public/audio/fair-theme.mp3`
- Team photos → replace the `.team-card__photo` div in
  `src/components/TeamGrid.jsx` with `<img src="..." alt="Section A" />`
