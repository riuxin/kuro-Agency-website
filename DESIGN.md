# KURO — Design Handoff Spec

The whole site lives in one self-contained `index.html`, with inline CSS and vanilla JS. There is no build step, no framework and no 3D/WebGL. Every value below is a CSS custom property on `:root`. Edit the token, not the usage.

## Overview
This is a single-page marketing site for an independent design and engineering studio. Its main job is to turn visitors into enquiries through the **brief builder** (`#contact`). Every CTA on the page leads there.

Section order:
`Header → Hero (+ marquee) → 01 Capabilities (bento) → 02 Selected work → 03 Studio → 04 Brief builder → 05 FAQ → Footer CTA`

## Design tokens

### Colour
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#09090b` | Page background, inset panels |
| `--surface` | `#121214` | Cards, brief panel |
| `--surface-2` | `#18181b` | Card hover layer (`rgba(24,24,27,.8)`) |
| `--surface-3` | `#1f1f23` | UI-mock fills, meter tracks |
| `--line` / `--line-2` / `--line-3` | white at 8 / 12 / 22 % | Hairlines → hover borders |
| `--text` | `#fafafa` | Headings, primary text, primary button fill |
| `--text-2` | `#a1a1aa` | Body copy (7.8:1 on `--bg`) |
| `--text-3` | `#8b8b94` | Labels, mono meta (5.7:1 on `--bg`) |
| `--indigo` / `--indigo-hi` / `--indigo-soft` | `#6366f1` / `#818cf8` / `#a5b4fc` | Accent fills, dots, accent text |
| `--violet` / `--violet-hi` | `#8b5cf6` / `#a78bfa` | Gradient partner to indigo |

The accent is used sparingly: dots, focus rings, italic serif words and meters. CTAs are crisp white on black.

### Typography
| Token | Value | Usage |
|---|---|---|
| `--font-sans` | Geist 300–800 | Everything by default |
| `--font-serif` | Instrument Serif *italic* | One emphasis word per headline (`.h-em`), with a gradient fill |
| `--font-mono` | Geist Mono 400/500 | Eyebrows, indices, metadata, logo sub-tag |
| `--fs-display` | `clamp(2.5rem, 1.05rem + 7.2vw, 8.25rem)`, capped at `9vw` | Hero H1 (letter-spacing −0.055em) |
| `--fs-h2` | `clamp(2.125rem, 1.15rem + 3.7vw, 4.75rem)` | Section titles (−0.045em) |
| `--fs-h3` | `clamp(1.375rem, 1.1rem + 1vw, 1.875rem)` | Card titles |
| `--fs-lead` | `clamp(1.0625rem, .98rem + .4vw, 1.3125rem)` | Lead paragraphs |

Headlines use `text-wrap: balance` and paragraphs use `pretty`. The three hero lines were tested to stay one line each from 360px to 2560px.

### Space, radius, layout
| Token | Value |
|---|---|
| `--gutter` | `clamp(16px, 4vw, 48px)` (side padding; 16px on phones) |
| `--max` | `1440px` content width (`.wrap`) |
| `--r-sm / --r / --r-lg / --r-xl` | 10 / 16 / 24 / 32px |
| `--header-h` | 72px |
| Section padding | `clamp(96px, 12vw, 176px)` top and bottom |
| Grid gap | 20px (bento and work grid) |

### Motion
| Token | Value |
|---|---|
| `--ease` | `cubic-bezier(.16,1,.3,1)`, the standard for every interactive transition |
| `--dur` | `.4s` |
| `--ease-io` | `cubic-bezier(.65,0,.35,1)` (ambient loops only) |

Transitions name their properties explicitly and do not use `transition: all`, so the browser never animates layout by accident. Animations use `transform` and `opacity` only. The one exception is the FAQ, which interpolates `grid-template-rows` because a height animation was explicitly requested.

## Components

| Component | Variants / states | Notes |
|---|---|---|
| `.btn` | `-primary` (white), `-ghost` (outline); `-sm` 40px, default 48px, `-lg` 56px | Hover: arrow nudges 3px and an indigo glow fades in (pseudo-element opacity). Active: `scale(.97)` |
| `.site-header` | default → `.is-condensed` (y > 24px) → `.is-hidden` (scrolling down past 160px) | Glass: `rgba(9,9,11,.7)`, `blur(12px)`, 1px `white/10` bottom border. "Shrink" is two transforms (bar −10px, content +5px), so there's no layout reflow. Never hides while it holds focus or while the menu is open |
| `.nav-links a` | default, hover, `.is-active` (scrollspy) | 1px underline that `scaleX`es from the left |
| `.brand` | hover | Indigo dot scales and glows. Mono sub-tag flips `黒 / Studio` → `Est. 2026` |
| `.mobile-menu` | closed / `.is-open` | Full-screen slide-over (`translateX`). Items stagger in at 70ms steps. `main` and `footer` become `inert`, Tab is trapped, Esc closes, and it auto-closes at ≥920px |
| `.card` (bento) | default, hover, focus-within | Hover: −3px lift, `zinc-900/80` layer fades in, and a border-gradient blob follows the pointer inside a masked 1px ring (transform-only, rAF-throttled) |
| `.case` | default, hover | Cover zooms `scale(1.045)` over 1.2s. Covers are CSS/SVG illustrations (no image downloads), sized in container-query units (`cqi`) so they scale with the card |
| `.opt` (brief option) | default, hover, checked, focus-visible | The native input stays in the DOM for keyboard and screen-reader use. When checked, the card border turns indigo with a gradient wash and a white check |
| `.faq-item` | closed / `.is-open` | Plus rotates 180° and its vertical bar folds into a minus. The panel is `visibility:hidden` when closed, so its content leaves the tab order |
| Share sheet | closed / open | Bottom sheet on phones, centred dialog at ≥640px. The QR library only loads the first time the sheet opens |

