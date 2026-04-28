# shahzaibsiddiqui.vercel.app — Portfolio

Single-page portfolio for Shahzaib Siddiqui. Vanilla HTML/CSS/JS. No build step. Hosted on Vercel.

Live: https://shahzaibsiddiqui.vercel.app

## Local preview

```bash
cd /Users/shahzaibsiddiqui/portfolio
python3 -m http.server 4321
# open http://localhost:4321
```

Or any static server (`npx serve`, `live-server`, etc.).

## Deploy

Hosted on Vercel. Deploy from this folder:

```bash
npx vercel --prod
```

`vercel.json` sets cache headers + security headers.

## Structure

```
.
├── index.html         single-page app
├── 404.html           custom 404
├── styles/            CSS (tokens, base, per-section)
├── scripts/           JS (vanilla, no build, no GSAP in V1)
└── assets/
    ├── photos/        portrait + working photo
    ├── cases/<slug>/  case-study screenshots
    ├── looms/         (looms hosted on loom.com — folder for thumbnails only)
    ├── pdf/           one-pager
    └── og/            favicon, og-image
```

## V1 owner-supplied assets

Drop these in to wire the site fully:

| Path | Purpose |
|---|---|
| `assets/photos/portrait.jpg` (or .png/.webp) | Hero cursor-glow photo. ≥2000px long edge. Auto-detected by `scripts/hero-photo.js`. |
| `assets/cases/sirge-os/01.jpg` etc. | Case-study screenshots (when ready, replace the placeholder divs in `scripts/work-modal.js` with `<img>` tags). |
| `assets/pdf/shahzaib-siddiqui.pdf` | One-pager resume. |
| `assets/og/og-image.png` | 1200×630 PNG converted from `og-image.svg` for full LinkedIn/FB OG card support. |

## Form endpoint

The Shahz-AI spoof copilot currently uses a `mailto:` fallback. To switch to a real endpoint:

1. Sign up at https://formspree.io (free tier: 50/mo)
2. Edit `scripts/copilot.js`:
   ```js
   const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_ID';
   ```

## Motion (V1 — vanilla, no GSAP)

- `IntersectionObserver` triggers `.fade-in` → `.in-view` for scroll-fade entrances
- Hero name uses CSS keyframe stagger on load
- Hero photo uses cursor-position CSS variables driving a `mask-image` radial-gradient
- Stats grid uses vanilla CountUp with `requestAnimationFrame`
- All motion respects `prefers-reduced-motion: reduce`

V2 will introduce GSAP for the full Lando-style mask reveal + ScrollTrigger pinned timeline.

## Decision log

See `PRD.md` Appendix A.

## License

Private.
