# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The line above pulls in `AGENTS.md`, which warns that this repo uses **Next.js 16.2.6 with React 19.2** — APIs and conventions may differ from your training data. Consult `node_modules/next/dist/docs/` before writing route/layout/middleware code.

## Commands

```bash
npm run dev      # next dev (http://localhost:3000, redirects / → /en)
npm run build    # next build — also what Vercel runs
npm run start    # serve the production build
npm run lint     # eslint (flat config in eslint.config.mjs)
```

Node `>=20` is required (see `engines` in `package.json`). There is no test runner configured.

`npm run lint` is clean as of 2026-05-15. Keep it that way.

## Architecture

**Stack:** Next.js App Router (16.2) + React 19 + Tailwind 4 + `next-intl` 4 for i18n + **GSAP** for all animation (intro timelines, scroll reveals, parallax, and `ScrollSmoother`). `framer-motion` was removed — do not reintroduce it.

**i18n is the spine of the routing model.** Everything user-facing lives under `src/app/[locale]/`. Locales are `en` and `ar`, declared in `src/i18n/routing.ts` with `localePrefix: 'always'` — so every URL is `/en/...` or `/ar/...`. The pieces wire together as:

- `src/middleware.ts` — runs `next-intl/middleware` on `/` and `/(ar|en)/:path*` to inject the locale segment.
- `next.config.ts` — wraps the config with `createNextIntlPlugin('./src/i18n/request.ts')` and adds a non-permanent `/ → /en` redirect.
- `src/i18n/request.ts` — server-side loader; reads the locale from the route segment and imports `src/messages/{locale}.json` as the message bundle.
- `src/app/[locale]/layout.tsx` — sets `<html lang dir>` (RTL for `ar`), mounts `NextIntlClientProvider`, and wraps children in `GlobalNav` + `ScrollSmootherProvider` + `Footer`.

When adding a route, add it under `src/app/[locale]/<route>/page.tsx`. When adding user-visible strings, add **parallel keys to both `en.json` and `ar.json`** — DEV_PROGRESS calls out translation parity drift as a recurring issue.

**Navigation helpers:** import `Link`, `redirect`, `usePathname`, `useRouter` from `@/i18n/routing` (not directly from `next/link` / `next/navigation`) so the locale prefix is preserved automatically.

**Client vs. server split:** Page entries (`page.tsx`) are server components that delegate animation-heavy UI to `*Client.tsx` siblings (e.g. `HomePageClient.tsx`). Keep i18n message loading on the server and pass only what's needed across the boundary.

**Animation provider:** `ScrollSmootherProvider` wraps content in the locale layout and owns GSAP `ScrollSmoother` (initialized in a `useLayoutEffect` against `#smooth-wrapper`/`#smooth-content`).

Rules for scroll-driven animation in this codebase (learned the hard way):

1. **Do not set `scroller:` on ScrollTriggers.** When ScrollSmoother is active, ScrollTriggers auto-pick it up. Explicitly pointing them at `#smooth-content` makes them listen for scroll events on a div that doesn't scroll (ScrollSmoother scrolls `#smooth-wrapper` and *transforms* `#smooth-content`), and triggers never fire.
2. **Use `useEffect`, not `useLayoutEffect`, for ScrollTrigger setup in children.** `ScrollSmoother` is created in the provider's `useLayoutEffect`; children must run after that. `useEffect` (which fires after the entire `useLayoutEffect` phase) is the correct slot. Components: `AnimatedSection`, `StaggerContainer`, the hero effects in `HomePageClient`.
3. **Don't pass a scope element to `gsap.context(fn, scope)`** unless every selector you use is inside that subtree. The `scope` arg scopes *all* selectors in the callback, so `scroller: "#smooth-content"` would silently resolve to null. Use the no-arg form `gsap.context(fn)` — you still get `ctx.revert()` cleanup.
4. **Prefer `gsap.fromTo` over `gsap.from` + inline transform.** `gsap.from` reading a pre-set inline `transform: translateY(...)` has corner cases that throw `Cannot read properties of undefined (reading '_gsap')`. Explicit `fromTo({ y: N }, { y: 0 })` is deterministic. Keep initial `opacity: 0` inline if you want zero flash before the trigger fires.

PLAN.md is the source of truth for visual/animation intent.

**Path alias:** `@/*` → `src/*` (see `tsconfig.json`).

## Project Context

- `PLAN.md` — design system (palette, typography, spacing) and the page-by-page build plan. Treat as the design brief.
- `DEV_PROGRESS.md` — running state log; update it after meaningful changes so work survives session drops. Check it first to see current status, blockers, and the next-up queue.
- `AGENTS.md` — Next.js version warning (re-included above).
- Deployment is Vercel (`vercel.json`); the `next build` script is what runs there.
