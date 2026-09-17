# PM’s — cinematic standalone demo

A responsive Next.js App Router, TypeScript and Tailwind CSS homepage inspired by the supplied mockup.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's ready

- Dark cinematic homepage with Alyine hero, gold details and six sections.
- Responsive navigation and search overlay.
- Interactive section previews and local-only chat/discussion demos.
- Three custom SVG **illustration placeholders** in `public/images` so the design runs without missing images.

**Important:** SVG artwork is illustrative and is **not** the original photographic artwork from the mockup. Replace `public/images/hero.svg`, `notebook.svg`, and `crowd.svg` with your own appropriately licensed high-resolution Alyine photos and covers when ready, and update the CSS image URLs if filenames change. Music is a visual preview, not an audio player. Chat and discussions do not communicate with other users or persist data. No login is configured.

## Edit

- `app/page.tsx` — text, cards, navigation and local demo interactions.
- `app/globals.css` — styling and responsive rules.
- `app/layout.tsx` — site title and description.
- `public/images` — replaceable illustration assets.
