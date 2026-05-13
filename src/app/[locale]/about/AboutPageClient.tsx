"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { Heart, Shield, Globe, Users, Clock, Syringe } from "lucide-react";

export default function AboutPageClient() {
  const t = useTranslations("aboutPage");

  const pillars = [
    { key: "action", icon: Heart },
    { key: "data", icon: Shield },
    { key: "awareness", icon: Globe },
    { key: "youth", icon: Users },
    { key: "scale", icon: Clock },
  ];

  const milestones = [
    { year: "2019", key: "founded" },
    { year: "2020", key: "firstfacility" },
    { year: "2021", key: "tnrlaunch" },
    { year: "2022", key: "international" },
    { year: "2023", key: "youthprogram" },
    { year: "2025", key: "waqf" },
  ];

  const team = [
    { name: "Colin Rhys", role: t("team.founder1Role"), image: "/images/founders.jpg" },
    { name: "Khadija Abdullah", role: t("team.founder2Role"), image: "/images/founders.jpg" },
    { name: t("team.directorName"), role: t("team.directorRole"), image: "/images/team.jpg" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-24 md:py-36 bg-emerald-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/cover.jpg')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-primary/80 to-emerald-dark/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/history.png" alt="Animal House history" fill className="object-cover" />
            </div>
          </AnimatedSection>
          <div>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">{t("mission.title")}</h2>
              <p className="text-lg text-charcoal-light leading-relaxed mb-6">{t("mission.paragraph1")}</p>
              <p className="text-lg text-charcoal-light leading-relaxed mb-6">{t("mission.paragraph2")}</p>
              <div className="bg-emerald-50 border-l-4 border-emerald-primary p-6 rounded-r-xl">
                <p className="text-emerald-800 font-medium italic">{t("mission.quote")}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">{t("pillars.title")}</h2>
            <p className="text-lg text-charcoal-light max-w-2xl mx-auto">{t("pillars.subtitle")}</p>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.key}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition-all hover:-translate-y-1 h-full">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-emerald-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-2">{t(`pillars.${pillar.key}Title`)}</h3>
                    <p className="text-charcoal-light leading-relaxed">{t(`pillars.${pillar.key}Desc`)}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Facility */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-6">{t("facility.title")}</h2>
              <p className="text-lg text-charcoal-light leading-relaxed mb-6">{t("facility.paragraph1")}</p>
              <ul className="space-y-3 mb-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-charcoal-light">
                    <Syringe className="w-5 h-5 text-emerald-primary flex-shrink-0" />
                    <span>{t(`facility.item${i}`)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-charcoal-light leading-relaxed">{t("facility.paragraph2")}</p>
            </AnimatedSection>
          </div>
          <AnimatedSection className="order-1 lg:order-2">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/facility.png" alt="Animal House facility" fill className="object-cover" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">{t("timeline.title")}</h2>
            <p className="text-lg text-charcoal-light">{t("timeline.subtitle")}</p>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-primary/20 -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <AnimatedSection key={m.year} delay={i * 0.1}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1 text-center md:text-right">
                      <div className="bg-white rounded-2xl shadow-md p-6 inline-block text-left">
                        <span className="text-emerald-primary font-bold text-lg">{m.year}</span>
                        <h3 className="text-charcoal font-bold mt-1">{t(`timeline.${m.key}Title`)}</h3>
                        <p className="text-charcoal-light text-sm mt-1">{t(`timeline.${m.key}Desc`)}</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-emerald-primary rounded-full border-4 border-cream-dark shadow-sm z-10 hidden md:block" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">{t("team.title")}</h2>
          <p className="text-lg text-charcoal-light max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative h-64 overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-charcoal">{member.name}</h3>
                  <p className="text-charcoal-light mt-1">{member.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
