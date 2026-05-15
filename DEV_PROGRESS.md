# Animal House — Dev Progress Log

**Purpose:** Running state tracker so work can survive session drops. Update this file after every meaningful change.

---

## Current Status (as of last update)

| Item | Status |
|------|--------|
| Gallery founders block removal | **DONE** — `founders.jpg` moved to first slot, standalone founders block removed from gallery, `galleryClasses` trimmed to 4 entries, both `en.json` and `ar.json` synced. Committed `07baed9`, pushed, building on Vercel. |
| PDF content audit | **INCOMPLETE** — Truncated mid-audit. Need to verify all PDF specifics are reflected on homepage (dog spay count, media impressions 1.2B+, future-location KPIs, gallery captions matching PDF labels). |
| Translation parity (en ↔ ar) | **TODO** — Audit `ar.json` against `en.json` for missing keys or outdated copy after homepage redesign. |
| Lint | **CLEAN** (2026-05-15) — All `@typescript-eslint/no-explicit-any` errors fixed in `HomePageClient`, `[locale]/layout.tsx`, `ScrollSmootherProvider`, `i18n/request.ts`. |
| Dead components removed | **DONE** (2026-05-15) — Deleted `AboutSection`, `FeaturesSection`, `StatsSection`, `GallerySection`, `HeroSection`, `Counter` (all from the pre-luxury emerald/cream design, none imported). |
| Animation stack consolidation | **DONE** (2026-05-15) — Removed `framer-motion`. All animation is GSAP now: hero intro is a GSAP timeline, scroll reveals via `AnimatedSection`/`StaggerContainer` use `ScrollTrigger` against `#smooth-content`, hero + sanctuary parallax via scrubbed `ScrollTrigger`. |
| Image optimization | **DONE** (2026-05-15) — Removed `images.unoptimized: true` from `next.config.ts`. Vercel's image loader is back on. |

## Last Completed Commit
- `07baed9` — gallery: move founders.jpg to first slot, remove standalone founders block, sync translations and grid classes

## Blockers / Questions
- None

## Next Up (priority order)
1. Resume PDF content audit — compare extracted PDF text (`tmp/Animal-House_v1.txt`) against current homepage copy.
2. Fix pre-existing lint errors across legacy page components.
3. Decide whether to delete unused `AboutSection.tsx`.
4. Full Arabic translation parity check.

---

## Session History
- **May 13** — Initial site build, PDF extraction, i18n setup, deployment to Vercel.
- **May 13–14** — Homepage redesign (editorial/parallax), gallery/founders block edit, session truncated mid-audit.
- **May 14** — Gallery founders block fix completed and deployed. Dev progress log created.
