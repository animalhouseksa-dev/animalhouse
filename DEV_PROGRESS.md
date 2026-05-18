# Animal House — Dev Progress Log

**Purpose:** Running state tracker so work can survive session drops. Update this file after every meaningful change.

---

## Current Status (as of last update)

| Item | Status |
|------|--------|
| Client feedback tracker | **ACTIVE** (2026-05-18) — Created `SITE_DEVELOPMENT_TRACKER.md` with feedback checklist, plan, blockers, judgement calls, and verification log. |
| Stats/content consistency pass | **DONE FIRST PASS** — Homepage and footer now use canonical client-provided stats; current on-site cat/dog counts removed; “Beauty is the hook…” replaced. |
| Contact/social cleanup | **DONE FIRST PASS** — Homepage/footer now show email only (`animalhouseksa@gmail.com`); phone, WhatsApp, location, and placeholder socials hidden/removed from rendered UI. |
| Future-plans reframing | **DONE FIRST PASS** — Former story nav/section is now Future Plans / Our Future Plans and focuses on next-location ambition and support. |
| Lavender/luxury direction | **IN PROGRESS** — Major homepage surfaces shifted toward white + lavender/deep-purple contrast; image curation awaits client drive link. |
| Sanctuary images | **BLOCKED/PARTIAL** — Existing `facility.png` used as interim sanctuary image; waiting for client drive link for more site photos. |
| Gallery founders block removal | **DONE** — `founders.jpg` moved to first slot, standalone founders block removed from gallery, `galleryClasses` trimmed to 4 entries, both `en.json` and `ar.json` synced. Committed `07baed9`, pushed, building on Vercel. |
| PDF content audit | **INCOMPLETE** — Truncated mid-audit. Need to verify all PDF specifics are reflected on homepage (dog spay count, media impressions 1.2B+, future-location KPIs, gallery captions matching PDF labels). |
| Translation parity (en ↔ ar) | **TODO** — Audit `ar.json` against `en.json` for missing keys or outdated copy after homepage redesign. |
| QA tooling | **DONE FIRST PASS** (2026-05-18) — Added Playwright EN/AR desktop+mobile smoke/visual tests, Lighthouse reports, and Sharp image optimization script. `npm run qa`, `npm run qa:lighthouse`, and a temp-output image optimization verification passed. |
| Lint/build | **CLEAN** (2026-05-18) — `npm run lint`, `npm run build`, and `npm run qa` passed after client-feedback edits. Only warning: Next.js deprecated `middleware` convention, unrelated to this pass. |
| Dead components removed | **DONE** (2026-05-15) — Deleted `AboutSection`, `FeaturesSection`, `StatsSection`, `GallerySection`, `HeroSection`, `Counter` (all from the pre-luxury emerald/cream design, none imported). |
| Animation stack consolidation | **DONE** (2026-05-15) — Removed `framer-motion`. All animation is GSAP now: hero intro is a GSAP timeline, scroll reveals via `AnimatedSection`/`StaggerContainer` use `ScrollTrigger` against `#smooth-content`, hero + sanctuary parallax via scrubbed `ScrollTrigger`. |
| Image optimization | **DONE** (2026-05-15) — Removed `images.unoptimized: true` from `next.config.ts`. Vercel's image loader is back on. |

## Last Completed Commit
- `07baed9` — gallery: move founders.jpg to first slot, remove standalone founders block, sync translations and grid classes

## Blockers / Questions
- Client sanctuary/site photo drive link still needed for final luxury photography pass.
- Active social URLs still needed before socials should be shown.
- Non-blocking QA warning: Playwright dev-server visual snapshot runs surface a React hydration warning around automation-added `caret-color: transparent` on form controls; production build and Lighthouse pass.

## Next Up (priority order)
1. Review Playwright screenshots in `qa/screenshots/` locally when needed; artifacts are gitignored.
2. Add client-provided sanctuary/site images, optimize with `npm run images:optimize`, and swap curated images into the Sanctuary section.
3. Resolve or de-prioritize the Next.js `middleware` → `proxy` deprecation warning.
4. Full Arabic translation parity check.

---

## Session History
- **May 13** — Initial site build, PDF extraction, i18n setup, deployment to Vercel.
- **May 13–14** — Homepage redesign (editorial/parallax), gallery/founders block edit, session truncated mid-audit.
- **May 14** — Gallery founders block fix completed and deployed. Dev progress log created.
