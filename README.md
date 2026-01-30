# Social Route – Agency Portfolio

Premium, minimalist, animated 3D agency portfolio for **Social Route** digital marketing agency. Built with Next.js (App Router), Tailwind CSS, GSAP + ScrollTrigger, Framer Motion, and React Three Fiber.

## Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** – styling
- **GSAP + ScrollTrigger** – scroll-based animations
- **Framer Motion** – micro-interactions and carousels
- **React Three Fiber + Drei** – 3D hero scene (lazy-loaded)

## Design

- Minimalist, premium agency look
- Large typography (Poppins, Montserrat), strong spacing, limited palette (dark + accent gold)
- Smooth scroll storytelling, section animations, subtle 3D in hero
- Desktop-first with mobile fallbacks; respects `prefers-reduced-motion`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy (Vercel)

```bash
npm run build
```

Deploy to Vercel: connect the repo or run `vercel` from the project root. The project is configured for the Next.js framework on Vercel.

## Project Structure

- `app/` – layout, page, globals
- `components/` – hero (3D, cycling text), trust, about, services, process, why, testimonials, cta, contact, footer, layout (header)
- `lib/` – utils (cn, prefersReducedMotion)
- `components/providers/` – GSAPProvider for ScrollTrigger and reduced-motion

## Performance

- 3D scene is dynamically imported and not rendered on server
- GSAP/ScrollTrigger animations are skipped when user prefers reduced motion
- Optimized for WebP/AVIF via Next.js config
