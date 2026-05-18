# Animal House Website Development Tracker

**Last updated:** 2026-05-18  
**Working branch:** `main`  
**Goal:** Track client feedback, implementation progress, blockers, judgement calls, and verification for the Animal House site.

---

## Current Plan

1. **Stabilize content and facts**
   - Keep one canonical impact number set across homepage, footer, and related copy.
   - Remove current on-site animal counts.
   - Remove or hide contact/social links that are not ready.
   - Reduce repeated language across sections.

2. **Reframe the homepage narrative**
   - Retitle the former “Our Story” section to **Our Future Plans**.
   - Make the section about the next location, expanded capability, and why support matters now.
   - Replace “Beauty is the hook…” with a stronger systems-of-care statement.
   - Clarify the photo essay/gallery so it feels purposeful rather than repetitive.

3. **Elevate the visual direction**
   - Move toward a luxury photography/editorial feel.
   - Shift from the darker/earthier palette toward white + Saudi-lavender accents.
   - Keep dramatic animal photography as the emotional center.

4. **Sanctuary imagery**
   - Use available facility imagery as a temporary improvement.
   - Add more real site photos once the promised drive link is provided.

5. **Verification + QA tooling**
   - Run lint/build.
   - Search for old/incorrect numbers, inactive contact methods, and non-cat/dog animal references.
   - Add repeatable Playwright smoke/visual QA for English and Arabic pages.
   - Add Lighthouse reporting and image optimization tooling for the photo-heavy next phase.

---

## Feedback Tracker

- **No replicated text across website**
  - Status: **In progress**
  - Action taken: Rewrote homepage hero, future-plans section, vision pillars, gallery description, impact copy, CTA, and contact copy to reduce repeated “rescue/adoption/TNR” phrasing.
  - Remaining: Full duplicate-copy audit across all legacy translation keys/pages would be a second pass.

- **Increase / standardize stats**
  - Status: **Done on homepage + footer**
  - Canonical stats now used:
    - 3,000+ cats rescued through Khadija’s work
    - 2,500+ street cats spayed/neutered across Riyadh
    - 150+ dogs spayed/neutered
    - 270,000+ future births prevented by TNR
    - 250+ dogs rescued
    - 100+ volunteers engaged
    - 1.2B+ media impressions
    - 12+ educational site visits
  - Judgement call: I kept **1.2B+** for media impressions and **12+** for educational site visits because the feedback said those were good and the site already used those numbers.

- **Remove number of cats/dogs currently living on site**
  - Status: **Done**
  - Action taken: Removed the old “300+ cats and 15+ dogs” current-site count from homepage translation copy.

- **Only keep active socials**
  - Status: **Done / hidden for now**
  - Action taken: Removed footer social icon links because they were placeholder `#` links. No socials are shown until active URLs are provided.

- **Add more photos of the site itself in Sanctuary section**
  - Status: **Blocked / partial interim**
  - Action taken: Swapped the sanctuary background/gallery first image to existing `facility.png` so the section is less founder-photo-led.
  - Blocker: Waiting for the drive link with more real site photos.

- **Replace “Beauty is the hook…”**
  - Status: **Done**
  - New copy: “Every rescue deserves a system that protects them.”

- **Make site stunning/luxury photography**
  - Status: **In progress**
  - Action taken: Lightened sections, added white/lavender surfaces, softened stats cards, and kept full-bleed editorial image treatment.
  - Remaining: Best next step is image curation once the drive link arrives.

- **Different uplifting palette: white + Saudi lavender**
  - Status: **In progress**
  - Action taken: Reworked major homepage surfaces from black/cream to white, pale lavender, and deep lavender-purple accents.
  - Judgement call: Kept deep purple for contrast on policy/contact/newsletter sections so white text stays readable and the luxury feel is preserved.

- **Remove leopard or non-cat/dog animals**
  - Status: **Checked / no code references found**
  - Action taken: Searched source for leopard/non-cat-dog references; no leopard content found in text/code.
  - Remaining: Visual asset review should continue when new images arrive.

- **Photo essay unclear/repetitive**
  - Status: **Done first pass**
  - Action taken: Renamed to “Sanctuary portraits” and rewrote gallery headline/description to clarify the purpose.

