"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  Globe2,
  Heart,
  Home,
  Mail,
  MapPin,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Send,
} from "lucide-react";

// ── Gallery images (12) — used ONLY in the editorial gallery section ──
const galleryImageSrcs = [
  "/images/shelter/gallery-tuxedo-cat.webp",
  "/images/shelter/gallery-dog-walk.webp",
  "/images/shelter/gallery-fluffy-cat.webp",
  "/images/shelter/gallery-cat-tree.webp",
  "/images/shelter/gallery-lounging-cat.webp",
  "/images/shelter/gallery-white-cat.webp",
  "/images/shelter/gallery-cat-perch.webp",
  "/images/shelter/gallery-shelter-dog.webp",
  "/images/shelter/gallery-gate-cat.webp",
  "/images/shelter/gallery-portrait-cat.webp",
  "/images/shelter/thumb-1naVdjWmGTTSWlnIlB5DGF6V5rQUhcQZT.webp",
  "/images/shelter/thumb-1DtmbLOIOpN2SuS8HmKdyTWQK_XgtUiCb.webp",
];

export default function HomePageClient() {
  const hp = useTranslations("homePage");
  const about = useTranslations("about");
  const policies = useTranslations("policies");
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const sanctuaryRef = useRef<HTMLDivElement>(null);

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroDarkOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroBadgeRef = useRef<HTMLParagraphElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const heroStatsRef = useRef<(HTMLDivElement | null)[]>([]); // staggered stats strip
  const sanctuaryImgRef = useRef<HTMLDivElement>(null);

  // ── Stats ──
  const statsItems = hp.raw("stats.items") as Array<{ value: string; label: string; detail: string }>;

  // ── Story notes ──
  const storyNotes = hp.raw("story.notes") as Array<{ eyebrow: string; title: string; text?: string }>;
  const storyIntro = hp.raw("story") as { intro1?: string; intro2?: string };
  const storyNoteIcons = [MapPin, ShieldCheck, Users];

  // ── Vision pillars ──
  const visionPillars = hp.raw("vision.pillars") as Array<{ title: string; proof: string; text: string }>;

  // ── Facility list ──
  const facility = hp.raw("sanctuary.facility") as string[];

  // ── Facility images — unique photos for each facility feature ──
  const facilityImages = [
    "/images/shelter/shelter-intake.webp",
    "/images/shelter/shelter-adoption.webp",
    "/images/shelter/shelter-sanctuary.webp",
    "/images/shelter/gallery-white-cat.webp",
    "/images/shelter/gallery-lounging-cat.webp",
    "/images/shelter/gallery-tuxedo-cat.webp",
    "/images/shelter/gallery-shelter-dog.webp",
  ];

  // ── Standard of care images — unique set, no overlap with facility or gallery ──
  const careImages = [
    "/images/shelter/gallery-dog-walk.webp",
    "/images/shelter/gallery-fluffy-cat.webp",
    "/images/shelter/gallery-cat-tree.webp",
    "/images/shelter/gallery-gate-cat.webp",
    "/images/shelter/gallery-cat-perch.webp",
    "/images/shelter/sanctuary-side-2.webp",
    "/images/shelter/sanctuary-outdoor-1.webp",
  ];

  // ── Impact pillars ──
  const impactPillarsRaw = hp.raw("impact.pillars") as Array<{ label: string; copy: string }>;
  const impactIconMap = [Stethoscope, PawPrint, Sparkles, Globe2, Heart];

  // ── Impact grid ──
  const impactGrid = hp.raw("impact.grid") as string[];

  // ── Gallery images ──
  const galleryImages = hp.raw("gallery.images") as Array<{ alt: string; className?: string }>;
  const galleryClasses = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "md:col-span-2",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  // ── Hero intro + parallax ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic hero reveal — staggered, slow, luxurious.
      // Initial state is set inline on each element so first paint shows hidden.
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(heroBadgeRef.current, { opacity: 1, y: 0, duration: 1.0 }, 0.1)
        .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 1.4 }, 0.2)
        .to(heroRightRef.current, { opacity: 1, y: 0, duration: 1.2 }, 0.55);

      // Stats strip — staggered left-to-right reveal after subtitle
      heroStatsRef.current.forEach((el, i) => {
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, 0.9 + i * 0.1);
      });

      // Hero scroll-off: scale up, blur, fade-to-dark while content drifts up faster.
      // Single scrubbed timeline so all properties move in lockstep with scroll.
      const heroScroll = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6, // slight smoothing — feels premium
        },
        defaults: { ease: "none" },
      });

      heroScroll
        .fromTo(
          heroBgRef.current,
          { scale: 1, filter: "blur(0px)", yPercent: 0, transformOrigin: "50% 15%" },
          { scale: 1.15, filter: "blur(12px)", yPercent: 8, transformOrigin: "50% 15%" },
          0,
        )
        .fromTo(heroDarkOverlayRef.current, { opacity: 0 }, { opacity: 0.7 }, 0)
        .fromTo(heroContentRef.current, { yPercent: 0, opacity: 1 }, { yPercent: -25, opacity: 0 }, 0);

      // Sanctuary parallax
      gsap.to(sanctuaryImgRef.current, {
        y: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: sanctuaryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#fbf8ff] text-[#19131f]">
      {/* Cinematic hero */}
      <section ref={heroRef} className="relative min-h-screen isolate overflow-hidden">
        <div
          ref={heroBgRef}
          className="absolute inset-0 -z-10 will-change-[filter,transform]"
        >
          <Image src="/images/shelter/shelter-sunset.webp" alt="Golden sunrise over the sanctuary's misty wetlands at dawn" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.55)_48%,#0d0d0b_100%)] opacity-90" />
        </div>

        {/* Sharp dark overlay that fades in as the hero scrolls off */}
        <div
          ref={heroDarkOverlayRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-[5] bg-black opacity-0 will-change-[opacity]"
        />

        <div ref={heroContentRef} className="relative z-10 flex min-h-screen flex-col justify-between px-5 pb-10 pt-32 sm:px-8 lg:px-12 lg:pb-16 lg:pt-40 will-change-[transform,opacity]">
          {/* Title row */}
          <div className="mx-auto w-full max-w-7xl">
            <p
              ref={heroBadgeRef}
              style={{ opacity: 0, transform: "translateY(24px)" }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-[#f2e9ff]/80"
            >
              {hp("hero.badge")}
            </p>
            <h1
              ref={heroTitleRef}
              style={{ opacity: 0, transform: "translateY(56px)" }}
              className="max-w-5xl text-balance font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[8rem]"
            >
              {hp("hero.title")}
            </h1>
            <p
              ref={heroRightRef}
              style={{ opacity: 0, transform: "translateY(36px)" }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl"
            >
              {hp("hero.subtitle")}
            </p>
          </div>

          {/* Stats strip inside hero — bold, above the fold */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-t border-white/10 pt-6 md:gap-x-12">
              {statsItems
                .slice(0, 5)
                .map((stat, i) => (
                  <div
                    key={stat.label}
                    ref={(el) => { heroStatsRef.current[i] = el }}
                    style={{ opacity: 0, transform: "translateY(24px)" }}
                    className="flex flex-col"
                  >
                    <span className="text-3xl font-bold tracking-[-0.04em] text-white md:text-5xl">{stat.value}</span>
                    <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50 md:text-[0.65rem]">{stat.label}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* CTA row */}
          <div className="mx-auto w-full max-w-7xl">
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em]">
              <a href="#story" className="rounded-full border border-white/20 px-5 py-3 text-white/75 backdrop-blur transition hover:border-white/60 hover:text-white">
                {hp("hero.ctaStory")}
              </a>
              <a href="#impact" className="rounded-full bg-[#f2e9ff] px-5 py-3 text-[#241234] transition hover:bg-white">
                {hp("hero.ctaProof")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial sanctuary gallery — pro photography layout */}
      <section id="sanctuary" ref={sanctuaryRef} className="bg-[#fbf8ff] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b5fc7]">{hp("sanctuary.label")}</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                {hp("sanctuary.title")}
              </h2>
            </div>
          </AnimatedSection>

          {/* Photography grid — 6 unique sanctuary images */}
          <div ref={sanctuaryImgRef} className="grid auto-rows-[15rem] gap-4 md:grid-cols-4">
            {/* Large hero — sanctuary wide shot (2x2) */}
            <AnimatedSection className="group relative overflow-hidden rounded-[2rem] bg-black md:col-span-2 md:row-span-2">
              <Image src="/images/shelter/sanctuary-wide-1.webp" alt="Spacious sanctuary interior with rescued animals in warm golden sunlight" fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </AnimatedSection>

            {/* Right top — outdoor sanctuary view */}
            <AnimatedSection className="group relative overflow-hidden rounded-[2rem] bg-black md:col-span-2">
              <Image src="/images/shelter/sanctuary-outdoor-1.webp" alt="Outdoor sanctuary view with rescued animals" fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </AnimatedSection>

            {/* Side images */}
            <AnimatedSection className="group relative overflow-hidden rounded-[2rem] bg-black">
              <Image src="/images/shelter/sanctuary-side-2.webp" alt="Cat portrait with striking green eyes" fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </AnimatedSection>

            <AnimatedSection className="group relative overflow-hidden rounded-[2rem] bg-black">
              <Image src="/images/shelter/sanctuary-side-3.webp" alt="Cat relaxing near a shelter gate in soft natural light" fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </AnimatedSection>

            <AnimatedSection className="group relative overflow-hidden rounded-[2rem] bg-black">
              <Image src="/images/shelter/shelter-sanctuary.webp" alt="Spacious sanctuary wetlands and green spaces" fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </AnimatedSection>

            <AnimatedSection className="group relative overflow-hidden rounded-[2rem] bg-black">
              <Image src="/images/shelter/gallery-shelter-dog.webp" alt="Shelter dog in a spacious enclosure" fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </AnimatedSection>
          </div>

          {/* Facility features — photo + text cards */}
          <AnimatedSection className="mt-12">
            <h3 className="mb-6 text-2xl font-semibold tracking-[-0.04em] text-[#2d2139]/80">Our Facilities</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {facility.map((item, idx) => (
                <div key={item} className="group overflow-hidden rounded-2xl border border-[#e7dbf6] bg-white shadow-[0_12px_40px_rgba(91,53,133,0.08)]">
                  <div className="relative h-36">
                    <Image src={facilityImages[idx]} alt={item} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <div className="p-4 text-sm leading-6 text-[#2d2139]/70">
                    <div className="flex gap-2 items-start">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8b5fc7]" />
                      <span>{item}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Standard of Care — every bullet with matching photo */}
          <AnimatedSection className="mt-16">
            <div className="mb-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.32em] text-[#8b5fc7]">Standard of Care</p>
              <h3 className="text-balance font-serif text-3xl font-semibold leading-[1] tracking-[-0.04em] md:text-4xl">
                How we care for every life
              </h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {facility.map((item, idx) => (
                <article key={`care-${idx}`} className="group overflow-hidden rounded-[1.5rem] border border-[#e7dbf6] bg-white">
                  <div className="relative h-44">
                    <Image src={careImages[idx]} alt={item} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-5">
                    <h4 className="mb-2 text-lg font-semibold tracking-[-0.03em] text-[#2d2139]/85">{item}</h4>
                    <p className="text-sm leading-6 text-[#2d2139]/55">Every area is designed for comfort, safety, and the wellbeing of our residents.</p>
                  </div>
                </article>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="bg-[#fbf8ff] px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b5fc7]">{hp("story.sectionLabel")}</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                {hp("story.title")}
              </h2>
            </div>
            <div className="space-y-7 text-xl leading-9 text-[#2d2139]/70">
              <p>{storyIntro.intro1}</p>
              <p>{storyIntro.intro2}</p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-5 md:grid-cols-3">
            {storyNotes.map((note, i) => {
              const Icon = storyNoteIcons[i];
              return (
                <StaggerItem key={note.title}>
                  <article className="h-full rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(91,53,133,0.12)] ring-1 ring-[#e7dbf6]">
                    <Icon className="mb-8 h-7 w-7 text-[#8b5fc7]" />
                    <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#2d2139]/35">{note.eyebrow}</p>
                    <h3 className="mb-4 text-2xl font-semibold tracking-[-0.04em]">{note.title}</h3>
                    {note.text !== undefined ? (
                      <p className="leading-7 text-[#2d2139]/62">{note.text}</p>
                    ) : null}
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Policies — light theme (lilac & white) */}
      <section id="policies" className="bg-[#fbf8ff] px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-[#8b5fc7]/60">{hp("policies.sectionLabel")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("policies.homeTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { title: policies("intakeTitle"), image: "/images/shelter/shelter-intake.webp", keys: ["intake1", "intake2", "intake3", "intake4"] as const },
              { title: policies("adoptionTitle"), image: "/images/shelter/shelter-adoption.webp", keys: ["adoption1", "adoption2", "adoption3"] as const },
            ].map((card) => (
              <AnimatedSection key={card.title} className="group overflow-hidden rounded-[2.25rem] border border-[#d8c7ef] bg-white shadow-[0_24px_80px_rgba(91,53,133,0.10)]">
                <div className="relative h-80 overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 right-6 text-3xl font-semibold tracking-[-0.05em] text-white">{card.title}</h3>
                </div>
                <div className="space-y-4 p-6 md:p-8">
                  {card.keys.map((key) => (
                    <div key={key} className="flex gap-4 border-t border-[#e7dbf6] pt-4 text-[#2d2139]/68 first:border-t-0 first:pt-0">
                      <Heart className="mt-1 h-4 w-4 shrink-0 text-[#8b5fc7]" />
                      <p className="leading-7">{policies(key)}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial gallery */}
      <section className="bg-white px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b5fc7]">{hp("gallery.sectionLabel")}</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                {hp("gallery.homeTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-lg leading-8 text-[#2d2139]/58">{hp("gallery.descriptiveText")}</p>
          </AnimatedSection>
          <div className="grid auto-rows-[17rem] gap-4 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <AnimatedSection key={image.alt} delay={index * 0.05} className={`group relative overflow-hidden rounded-[2rem] bg-black ${galleryClasses[index] || ''}`}>
                <Image src={galleryImageSrcs[index]} alt={image.alt} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Impact pillars */}
      <section id="impact" className="bg-[#fbf8ff] px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mx-auto mb-16 max-w-4xl text-center">
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("impact.title")}
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {impactPillarsRaw.map((pillar, i) => {
              const Icon = impactIconMap[i];
              return (
                <StaggerItem key={pillar.label}>
                  <article className="h-full rounded-[2rem] border border-[#e7dbf6] bg-white p-7 shadow-[0_12px_40px_rgba(91,53,133,0.06)]">
                    <Icon className="mb-10 h-7 w-7 text-[#8b5fc7]" />
                    <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-[-0.04em]">{pillar.label}</h3>
                    <p className="leading-7 text-[#2d2139]/58">{pillar.copy}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="mt-16 rounded-[2.5rem] border border-[#d8c7ef] bg-white p-8 md:p-12 shadow-[0_24px_80px_rgba(91,53,133,0.08)]">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Home className="mb-8 h-8 w-8 text-[#8b5fc7]/60" />
                <h3 className="text-4xl font-semibold leading-[1] tracking-[-0.06em] text-[#2d2139] md:text-6xl">
                  {hp("impact.leadText")}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {impactGrid.map((item) => (
                  <div key={item} className="rounded-2xl border border-[#e7dbf6] bg-[#fbf8ff]/60 p-4 text-sm leading-6 text-[#2d2139]/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact section — light theme (lilac & white) */}
      <section id="contact" className="bg-white px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-[#8b5fc7]/60">{hp("contact.sectionLabel")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("contact.title")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="flex items-start gap-4 rounded-2xl border border-[#e7dbf6] bg-[#fbf8ff]/60 p-6">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5fc7]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#8b5fc7]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2139] mb-1">{hp("contact.emailLabel")}</h3>
                    <p className="text-sm text-[#2d2139]/50">{hp("contact.emailValue")}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Banner — light theme (lilac & white) */}
      <section className="relative bg-[#fbf8ff] text-[#19131f] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/shelter/shelter-hero.webp')] bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-[#241234]">
              {hp("cta.title")}
            </h2>
            <p className="text-lg md:text-xl text-[#2d2139]/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              {hp("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-[#8b5fc7] text-white text-lg font-semibold hover:bg-[#7a4fb5] transition-colors shadow-lg"
              >
                {hp("cta.ctaPrimary")}
              </a>
              <a
                href="#impact"
                className="inline-block px-8 py-4 rounded-full border-2 border-[#8b5fc7] text-[#8b5fc7] text-lg font-semibold hover:bg-[#8b5fc7]/10 transition-colors"
              >
                {hp("cta.ctaSecondary")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter signup — light theme (lilac & white) */}
      <section className="bg-[#fbf8ff] border-t border-[#d8c7ef] px-5 py-20 text-[#19131f] sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#8b5fc7]/10 text-[#8b5fc7] mb-6">
              <Send className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#241234] mb-4">
              {hp("newsletter.homeTitle")}
            </h2>
            <p className="text-lg text-[#2d2139]/50 mb-8 max-w-xl mx-auto leading-relaxed">
              {hp("newsletter.homeSubtitle")}
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email) {
                  setNewsletterStatus("error");
                  return;
                }
                setNewsletterStatus("sending");
                try {
                  const res = await fetch("/api/inquiry", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "newsletter", email }),
                  });
                  if (res.ok) {
                    setNewsletterStatus("success");
                    setEmail("");
                  } else {
                    setNewsletterStatus("error");
                  }
                } catch {
                  setNewsletterStatus("error");
                }
              }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (newsletterStatus === "error") setNewsletterStatus("idle");
                }}
                placeholder={hp("newsletter.placeholder")}
                className="flex-1 max-w-md px-5 py-3.5 rounded-xl border border-[#d8c7ef] bg-white text-[#2d2139] placeholder:text-[#2d2139]/30 focus:outline-none focus:ring-2 focus:ring-[#8b5fc7]/20 focus:border-[#8b5fc7] text-sm"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "sending"}
                className="px-7 py-3.5 rounded-xl bg-[#8b5fc7] text-white text-sm font-semibold hover:bg-[#7a4fb5] transition-colors shadow-md disabled:opacity-60"
              >
                {newsletterStatus === "sending" ? hp("newsletter.homeSending") : hp("newsletter.homeButton")}
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-4 text-sm text-[#8b5fc7] font-medium">
                {hp("newsletter.homeSuccess")}
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="mt-4 text-sm text-red-500 font-medium">
                {hp("newsletter.homeError")}
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Vision pillars — moved to end */}
      <section id="vision" className="bg-white px-5 py-24 text-[#19131f] sm:px-8 lg:px-12 lg:py-32 border-t border-[#d8c7ef]">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b5fc7]">{hp("vision.sectionLabel")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("vision.title")}
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {visionPillars.map((pillar, index) => (
              <StaggerItem key={pillar.title}>
                <article className="flex h-full flex-col rounded-[2rem] border border-[#e7dbf6] bg-[#fbf8ff] p-6">
                  <div className="mb-10 text-sm font-semibold text-[#2d2139]/35">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-[-0.04em]">{pillar.title}</h3>
                  <p className="mb-5 leading-7 text-[#2d2139]/58">{pillar.text}</p>
                  <p className="mt-auto border-t border-[#d8c7ef] pt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#8b5fc7]">{pillar.proof}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}

function ContactForm() {
  const formT = useTranslations("homePage.contact.form");
  const contactSuccess = useTranslations("homePage.contact");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[#e7dbf6] bg-[#fbf8ff]/60 p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#8b5fc7]/10 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#8b5fc7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 018 0z" /></svg>
        </div>
        <h3 className="text-xl font-semibold text-[#2d2139] mb-2">{contactSuccess("success.title")}</h3>
        <p className="text-[#2d2139]/50">{contactSuccess("success.desc")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#2d2139]/40 mb-2">{formT("nameLabel")}</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={formT("namePlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-[#e7dbf6] bg-white text-[#2d2139] placeholder:text-[#2d2139]/25 focus:outline-none focus:ring-2 focus:ring-[#8b5fc7]/15 focus:border-[#8b5fc7] transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#2d2139]/40 mb-2">{formT("emailLabel")}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={formT("emailPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-[#e7dbf6] bg-white text-[#2d2139] placeholder:text-[#2d2139]/25 focus:outline-none focus:ring-2 focus:ring-[#8b5fc7]/15 focus:border-[#8b5fc7] transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#2d2139]/40 mb-2">{formT("subjectLabel")}</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder={formT("subjectPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-[#e7dbf6] bg-white text-[#2d2139] placeholder:text-[#2d2139]/25 focus:outline-none focus:ring-2 focus:ring-[#8b5fc7]/15 focus:border-[#8b5fc7] transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#2d2139]/40 mb-2">{formT("messageLabel")}</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={formT("messagePlaceholder")}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-[#e7dbf6] bg-white text-[#2d2139] placeholder:text-[#2d2139]/25 focus:outline-none focus:ring-2 focus:ring-[#8b5fc7]/15 focus:border-[#8b5fc7] transition-all resize-none text-sm"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500">{formT("error")}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 rounded-xl bg-[#8b5fc7] text-white font-semibold hover:bg-[#7a4fb5] transition-colors disabled:opacity-60 text-sm"
      >
        {status === "sending" ? formT("sending") : formT("submit")}
      </button>
    </form>
  );
}
