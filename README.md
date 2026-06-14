# Barranquilla — La belleza escondida

A visual gallery celebrating the hidden beauty of Barranquilla through Street View imagery.

## Tech Stack

- **Next.js 15** (App Router) — framework & image optimization
- **GSAP + ScrollTrigger** — scroll-driven animations, section pinning, parallax
- **Lenis** — smooth scrolling
- **Tailwind CSS** — styling
- **Framer Motion** — page transitions (planned)
- **Vercel** — deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Pages (App Router)
│   ├── page.tsx      # Gallery (scroll-driven)
│   ├── about/        # Project bio
│   └── contact/      # Contact page
├── components/       # UI components
│   ├── hero.tsx      # Landing hero with entrance animation
│   ├── gallery-section.tsx  # Individual image section (pinned + animated)
│   └── navigation.tsx       # Fixed nav with menu overlay
├── data/             # Gallery content (JSON-like)
│   └── gallery.ts
└── lib/              # Providers & utilities
    └── lenis-provider.tsx   # Smooth scroll + GSAP integration
```

## Adding Images

1. Place images in `public/images/`
2. Add entries to `src/data/gallery.ts`
3. Images are automatically optimized via `next/image`

## Deploy

Push to main — Vercel auto-deploys.
