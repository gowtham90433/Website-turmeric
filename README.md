# Suvarna Turmeric Exports — Website

A premium, single-page 3D website for a turmeric export brand, built with React, Vite and React Three Fiber.

## Stack

- React 19 + Vite
- [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) / [@react-three/drei](https://github.com/pmndrs/drei) for the 3D scenes (procedurally generated turmeric root and packaging — no external 3D assets)
- Plain modern CSS with design tokens (`src/index.css`, `src/styles/site.css`)

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint       # oxlint
```

## Structure

- `src/components/sections/` — one component per page section (Hero, Origin, Products, Quality, Applications, Export, Packaging, Company, Contact)
- `src/components/three/` — procedural 3D primitives (turmeric root, packaging mockups, particles) and their scenes
- `src/components/shared/` — Reveal (scroll-in animation), LazyMount (defers mounting WebGL canvases until near-viewport), icons, tilt cards
- `src/styles/site.css` — component styles; `src/index.css` — design tokens & base styles

## Notes

- No certifications, statistics, or company facts are fabricated. Placeholder copy in the Company and Quality sections is written to be truthful-by-default and should be replaced with real company information before launch.
- The 3D turmeric root and packaging models are generated procedurally in code (noise-displaced geometry + canvas-based label textures) rather than using downloaded model/photo assets.
- 3D scenes are lazy-mounted and reduced/disabled under `prefers-reduced-motion` and on small viewports for performance.
