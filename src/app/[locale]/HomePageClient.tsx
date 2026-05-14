"use client";

import { useRef, useEffect } from "react";
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
} from "lucide-react";

const imageCards = [
  { src: "/images/cover.jpg", alt: "Animal House rescue animals", className: "md:col-span-2 md:row-span-2" },
  { src: "/images/cats1.jpg", alt: "Cat colony area", className: "" },
  { src: "/images/dogs1.jpg", alt: "Rescued dogs", className: "" },
  { src: "/images/kittens1.jpg", alt: "Kitten nursery", className: "" },
  { src: "/images/founders.jpg", alt: "Animal House founders", className: "md:col-span-2" },
];

export default function HomePageClient() {
  const home = useTranslations("homePage");
  const about = useTranslations("about");
  const policies = useTranslations("policies");
  const heroRef = useRef<HTMLDivElement>(null);
  const sanctuaryRef = useRef<HTMLDivElement>(null);

  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const sanctuaryImgRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "1,200+", label: "Cats spayed", detail: "Documented TNR impact" },
    { value: "500+", label: "Dogs spayed", detail: "Direct population control" },
    { value: "270,000+", label: "Future cat births prevented", detail: "On Riyadh streets" },
    { value: "600+", label: "Yearly volunteers engaged", detail: "Local Saudis" },
    { value: "1.2B+", label: "Media impressions", detail: "Awareness reach" },
    { value: "12+", label: "Educational site visits", detail: "Per year" },
  ];

  const storyNotes = [
    {
      icon: MapPin,
      eyebrow: "Kingdom-wide rescue",
      title: "From Arar to Jeddah",
      text: "Animal House rescues cats and dogs from across Saudi Arabia, with adoption stories reaching as far as Los Angeles and Paris.",
    },
    {
      icon: ShieldCheck,
      eyebrow: "Non-negotiable principle",
      title: "NO-KILL, always",
      text: about("nokill"),
    },
    {
      icon: Users,
      eyebrow: "A small team with a wide network",
      title: "On-site care, volunteer power",
      text: about("team"),
    },
  ];

  const visionPillars = [
    {
      title: "Immediate action",
      proof: "Nobody can argue with results.",
      text: "Solve the problem on the ground through rescue work, not talk.",
    },
    {
      title: "Data + proof",
      proof: "Nobody can argue with data + proof.",
      text: "Retain and train wildlife investigators to expose crimes and publish the data needed for action.",
    },
    {
      title: "History + awareness",
      proof: "Nobody can argue with history.",
      text: "Amplify sermons and historic teachings that drive awareness around the fair treatment of animals.",
    },
    {
      title: "Youth engagement",
      proof: "Nobody can decide the future of animals in KSA better than them.",
      text: "Engage the youth of Saudi Arabia because they will define the next era of animal welfare.",
    },
    {
      title: "First-world progress",
      proof: "Nobody can argue with first world progress.",
      text: "Develop a sustainable shelter model that can scale across Saudi Arabia, starting with the capital.",
    },
  ];

  const facility = [
    "Cat colony area — open living, not cages",
    "Dog pack area — social group housing",
    "Quarantine rooms for new arrivals",
    "Kitten nursery for vulnerable babies",
    "Nursing mothers room",
    "FIV isolation zone with specialist care",
    "Weekly veterinarian visits and grooming tables",
  ];

  const policyCards = [
    {
      title: policies("intakeTitle"),
      image: "/images/cats2.jpg",
      points: [policies("intake1"), policies("intake2"), policies("intake3"), policies("intake4")],
    },
    {
      title: policies("adoptionTitle"),
      image: "/images/dogs2.jpg",
      points: [policies("adoption1"), policies("adoption2"), policies("adoption3")],
    },
  ];

  const impactPillars = [
    {
      icon: Stethoscope,
      label: "Rescue + rehabilitation",
      copy: "Every intake moves through quarantine, veterinary care, vaccination, microchipping, and sterilization before joining the general population or adoption pipeline.",
    },
    {
      icon: PawPrint,
      label: "TNR with proof",
      copy: "1,700+ Trap-Neuter-Return procedures have prevented an estimated 270,000 future street-cat births in Riyadh.",
    },
    {
      icon: Sparkles,
      label: "Youth awareness",
      copy: "Educational site visits and campaigns help young Saudis build a culture of mercy, responsibility, and animal welfare.",
    },
    {
      icon: Globe2,
      label: "International rehoming",
      copy: "When the right family is abroad, Animal House makes the distance work — because a permanent safe home is the goal.",
    },
  ];

  // GSAP scroll-parallax runs off the smoothed scroll value
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero background: slower y + subtle scale
      gsap.to(heroBgRef.current, {
        y: "28%",
        scale: 1.14,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          scroller: "#smooth-content",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      // Hero content: fade out
      gsap.to(heroContentRef.current, {
        opacity: 0.2,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          scroller: "#smooth-content",
          start: "20% top",
          end: "75% top",
          scrub: 0.5,
        },
      });
      // Sanctuary image: gentle parallax
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
    <main className="min-h-screen overflow-hidden bg-[#0d0d0b] text-white">
      {/* Cinematic hero */}
      <section ref={heroRef} className="relative min-h-screen isolate overflow-hidden">
        <div ref={heroBgRef} className="absolute inset-0 -z-10 will-change-transform">
          <Image src="/images/cover.jpg" alt="Animal House rescue" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.55)_48%,#0d0d0b_100%)]" />
        </div>

        <header className="absolute left-0 right-0 top-0 z-20 px-5 py-6 sm:px-8 lg:px-12">
          <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-black/25 px-5 py-3 text-xs uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl">
            <div className="flex items-center gap-2 font-semibold text-white">
              <PawPrint className="h-4 w-4" />
              Animal House
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <a href="#story" className="transition hover:text-white">Story</a>
              <a href="#vision" className="transition hover:text-white">Vision</a>
              <a href="#sanctuary" className="transition hover:text-white">Sanctuary</a>
              <a href="#policies" className="transition hover:text-white">Policies</a>
              <a href="#impact" className="transition hover:text-white">Impact</a>
            </div>
          </nav>
        </header>

        <div ref={heroContentRef} className="relative z-10 flex min-h-screen items-end px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24">
          <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-5 text-xs font-semibold uppercase tracking-[0.42em] text-white/70"
              >
                NO-KILL Shelter · Riyadh, Saudi Arabia
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="max-w-5xl text-balance font-serif text-6xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              >
                Every animal deserves a loving home.
              </motion.h1>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="max-w-xl border-l border-white/20 pl-6"
            >
              <p className="text-lg leading-8 text-white/78 md:text-xl">{home("hero.subtitle")}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                <a href="#story" className="rounded-full border border-white/20 px-5 py-3 backdrop-blur transition hover:border-white/60 hover:text-white">
                  Read the story
                </a>
                <a href="#impact" className="rounded-full bg-white px-5 py-3 text-black transition hover:bg-white/85">
                  See the proof
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PDF impact numbers */}
      <section className="border-y border-white/10 bg-[#0d0d0b] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
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
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">Our story</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                A rescue built like a promise.
              </h2>
            </div>
            <div className="space-y-7 text-xl leading-9 text-black/70">
              <p>{about("history")}</p>
              <p>{about("facility")}</p>
            </div>
          </AnimatedSection>

          <StaggerContainer className="mt-16 grid gap-5 md:grid-cols-3">
            {storyNotes.map(({ icon: Icon, eyebrow, title, text }) => (
              <StaggerItem key={title}>
                <article className="h-full rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_rgba(36,28,16,0.10)]">
                  <Icon className="mb-8 h-7 w-7 text-[#8b6f4e]" />
                  <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-black/35">{eyebrow}</p>
                  <h3 className="mb-4 text-2xl font-semibold tracking-[-0.04em]">{title}</h3>
                  <p className="leading-7 text-black/62">{text}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Vision pillars from the PDF */}
      <section id="vision" className="bg-white px-5 py-24 text-[#1d1d1b] sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-14 max-w-4xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">Key pillars of our vision</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              The PDF is clear: action, evidence, culture, youth, scale.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {visionPillars.map((pillar, index) => (
              <StaggerItem key={pillar.title}>
                <article className="flex h-full flex-col rounded-[2rem] border border-black/8 bg-[#f7f3ec] p-6">
                  <div className="mb-10 text-sm font-semibold text-black/35">0{index + 1}</div>
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
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-white/50">The sanctuary</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              An Istraha 45 minutes from Riyadh, redesigned around care.
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
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-white/38">Standards of care</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Beauty is the hook. The system is the rescue.
            </h2>
          </AnimatedSection>
          <div className="grid gap-6 lg:grid-cols-2">
            {policyCards.map((card) => (
              <AnimatedSection key={card.title} className="group overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.04]">
                <div className="relative h-80 overflow-hidden">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <h3 className="absolute bottom-6 left-6 right-6 text-3xl font-semibold tracking-[-0.05em]">{card.title}</h3>
                </div>
                <div className="space-y-4 p-6 md:p-8">
                  {card.points.map((point) => (
                    <div key={point} className="flex gap-4 border-t border-white/10 pt-4 text-white/68 first:border-t-0 first:pt-0">
                      <Heart className="mt-1 h-4 w-4 shrink-0 text-white/80" />
                      <p className="leading-7">{point}</p>
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
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">Photo essay</p>
              <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
                Lives in progress, not marketing props.
              </h2>
            </div>
            <p className="max-w-sm text-lg leading-8 text-black/58">General cat area: all cats live as a colony, not in cages. Dog area: all dogs live as a pack, not in cages. Quarantine and additional kitten areas are part of the care system.</p>
          </AnimatedSection>
          <div className="grid auto-rows-[17rem] gap-4 md:grid-cols-4">
            {imageCards.map((image, index) => (
              <AnimatedSection key={image.src} delay={index * 0.05} className={`group relative overflow-hidden rounded-[2rem] bg-black ${image.className}`}>
                <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-700 group-hover:scale-105" />
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
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-[#8b6f4e]">What the PDF says, plainly</p>
            <h2 className="text-balance font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl">
              Rescue, data, education, scale.
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {impactPillars.map(({ icon: Icon, label, copy }) => (
              <StaggerItem key={label}>
                <article className="h-full rounded-[2rem] border border-black/8 bg-[#f7f3ec] p-7">
                  <Icon className="mb-10 h-7 w-7 text-[#8b6f4e]" />
                  <h3 className="mb-4 text-2xl font-semibold leading-tight tracking-[-0.04em]">{label}</h3>
                  <p className="leading-7 text-black/58">{copy}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimatedSection className="mt-16 rounded-[2.5rem] bg-[#11110f] p-8 text-white md:p-12">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <Home className="mb-8 h-8 w-8 text-white/60" />
                <h3 className="text-4xl font-semibold leading-[1] tracking-[-0.06em] md:text-6xl">The front page is now the story.</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Future facility capacity: 600 cats on site",
                  "Future facility capacity: 50 dogs on site",
                  "Future TNR target: 2,400 spay/neuter procedures per year",
                  "Future KPI: 600+ cats rescued",
                  "Future KPI: 100+ dogs rescued",
                  "Future KPI: 240+ cats adopted",
                  "Future KPI: 50+ dogs adopted",
                  "100+ community feeding and water stations installed",
                  "4+ government partnerships: Sports Boulevard, MOFA, Diriyah, New Murabba",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/68">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
