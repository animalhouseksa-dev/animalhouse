"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactPageClient() {
  const t = useTranslations("contactPage");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", subject: "", message: "" });
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
        <div className="absolute inset-0 bg-[url('/images/cover.jpg')] bg-cover bg-center opacity-20" />
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

      {/* Contact Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <AnimatedSection>
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
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={t("form.namePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.email")}</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder={t("form.emailPlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.subject")}</label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder={t("form.subjectPlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-sand bg-cream focus:ring-2 focus:ring-emerald-primary/30 focus:border-emerald-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-light mb-1.5">{t("form.message")}</label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder={t("form.messagePlaceholder")}
                      rows={5}
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

          {/* Info Cards */}
          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal mb-1">{t("info.locationTitle")}</h3>
                    <p className="text-charcoal-light">{t("info.locationValue")}</p>
                    <p className="text-sm text-charcoal-light/70 mt-1">{t("info.locationDetail")}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-coral" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal mb-1">{t("info.hotlineTitle")}</h3>
                    <p className="text-charcoal-light font-mono">{t("info.hotlineValue")}</p>
                    <a
                      href={`tel:${t("info.hotlineValue").replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 mt-3 bg-coral hover:bg-coral-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {t("info.hotlineCta")}
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal mb-1">{t("info.emailTitle")}</h3>
                    <p className="text-charcoal-light">{t("info.emailValue")}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-emerald-primary rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t("whatsapp.title")}</h3>
                    <p className="text-emerald-100 text-sm mb-4">{t("whatsapp.description")}</p>
                    <a
                      href="https://wa.me/966500000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-emerald-primary hover:bg-emerald-50 font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t("whatsapp.cta")}
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
