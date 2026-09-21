# Artist assets

- `public/images/Ayline/`: Aylina portraits and landscape image, plus the September 2 Ayline series.
- `public/images/Elisra/`: Elísra's landscape hero (`Elisra-landscape.png`) and four portraits (`Elísra.png` through `Elísra3.png`). The files were moved out of the Ayline directory without changing the image data.
- `public/images/Vexa/`: the previously uploaded Vexa images; retained as supplied.
- `public/images/PM/`: PM portrait.
- `public/images/Unsorted/`: files not reliably identifiable by name, retained for review.
- `public/videos/Ayline/`: rock-singer video.
- `public/videos/Unsorted/`: other videos awaiting identification.

Aylina's homepage crop is styled in `app/artist-images.css`. Elísra's landscape crop and portraits are in `app/elisra/hero.module.css`, with the hero scroll movement in `app/elisra/ElisraParallax.tsx`. Both parallax effects respect reduced-motion preferences.
