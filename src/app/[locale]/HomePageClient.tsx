"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import Counter from "@/components/Counter";
import { Heart, HandHeart, Users, Home, ArrowRight, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function HomePageClient() {
  const t = useTranslations("homePage");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { key: "rescued", value: 500, suffix: "+" },
    { key: "adopted", value: 320, suffix: "+" },
    { key: "tnr", value: 1700, suffix: "+" },
    { key: "volunteers", value: 600, suffix: "+" },
  ];

  const features = [
    { key: "adopt", icon: Heart, color: "bg-rose-50 text-rose-600", href: "/adopt" },
    { key: "donate", icon: HandHeart, color: "bg-emerald-50 text-emerald-600", href: "/donate" },
    { key: "volunteer", icon: Users, color: "bg-amber-50 text-amber-600", href: "/volunteer" },
    { key: "foster", icon: Home, color: "bg-sky-50 text-sky-600", href: "/contact" },
  ];

  const galleryImages = [
    { src: "/images/cats1.jpg", alt: "Cat area", span: "col-span-1 row-span-2" },
    { src: "/images/dogs1.jpg", alt: "Dogs", span: "col-span-1 row-span-1" },
    { src: "/images/kittens1.jpg", alt: "Kittens", span: "col-span-1 row-span-1" },
    { src: "/images/cats2.jpg", alt: "Happy cats", span: "col-span-2 row-span-2" },
    { src: "/images/dogs2.jpg", alt: "Dog pack", span: "col-span-1 row-span-1" },
    { src: "/images/kittens2.jpg", alt: "Kitten care", span: "col-span-1 row-span-1" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero with Parallax */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="/images/cover.jpg"
            alt="Animal House rescue"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-primary/70 via-emerald-primary/60 to-emerald-dark/90" />
        </motion.div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6">
              NO-KILL Shelter · Riyadh, Saudi Arabia
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/adopt"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-white text-emerald-primary hover:bg-emerald-50 transition-colors shadow-xl"
              >
                {t("hero.ctaAdopt")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-emerald-700/60 backdrop-blur-sm text-white border border-white/30 hover:bg-emerald-700/80 transition-colors"
              >
                {t("hero.ctaDonate")}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-emerald-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("stats.title")}</h2>
            <p className="text-emerald-100 max-w-2xl mx-auto">{t("stats.subtitle")}</p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.key} className="text-white">
                <div className="text-5xl md:text-6xl font-extrabold mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-emerald-200 text-sm md:text-base uppercase tracking-wider font-medium">
                  {t(`stats.${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">{t("features.title")}</h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ key, icon: Icon, color, href }) => (
            <StaggerItem key={key}>
              <Link href={href} className="block group">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition-all hover:-translate-y-1.5 h-full border border-transparent hover:border-emerald-primary/20">
                  <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{t(`features.${key}Title`)}</h3>
                  <p className="text-charcoal-light leading-relaxed mb-4">{t(`features.${key}Desc`)}</p>
                  <span className="inline-flex items-center text-emerald-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    {t(`features.${key}Cta`)}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative h-[28rem] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/founders.jpg" alt="Founders" fill className="object-cover" />
              </div>
            </AnimatedSection>
            <div>
              <AnimatedSection delay={0.1}>
                <span className="text-emerald-primary font-bold text-sm uppercase tracking-wider">{t("about.badge")}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-charcoal mt-2 mb-6">{t("about.title")}</h2>
                <p className="text-lg text-charcoal-light leading-relaxed mb-6">{t("about.paragraph1")}</p>
                <p className="text-lg text-charcoal-light leading-relaxed mb-8">{t("about.paragraph2")}</p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-emerald-primary hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  {t("about.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">{t("gallery.title")}</h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">{t("gallery.subtitle")}</p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((img, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.08}
              className={`relative rounded-2xl overflow-hidden shadow-md group cursor-pointer ${img.span}`}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-medium">{img.alt}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-emerald-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("newsletter.title")}</h2>
            <p className="text-emerald-100 mb-8">{t("newsletter.subtitle")}</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-emerald-200 focus:ring-2 focus:ring-white/40 outline-none"
              />
              <button
                type="submit"
                className="px-6 py-4 rounded-xl bg-white text-emerald-primary font-bold hover:bg-emerald-50 transition-colors"
              >
                {t("newsletter.button")}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
