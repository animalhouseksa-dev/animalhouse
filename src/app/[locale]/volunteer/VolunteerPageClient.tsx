"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";
import { Heart, Home, Calendar, Scissors, CheckCircle, Send, AlertCircle, PawPrint } from "lucide-react";

const roleIcons = {
  onsite: PawPrint,
  foster: Home,
  events: Calendar,
  tnr: Scissors,
};

export default function VolunteerPageClient() {
  const t = useTranslations("volunteerPage");
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const roles = ["onsite", "foster", "events", "tnr"] as const;
  const requirements = ["age", "commitment", "location", "attitude", "training"] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "volunteer",
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", role: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-emerald-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/team.jpg')] bg-cover bg-center opacity-15" />
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
            className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal">{t("roles.title")}</h2>
        </AnimatedSection>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = roleIcons[role] || Heart;
            return (
              <StaggerItem key={role}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl p-8 transition-all hover:-translate-y-1 h-full">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-emerald-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-3">{t(`roles.${role}Title`)}</h3>
                  <p className="text-charcoal-light leading-relaxed">{t(`roles.${role}Desc`)}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Requirements + Form */}
      <section className="py-20 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <h2 className="text-2xl font-bold text-charcoal mb-8">{t("requirements.title")}</h2>
                <ul className="space-y-5">
                  {requirements.map((req) => (
                    <li key={req} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-5 h-5 text-emerald-primary" />
                      </div>
                      <span className="text-charcoal-light">{t(`requirements.${req}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection delay={0.15}>
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <h2 className="text-2xl font-bold text-charcoal mb-8">{t("form.title")}</h2>
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-start gap-4"
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-primary flex-shrink-0 mt-0.5" />
                    <p className="text-emerald-800">{t("form.success")}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.name")}</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={t("form.namePlaceholder")}
                        className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.email")}</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder={t("form.emailPlaceholder")}
                          className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.phone")}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder={t("form.phonePlaceholder")}
                          className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.role")}</label>
                      <select
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                      >
                        <option value="">{t("form.rolePlaceholder")}</option>
                        {roles.map((role) => (
                          <option key={role} value={role}>{t(`form.roles.${role}`)}</option>
                        ))}
                        <option value="other">{t("form.roles.other")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.message")}</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={t("form.messagePlaceholder")}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all resize-none"
                      />
                    </div>
                    {status === "error" && (
                      <div className="flex items-center gap-2 text-coral">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">{t("form.error")}</span>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-primary hover:bg-emerald-dark text-white font-semibold py-4 rounded-xl transition-colors disabled:opacity-70"
                    >
                      <Send className="w-4 h-4" />
                      {status === "sending" ? t("form.sending") : t("form.submit")}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
