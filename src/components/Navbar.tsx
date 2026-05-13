"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PawPrint } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "ar" : "en";
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/adopt", label: t("adopt") },
    { href: "/donate", label: t("donate") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/volunteer", label: t("volunteer") },
  ];

  return (
    <nav className="bg-emerald-primary text-white sticky top-0 z-50 shadow-lg backdrop-blur-md bg-emerald-primary/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-emerald-100 transition-colors">
            <PawPrint className="w-6 h-6" />
            Animal House
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-white/15 text-white"
                    : "hover:bg-white/10 hover:text-emerald-100"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-4 w-px h-6 bg-white/20" />
            <Link
              href={pathname}
              locale={otherLocale}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
            >
              {otherLocale === "ar" ? "العربية" : "English"}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-emerald-dark border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-white/15 text-white"
                      : "hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-white/10">
                <Link
                  href={pathname}
                  locale={otherLocale}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20"
                >
                  {otherLocale === "ar" ? "العربية" : "English"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
