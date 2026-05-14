"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
  MapPin,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Send,
} from "lucide-react";

const imageSrcs = [
  "/images/founders.jpg",
  "/images/cats1.jpg",
  "/images/dogs1.jpg",
  "/images/kittens1.jpg",
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
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLParagraphElement>(null);
  const heroSubtitleRef = useRef<HTMLDivElement>(null);
  const heroSubtitleParaRef = useRef<HTMLParagraphElement>(null);
  const heroButtonsRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const sanctuaryImgRef = useRef<HTMLDivElement>(null);

  // ── Stats ──
  const statsItems = hp.raw("stats.items") as Array<{ value: string; label: string; detail: string }>;

  // ── Story notes ──
  const storyNotes = hp.raw("story.notes") as Array<{ eyebrow: string; title: string; text?: string }>;
  const storyNoteIcons = [MapPin, ShieldCheck, Users];

  // ── Vision pillars ──
  const visionPillars = hp.raw("vision.pillars") as Array<{ title: string; proof: string; text: string }>;

  // ── Facility list ──
  const facility = hp.raw("sanctuary.facility") as string[];

  // ── Impact pillars ──
  const impactPillarsRaw = hp.raw("impact.pillars") as Array<{ label: string; copy: string }>;
  const impactIconMap = [Stethoscope, PawPrint, Sparkles, Globe2];

  // ── Impact grid ──
  const impactGrid = hp.raw("impact.grid") as string[];

  // ── Gallery images ──
  const galleryImages = hp.raw("gallery.images") as Array<{ alt: string; className?: string }>;
  const galleryClasses = [
    "md:col-span-2 md:row-span-2",
    "",
    "",
    "",
  ];

  // ── GSAP ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(sanctuaryImgRef.current, {
        y: "8%",
        ease: "none",
        scrollTrigger: {
          trigger: sanctuaryRef.current,
          scroller: "#smooth-content",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-[#0d0d0b] text-white">
      {/* Cinematic hero */}
      <section ref={heroRef} className="relative min-h-screen isolate overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-0 -z-10 will-change-transform">
          <Image src="/images/cover.jpg" alt="Animal House rescue" fill priority className="object-cover" />
          <div
            ref={heroOverlayRef}
            style={{ opacity: 0.4 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.55)_48%,#0d0d0b_100%)]"
          />
        </div>

        <div ref={heroContentRef} className="relative z-10 flex min-h-screen items-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <motion.p
                ref={heroSubtitleRef as any}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-white/70"
              >
                {hp("hero.badge")}
              </motion.p>
              <motion.h1
                ref={heroTitleRef as any}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="max-w-5xl text-balance font-serif text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              >
                {hp("hero.title")}
              </motion.h1>
            </div>
            <div ref={heroRightRef}>
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 }}
                className="max-w-xl border-l border-white/20 pl-6"
              >
                <p ref={heroSubtitleParaRef} className="text-lg leading-8 text-white/78 md:text-xl">{hp("hero.subtitle")}</p>
                <div ref={heroButtonsRef} className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  <a href="#story" className="rounded-full border border-white/20 px-5 py-3 backdrop-blur transition hover:border-white/60 hover:text-white">
                    {hp("hero.ctaStory")}
                  </a>
                  <a href="#impact" className="rounded-full bg-white px-5 py-3 text-black transition hover:bg-white/85">
                    {hp("hero.ctaProof")}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact numbers */}
      <section className="border-y border-white/10 bg-[#0d0d0b] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
          {statsItems.map((stat) => (
            <div key={stat.label} className="bg-[#11110f] p-5 text-center md:p-7">
              <div className="text-3xl font-semibold tracking-[-0.05em] text-white md:text-5xl">{stat.value}</div>
              <div className="mt-3 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/52">{stat.label}</div>
              <div className="mt-2 text-xs leading-5 text-white/35">{stat.detail}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="bg-[#f4efe6] px-5 py-24 text-[#1d1d1b] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">{hp("story.sectionLabel")}</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                {hp("story.title")}
              </h2>
            </div>
            <div className="space-y-7 text-xl leading-9 text-black/70">
              <p>{about("history")}</p>
              <p>{about("facility")}</p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-5 md:grid-cols-3">
            {storyNotes.map((note, i) => {
              const Icon = storyNoteIcons[i];
              return (
                <StaggerItem key={note.title}>
                  <article className="h-full rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(36,28,16,0.10)]">
                    <Icon className="mb-8 h-7 w-7 text-[#8b6f4e]" />
                    <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-black/35">{note.eyebrow}</p>
                    <h3 className="mb-4 text-2xl font-semibold tracking-[-0.04em]">{note.title}</h3>
                    <p className="leading-7 text-black/62">{note.text || about("nokill")}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Vision pillars */}
      <section id="vision" className="bg-white px-5 py-24 text-[#1d1d1b] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">{hp("vision.sectionLabel")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("vision.title")}
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {visionPillars.map((pillar, index) => (
              <StaggerItem key={pillar.title}>
                <article className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-[#f7f3ec] p-6">
                  <div className="mb-10 text-sm font-semibold text-black/35">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-[-0.04em]">{pillar.title}</h3>
                  <p className="mb-5 leading-7 text-black/58">{pillar.text}</p>
                  <p className="mt-auto border-t border-black/10 pt-5 text-sm font-semibold uppercase tracking-[0.14em] text-[#8b6f4e]">{pillar.proof}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Parallax sanctuary */}
      <section id="sanctuary" ref={sanctuaryRef} className="relative min-h-screen overflow-hidden px-5 py-24 sm:px-8 lg:px-12">
        <div ref={sanctuaryImgRef} className="absolute inset-0 -z-10 will-change-transform">
          <Image src="/images/founders.jpg" alt="Animal House sanctuary" fill className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.56)_44%,rgba(0,0,0,0.18)_100%)]" />
        </div>
        <div className="mx-auto flex min-h-[74vh] max-w-7xl items-center">
          <AnimatedSection className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-white/50">{hp("sanctuary.label")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("sanctuary.title")}
            </h2>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {facility.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white/75 backdrop-blur-md">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Policies */}
      <section id="policies" className="bg-[#0d0d0b] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-white/38">{hp("policies.sectionLabel")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("policies.homeTitle")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-2">
            {[
              { title: policies("intakeTitle"), image: "/images/cats2.jpg", keys: ["intake1", "intake2", "intake3", "intake4"] as const },
              { title: policies("adoptionTitle"), image: "/images/dogs2.jpg", keys: ["adoption1", "adoption2", "adoption3"] as const },
            ].map((card) => (
              <AnimatedSection key={card.title} className="group overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04]">
                <div className="relative h-80 overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 right-6 text-3xl font-semibold tracking-[-0.05em]">{card.title}</h3>
                </div>
                <div className="space-y-4 p-6 md:p-8">
                  {card.keys.map((key) => (
                    <div key={key} className="flex gap-4 border-t border-white/10 pt-4 text-white/68 first:border-t-0 first:pt-0">
                      <Heart className="mt-1 h-4 w-4 shrink-0 text-white/80" />
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
      <section className="bg-[#f4efe6] px-5 py-24 text-[#1d1d1b] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">{hp("gallery.sectionLabel")}</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                {hp("gallery.homeTitle")}
              </h2>
            </div>
            <p className="max-w-sm text-lg leading-8 text-black/58">{hp("gallery.descriptiveText")}</p>
          </AnimatedSection>
          <div className="grid auto-rows-[17rem] gap-4 md:grid-cols-4">
            {galleryImages.map((image, index) => (
              <AnimatedSection key={image.alt} delay={index * 0.05} className={`group relative overflow-hidden rounded-[2rem] bg-black ${galleryClasses[index]}`}>
                <Image src={imageSrcs[index]} alt={image.alt} fill className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-5 left-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/85">{image.alt}</span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Impact pillars */}
      <section id="impact" className="bg-white px-5 py-24 text-[#1d1d1b] sm:px-8 lg:px-12 lg:py-32">
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
                  <article className="h-full rounded-[2rem] border border-black/8 bg-[#f7f3ec] p-7">
                    <Icon className="mb-10 h-7 w-7 text-[#8b6f4e]" />
                    <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-[-0.04em]">{pillar.label}</h3>
                    <p className="leading-7 text-black/58">{pillar.copy}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <AnimatedSection className="mt-16 rounded-[2.5rem] bg-[#11110f] p-8 text-white md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Home className="mb-8 h-8 w-8 text-white/60" />
                <h3 className="text-4xl font-semibold leading-[1] tracking-[-0.06em] md:text-6xl">
                  {hp("impact.leadText")}
                </h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {impactGrid.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative bg-[#11110f] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('/images/cover.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-[#11110f]/90" />
        <div className="relative max-w-7xl mx-auto px-5 py-20 sm:px-8 lg:px-12 lg:py-28 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              {hp("cta.title")}
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              {hp("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-block px-8 py-4 rounded-full bg-white text-black text-lg font-semibold hover:bg-white/85 transition-colors shadow-lg"
              >
                {hp("cta.ctaPrimary")}
              </a>
              <a
                href="#impact"
                className="inline-block px-8 py-4 rounded-full border border-white/20 text-white text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {hp("cta.ctaSecondary")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact section */}
      <section id="contact" className="bg-[#0d0d0b] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-white/38">{hp("contact.sectionLabel")}</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              {hp("contact.title")}
            </h2>
          </AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-2">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{hp("contact.locationLabel")}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{hp("contact.locationValue")}<br />{hp("contact.locationDetail")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{hp("contact.emailLabel")}</h3>
                    <p className="text-sm text-white/50">{hp("contact.emailValue")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{hp("contact.phoneLabel")}</h3>
                    <p className="text-sm text-white/50">{hp("contact.phoneValue")}</p>
                  </div>
                </div>
                <a
                  href="https://wa.me/966500000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold text-white/70 hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 00-3.48-8.413"/></svg>
                  {hp("contact.whatsapp")}
                </a>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="bg-[#11110f] px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 text-white/70 mb-6">
              <Send className="w-7 h-7" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {hp("newsletter.homeTitle")}
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">
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
                className="flex-1 max-w-md px-5 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent text-sm"
              />
              <button
                type="submit"
                disabled={newsletterStatus === "sending"}
                className="px-7 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/85 transition-colors shadow-md disabled:opacity-60"
              >
                {newsletterStatus === "sending" ? hp("newsletter.homeSending") : hp("newsletter.homeButton")}
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-4 text-sm text-white/70 font-medium">
                {hp("newsletter.homeSuccess")}
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="mt-4 text-sm text-white/50 font-medium">
                {hp("newsletter.homeError")}
              </p>
            )}
          </AnimatedSection>
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
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{contactSuccess("success.title")}</h3>
        <p className="text-white/50">{contactSuccess("success.desc")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{formT("nameLabel")}</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder={formT("namePlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-transparent transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{formT("emailLabel")}</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={formT("emailPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-transparent transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{formT("subjectLabel")}</label>
        <input
          type="text"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder={formT("subjectPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-transparent transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">{formT("messageLabel")}</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={formT("messagePlaceholder")}
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-white/15 focus:border-transparent transition-all resize-none text-sm"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-white/50">{formT("error")}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-white/85 transition-colors disabled:opacity-60 text-sm"
      >
        {status === "sending" ? formT("sending") : formT("submit")}
      </button>
    </form>
  );
}