## Brief builder (`#contact`)
| Step | Input | Validation message |
|---|---|---|
| 1 Project | Checkboxes, multi-select (6 types) | "Pick at least one option to continue." |
| 2 Budget | Radios (4 tiers) | "Choose a range to continue — it doesn't need to be exact." |
| 3 Timeline | Radios (4) | "Choose a timeline to continue." |
| 4 Details | Name\*, Email\*, Company, Notes | "Enter your name so we know who to reply to." / "Enter a valid email, like name@company.com." |

**Live summary.** The summary updates on every change and briefly flashes the value that changed:
- **Scope level:** Focused / Considered / Comprehensive / Flagship, from summed type weights
- **Duration:** the largest type plus 40% of the others
- **Starting price:** the level's "starts from" figure
- **Disciplines involved:** which specialisms the project needs

A soft warning appears when the chosen budget or timeline is below what the scope usually needs. All weights and prices live in `TYPES`, `BUDGETS`, `TIMES` and `LEVELS` in the script. Edit them there.

**Submit.** Sending composes a plain-text brief and opens a `mailto:hello@kuro.graphics` draft. A success state follows with "Copy brief" and "Start a new brief".

There is no backend yet. To collect briefs server-side, POST `compose()`'s output to a form service such as Formspree or a Vercel function.

**Shortcut.** "Start a similar project" links on the case studies pre-fill step 1.

## Responsive behaviour
| Breakpoint | Changes |
|---|---|
| < 480 | Hero badge shortens. Brief step labels collapse to numbers, except the current step |
| < 560 | Header shows logo and menu button only |
| ≥ 600 | Brief options and form fields switch to 2 columns |
| ≥ 768 | Bento switches to 3 columns (Brand spans 2, Engineering spans 2 rows, CTA spans the full width). Hero meta shows 4 columns plus the scroll cue |
| ≥ 900 | Work grid switches to 12 columns: featured case full width, then 7 / 5 |
| ≥ 920 | Desktop nav replaces the menu button |
| ≥ 960 | Section heads split title and lead into two columns. About and FAQ become two columns, with a sticky FAQ aside |
| ≥ 1024 | Brief becomes form plus a sticky summary. Footer switches to 4 columns |
| ≥ 1200 | "Taking new projects" status appears in the header |
| ≥ 1280 | Project-type options switch to 3 columns |

## Motion inventory
| Element | Trigger | Animation | Duration |
|---|---|---|---|
| Hero lines | Fonts ready (700ms cap) | Rise from a clipped mask, staggered 90ms | 1.2s |
| Hero badge / lead / CTAs / meta | Same | Fade up 18px, staggered | 1.0–1.1s |
| Hero lens + glow | Pointer (fine pointers only) | Brighter grid lens and soft glow follow the cursor with lerp, transform-only | rAF |
| Aurora | Ambient | Slow drift | 22s alternate |
| `[data-reveal]` | Enters viewport (12%) | Fade up 28px; groups stagger 90ms | 0.9–1s |
| Growth chart, process bars | Reveal | Cover / bar `scaleX` | 1.4–1.8s |
| Marquee | Ambient | `translateX(-50%)` loop, pauses on hover | 46s |

`prefers-reduced-motion` turns off every animation, the pointer effects and the marquee, and shows all content immediately.

## Accessibility
- **Landmarks and labels.** Skip link, one `h1`, labelled sections, `aria-current` on the brief step and an `aria-live` region announcing step changes.
- **Focus and keyboard.** Visible 2px indigo focus ring everywhere. Option cards show the ring via `input:focus-visible + .opt-card`. The FAQ uses buttons with `aria-expanded` and `aria-controls`.
- **Errors.** Error messages are linked to their inputs via `aria-describedby` and `aria-invalid`.
- **Touch targets.** All at least 44×44px on mobile.
- **Automated check.** axe-core (WCAG 2.1 A/AA plus best practices) reports **0 violations** at 1440px and 390px.
- **Without JavaScript.** Content stays visible and the form falls back to a `mailto` POST.

## Content placeholders to confirm
- The case-study copy, industries, years and services for Downing, Club Championship and RaffClub are drafted placeholders. Confirm them with each client.
- Social links (X, LinkedIn, Dribbble) point to the platform home pages. Add real handles. GitHub points to `github.com/riuxin`.
- Budget tiers are in USD. Change the `BUDGETS` labels if you prefer GBP or EUR.
