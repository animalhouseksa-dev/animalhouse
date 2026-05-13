"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import Counter from "@/components/Counter";

const tiers = [
  {
    amount: 50,
    covers: "tier50Covers",
    description: "tier50Desc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    amount: 100,
    covers: "tier100Covers",
    description: "tier100Desc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    amount: 250,
    covers: "tier250Covers",
    description: "tier250Desc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    ),
  },
  {
    amount: 500,
    covers: "tier500Covers",
    description: "tier500Desc",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
];

const impactStats = [
  { amount: 50, label: "impactVaccines" },
  { amount: 200, label: "impactSpay" },
  { amount: 500, label: "impactRescue" },
  { amount: 1000, label: "impactFood" },
];

const transparencyData = [
  { label: "transparencyMedical", percent: 40, color: "bg-emerald-600" },
  { label: "transparencyFood", percent: 30, color: "bg-emerald-400" },
  { label: "transparencyOps", percent: 15, color: "bg-amber-400" },
  { label: "transparencyTNR", percent: 10, color: "bg-sky-400" },
  { label: "transparencyAdmin", percent: 5, color: "bg-gray-300" },
];

function PaymentMethodCard({
  title,
  description,
  badge,
  icon,
  details,
}: {
  title: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
  details?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e7e0d5] hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          {icon}
        </div>
        {badge && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-[#1f1f1f] mb-2">{title}</h3>
      <p className="text-sm text-[#4b5563] mb-4">{description}</p>
      {details && <div className="text-sm text-[#4b5563]">{details}</div>}
    </div>
  );
}

export default function DonatePageClient() {
  const t = useTranslations("donate");
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-emerald-700 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/images/cover.jpg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 to-emerald-800/60" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
            <AnimatedSection>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                {t("heroSubtitle")}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#tiers"
                  className="inline-block px-8 py-4 rounded-xl bg-white text-emerald-800 text-lg font-semibold hover:bg-[#f5f0e8] transition-colors shadow-lg"
                >
                  {t("ctaButton")}
                </a>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 rounded-xl bg-emerald-800/60 border border-emerald-400/40 text-white text-lg font-semibold hover:bg-emerald-800/80 transition-colors"
                >
                  {t("ctaContact")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Impact Stats Row */}
        <section className="bg-[#fffcf8] py-16 md:py-20 border-b border-[#e7e0d5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1f1f1f] text-center mb-12">
                {t("impactTitle")}
              </h2>
            </AnimatedSection>
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              staggerDelay={0.1}
            >
              {impactStats.map((stat) => (
                <StaggerItem key={stat.amount}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-center bg-white rounded-2xl p-8 shadow-sm border border-[#e7e0d5] hover:shadow-md transition-shadow"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-3">
                      <Counter end={stat.amount} suffix={t("sar")} duration={1.5} />
                    </div>
                    <p className="text-[#4b5563] text-sm leading-relaxed">
                      {t(stat.label)}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Donation Tiers */}
        <section id="tiers" className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f] mb-4">
                  {t("tierTitle")}
                </h2>
                <p className="text-lg text-[#4b5563] max-w-2xl mx-auto">
                  {t("tierSubtitle")}
                </p>
              </div>
            </AnimatedSection>

            {/* Monthly / One-time Toggle */}
            <AnimatedSection delay={0.1}>
              <div className="flex justify-center mb-12">
                <div className="inline-flex items-center bg-[#f5f0e8] rounded-full p-1 border border-[#e7e0d5]">
                  <button
                    onClick={() => setIsMonthly(false)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      !isMonthly
                        ? "bg-emerald-700 text-white shadow-md"
                        : "text-[#4b5563] hover:text-emerald-700"
                    }`}
                  >
                    {t("oneTimeToggle")}
                  </button>
                  <button
                    onClick={() => setIsMonthly(true)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isMonthly
                        ? "bg-emerald-700 text-white shadow-md"
                        : "text-[#4b5563] hover:text-emerald-700"
                    }`}
                  >
                    {t("monthlyToggle")}
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Tier Cards */}
            <StaggerContainer
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              staggerDelay={0.08}
            >
              {tiers.map((tier) => {
                const isSelected = selectedTier === tier.amount;
                return (
                  <StaggerItem key={tier.amount}>
                    <motion.button
                      whileHover={{ y: -8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTier(tier.amount)}
                      className={`w-full text-left rounded-2xl p-6 border-2 transition-all duration-300 shadow-sm ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50 shadow-lg"
                          : "border-[#e7e0d5] bg-white hover:shadow-md hover:border-emerald-200"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                          isSelected
                            ? "bg-emerald-600 text-white"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {tier.icon}
                      </div>
                      <div className="text-3xl font-bold text-[#1f1f1f] mb-1">
                        {tier.amount}
                        <span className="text-lg font-medium text-[#4b5563] mr-1">
                          {t("sar")}
                        </span>
                      </div>
                      {isMonthly && (
                        <p className="text-xs text-emerald-700 font-medium mb-2">
                          {t("perMonth")}
                        </p>
                      )}
                      <p className="text-sm font-semibold text-emerald-700 mb-2">
                        {t(tier.covers)}
                      </p>
                      <p className="text-sm text-[#4b5563] leading-relaxed">
                        {t(tier.description)}
                      </p>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="mt-4"
                        >
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {t("selected")}
                          </span>
                        </motion.div>
                      )}
                    </motion.button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Selected Tier CTA */}
            <AnimatedSection delay={0.2}>
              <div className="mt-12 text-center">
                {selectedTier ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex flex-col sm:flex-row items-center gap-4"
                  >
                    <span className="text-lg text-[#4b5563]">
                      {t("selectedAmount")}:
                      <strong className="text-[#1f1f1f] mr-1">
                        {selectedTier} {t("sar")}
                      </strong>
                      {isMonthly && (
                        <span className="text-sm text-emerald-700 mr-1">
                          ({t("monthly")})
                        </span>
                      )}
                    </span>
                    <button className="px-8 py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition-colors shadow-md">
                      {t("donateNow")}
                    </button>
                  </motion.div>
                ) : (
                  <p className="text-[#4b5563]">{t("selectTierPrompt")}</p>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Donation Methods */}
        <section className="bg-[#f5f0e8] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f] mb-4">
                  {t("methodsTitle")}
                </h2>
                <p className="text-lg text-[#4b5563] max-w-2xl mx-auto">
                  {t("methodsSubtitle")}
                </p>
              </div>
            </AnimatedSection>
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              staggerDelay={0.1}
            >
              <StaggerItem>
                <PaymentMethodCard
                  title={t("bankTransferTitle")}
                  description={t("bankTransferDesc")}
                  badge={t("localBadge")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                    </svg>
                  }
                  details={
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs bg-[#f5f0e8] rounded-lg px-3 py-2">
                        <span className="font-medium text-[#4b5563]">{t("bankName")}</span>
                        <span className="text-[#1f1f1f] font-semibold">{t("bankNameValue")}</span>
                      </div>
                      <div className="flex justify-between text-xs bg-[#f5f0e8] rounded-lg px-3 py-2">
                        <span className="font-medium text-[#4b5563]">{t("accountName")}</span>
                        <span className="text-[#1f1f1f] font-semibold">{t("accountNameValue")}</span>
                      </div>
                      <div className="flex justify-between text-xs bg-[#f5f0e8] rounded-lg px-3 py-2">
                        <span className="font-medium text-[#4b5563]">{t("iban")}</span>
                        <span className="text-[#1f1f1f] font-semibold" dir="ltr">{t("ibanValue")}</span>
                      </div>
                    </div>
                  }
                />
              </StaggerItem>
              <StaggerItem>
                <PaymentMethodCard
                  title={t("paypalTitle")}
                  description={t("paypalDesc")}
                  badge={t("intlBadge")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  }
                  details={
                    <div className="text-xs text-[#4b5563] bg-[#f5f0e8] rounded-lg px-3 py-2">
                      {t("paypalEmail")}: {" "}
                      <span className="font-semibold text-[#1f1f1f]">donations@animalhouse.sa</span>
                    </div>
                  }
                />
              </StaggerItem>
              <StaggerItem>
                <PaymentMethodCard
                  title={t("cryptoTitle")}
                  description={t("cryptoDesc")}
                  badge={t("globalBadge")}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  }
                  details={
                    <div className="flex flex-wrap gap-2">
                      {["BTC", "ETH", "USDT"].map((coin) => (
                        <span
                          key={coin}
                          className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f0e8] text-[#1f1f1f] border border-[#e7e0d5]"
                        >
                          {coin}
                        </span>
                      ))}
                    </div>
                  }
                />
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Transparency Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f] mb-4">
                  {t("transparencyTitle")}
                </h2>
                <p className="text-lg text-[#4b5563] mb-8">
                  {t("transparencySubtitle")}
                </p>
                <div className="space-y-4">
                  {transparencyData.map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-[#1f1f1f]">
                          {t(item.label)}
                        </span>
                        <span className="text-sm font-bold text-emerald-700">
                          {item.percent}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-[#f5f0e8] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full ${item.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Visual breakdown — stacked bars styled as a simple chart */}
              <AnimatedSection delay={0.2}>
                <div className="bg-[#fffcf8] rounded-2xl p-8 border border-[#e7e0d5]">
                  <div className="flex h-64 gap-1 rounded-xl overflow-hidden mb-6">
                    {transparencyData.map((item) => (
                      <motion.div
                        key={item.label}
                        initial={{ flex: 0 }}
                        whileInView={{ flex: item.percent }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex items-center justify-center ${item.color} text-white text-xs font-bold`}
                      >
                        <span className="hidden sm:inline">{item.percent}%</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {transparencyData.map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-full ${item.color}`}
                        />
                        <span className="text-xs text-[#4b5563]">
                          {t(item.label)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="bg-emerald-700 text-white py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <div className="flex items-center justify-center gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-emerald-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
                  {t("socialProofBadge")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("socialProofTitle")}
              </h2>
              <p className="text-lg text-emerald-100 max-w-2xl mx-auto mb-10">
                {t("socialProofSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-1">
                    <Counter end={500} suffix="+" duration={2} />
                  </div>
                  <p className="text-emerald-200 text-sm">{t("socialRescued")}</p>
                </div>
                <div className="hidden sm:block w-px bg-emerald-500" />
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-1">
                    <Counter end={1700} suffix="+" duration={2} />
                  </div>
                  <p className="text-emerald-200 text-sm">{t("socialTNR")}</p>
                </div>
                <div className="hidden sm:block w-px bg-emerald-500" />
                <div>
                  <div className="text-4xl md:text-5xl font-bold mb-1">
                    <Counter end={270000} suffix="+" duration={2} />
                  </div>
                  <p className="text-emerald-200 text-sm">{t("socialBirths")}</p>
                </div>
              </div>
              <StaggerContainer
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left"
                staggerDelay={0.1}
              >
                {[
                  { quote: "testimonial1", name: "testimonial1Name", role: "testimonial1Role" },
                  { quote: "testimonial2", name: "testimonial2Name", role: "testimonial2Role" },
                  { quote: "testimonial3", name: "testimonial3Name", role: "testimonial3Role" },
                ].map((tmonial, i) => (
                  <StaggerItem key={i}>
                    <div className="bg-emerald-800/50 rounded-2xl p-6 border border-emerald-600/40">
                      <p className="text-emerald-100 italic leading-relaxed mb-4">
                        "{t(tmonial.quote)}"
                      </p>
                      <div>
                        <p className="font-semibold text-white">{t(tmonial.name)}</p>
                        <p className="text-sm text-emerald-300">{t(tmonial.role)}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </AnimatedSection>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#fffcf8] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1f1f1f] mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-lg text-[#4b5563] mb-8 max-w-2xl mx-auto">
                {t("ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#tiers"
                  className="inline-block px-8 py-4 rounded-xl bg-emerald-700 text-white text-lg font-semibold hover:bg-emerald-800 transition-colors shadow-md"
                >
                  {t("ctaButton")}
                </a>
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 rounded-xl bg-white text-emerald-800 border border-[#e7e0d5] text-lg font-semibold hover:bg-[#f5f0e8] transition-colors"
                >
                  {t("ctaContact")}
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
