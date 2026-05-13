# Animal House Website — Full Build Plan

## Design System
- **Palette:** Warm emerald primary (#047857), cream backgrounds (#FFFBF5), warm charcoal text (#1F1F1F), coral accent (#F87171)
- **Typography:** Inter (EN) + Noto Sans Arabic (AR) — both from next/font/google
- **Spacing:** 8px grid system, generous whitespace
- **Corners:** Soft rounded (12px-24px) for cards, full rounded for buttons
- **Shadows:** Subtle layered shadows for depth

## Animations & Effects
- **Framer Motion:** Page transitions, scroll-triggered reveals, staggered entrances
- **Parallax:** Hero background, about section imagery
- **Counter animation:** Stats count up on scroll
- **Hover states:** Card lift, image zoom, button scale
- **Smooth scroll:** Lenis or native CSS smooth-scroll
- **Gallery:** Masonry grid with lightbox

## Pages

### 1. Home (polish existing)
- Hero: Full-viewport with parallax cover image, gradient overlay, animated headline
- Stats: Counter animation on scroll intersection
- Features: Icon cards with hover lift
- About teaser: Two-column with image
- Gallery: Masonry grid, click-to-expand
- CTA banner: Full-width emerald with pattern
- Newsletter signup

### 2. Adopt (/adopt)
- Filter bar: species, age, status
- Animal grid cards with photos
- Each card: name, breed, age, status badge
- Click opens detail modal (or page)
- "Apply to Adopt" CTA

### 3. Donate (/donate)
- Impact hero: "Your donation saves lives"
- Monthly impact calculator
- Donation tiers: 50, 100, 250, 500 SAR
- Methods: Bank transfer, PayPal, crypto placeholder
- Transparency: Where your money goes (pie chart visual)
- Recurring donation toggle

### 4. About (/about)
- Mission/Vision blocks
- Founders story with photos
- Facility gallery (PDF photos)
- Team section
- Partners/sponsors placeholder
- Timeline of milestones

### 5. Contact (/contact)
- Contact form (name, email, subject, message)
- WhatsApp click-to-chat button
- Location info (Riyadh area)
- Social links
- Emergency rescue hotline

### 6. Volunteer (/volunteer)
- Role cards: On-site, Foster, Events, TNR
- Requirements checklist
- Application form
- Testimonials carousel

## Technical
- Add `generateStaticParams` to all dynamic routes
- Image: Next.js Image component with proper sizes
- Forms: client-side validation, submit to static endpoint (Formspree or similar)
- SEO: Open Graph, Twitter cards, structured data
- Performance: Lazy load below-fold, preload critical assets
- Accessibility: Proper aria labels, focus management, RTL fully tested