- **Ensure all numbers/stats stay consistent**
  - Status: **Done first pass**
  - Action taken: Homepage stats, impact copy, and footer stats now share the new canonical set.
  - Remaining: Legacy donate/about-page social proof still needs a deeper product decision before rewriting every page-specific stat.

- **Front page “now the story” becomes “Our future plans”**
  - Status: **Done**
  - Action taken: Navigation and section label now say Future Plans / Our Future Plans. Section copy now focuses on next-location ambition and support.

- **Remove phone number, WhatsApp, location; only leave email**
  - Status: **Done on homepage/footer**
  - Action taken: Removed homepage contact location, phone, and WhatsApp. Footer contact now only shows `animalhouseksa@gmail.com`.
  - Remaining: Legacy contactPage keys still contain old strings in translation files, but there is no separate contact page route currently in `src/app/[locale]`; keep an eye on this if pages are reintroduced.

---

## Blockers

1. **Sanctuary photo drive link needed**
   - Impact: Cannot complete the luxury photography/site-photo direction without the client-provided site imagery.
   - Current workaround: Existing `facility.png` used as an interim site-focused image.

2. **Active social URLs needed**
   - Impact: Social links remain hidden.
   - Needed: Confirm active Instagram/Facebook/TikTok/X/WhatsApp URLs, if any.

3. **Donation/contact details need confirmation**
   - Impact: Homepage/footer now use `animalhouseksa@gmail.com`; old placeholder donation/contact details remain in translation data for non-rendered/legacy sections.
   - Needed: Confirm final public email and whether donation pages will be enabled.

---

## Judgement Calls Made

- Used `animalhouseksa@gmail.com` as the only visible email because the user explicitly asked to remove phone/WhatsApp/location and memory identifies that email as the Animal House account.
- Hid all social icons rather than leaving placeholders, because inactive socials should not lead nowhere.
- Kept 1.2B+ media impressions and 12+ educational visits because feedback said those were good but did not provide replacement values.
- Used existing `facility.png` for the sanctuary/site-photo direction until the drive link arrives.
- Kept some deep lavender/dark sections for readability and premium contrast instead of making the whole page pure white.

---

## Verification Log

- **Passed:** `npm run lint`
- **Passed:** `npm run build`
- **Passed:** `npm run qa` — runs lint, production build, and Playwright EN/AR checks on desktop + mobile.
- **Passed:** `npm run test:e2e` — 8 Playwright tests passed: content QA plus full-page screenshot capture for `/en` and `/ar` on desktop and mobile.
- **Passed:** `npm run qa:lighthouse` — generated Lighthouse HTML/JSON reports under `qa/lighthouse/`.
  - `/en`: performance 81, accessibility 98, best-practices 100, SEO 100.
  - `/ar`: performance 81, accessibility 98, best-practices 100, SEO 100.
- **Passed:** `npm run images:optimize -- public/images /tmp/animalhouse-optimized` — verified Sharp workflow converts existing source images to WebP; no repo image artifacts were committed/generated by this test run.
- **Passed:** post-build search for rendered stale contact/social references. Notes: only expected matches remain for canonical stats and the top-logo `href=\"#\"` scroll-to-top link.
- **Build warning:** Next.js reports the `middleware` file convention is deprecated in favor of `proxy`; unrelated to this content/design pass.
- **QA warning / judgement call:** Playwright visual snapshot runs on the dev server surface a React hydration warning involving automation-added `caret-color: transparent` inline styles on form controls. Production build and Lighthouse pass; leaving this as non-blocking but worth rechecking if it appears outside automated browser/dev-server runs.

---

## QA Tooling Added

- `@playwright/test` with `playwright.config.ts`.
- Tests:
  - `tests/homepage.spec.ts` verifies canonical stats, visible email-only contact, no stale phone/WhatsApp/social placeholder links, no old tagline, and no current-site animal counts.
  - `tests/visual-snapshots.spec.ts` captures desktop/mobile screenshots for English and Arabic homepages.
- `lighthouse@12` via `scripts/run-lighthouse.mjs`, pinned to the local Playwright Chrome path so it works without sudo/system Chrome.
- `sharp` via `scripts/optimize-images.mjs` for future client photo optimization.
- QA artifacts are ignored in `.gitignore` under `/qa/playwright-report/`, `/qa/playwright-results/`, `/qa/screenshots/`, and `/qa/lighthouse/`.
