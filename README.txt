KURO — an agency trio
=====================
Founders: Riu, Kai, Rishabh  (Kuro = "black" in Japanese; K = Kai, R = Riu & Rishabh)

FILES
  index.html            The site — one self-contained file (inline CSS + JS, no build step).
  DESIGN.md             Handoff spec: tokens, components, motion, breakpoints, accessibility.
  KURO_Brand.html       Brand sheet v1 (original acid-lime palette, logo concepts)
  Style_Reference.html  9 duotone palettes pulled from the reference images
  Trend_Styles.html     6 style demos + ZARZ container style
  KURO_v3.zip           Zipped package of the previous (v3) site

LIVE
  https://kuro-agency-website.vercel.app/
  repo: github.com/riuxin/kuro-Agency-website

FEATURES IN index.html (v4 — editorial dark redesign)
  - Palette: matte black #09090b, zinc surfaces #121214 / #18181b, indigo + violet accents
  - Type: Geist (grotesk) + Instrument Serif italic accents + Geist Mono labels, fluid clamp() sizes
  - Glass sticky header: blur, condenses on scroll, hides on scroll-down, returns on scroll-up
  - Full-screen mobile menu with staggered entrance, focus trap, Esc to close
  - Hero: line-mask entrance, SVG grid + pointer-following lens/glow (transform-only), capability marquee
  - Services bento grid (Brand, Engineering, Product, Growth) with pointer-tracking border glow
  - Case studies: Downing, Club Championship, RaffClub — CSS/SVG cover art, zoom on hover
  - Studio section: founders + 4-step process
  - Brief builder: 4-step project inquiry with live scope estimate, validation, mailto submit
  - FAQ accordion with smooth height interpolation and animated plus/minus
  - Footer: big CTA, London & Lisbon studios, live local time, socials, share sheet with QR
  - Scroll reveals, reduced-motion support, WCAG 2.1 AA (axe-core: 0 violations)

PENDING
  - Confirm case-study copy (industry, year, services) for Downing / Club Championship / RaffClub
  - Add real X / LinkedIn / Dribbble handles (currently platform home pages)
  - Optional: send briefs to a form backend (Formspree / Vercel function) instead of mailto
  - Domains to buy: kuro.graphics or studiokuro.com (verify availability first)
