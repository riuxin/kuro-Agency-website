# KURO website — working notes for Claude

## Git workflow (owner's standing instruction)
- Always push finished work to `main` — that is what the live site deploys from.
- Before replacing the site on `main` with a new version, first save the current `main` to a backup branch (`backup/<version>-site`, e.g. `backup/v3-site`) and push it, so the previous site can be restored.

## Project
- The site is a single self-contained `index.html` (inline CSS + JS, no build step).
- Design tokens, components and motion rules are documented in `DESIGN.md`.
- Live: https://kuro-agency-website.vercel.app/
