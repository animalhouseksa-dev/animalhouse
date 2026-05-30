"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";

const navKeys = ["story", "sanctuary", "policies", "impact", "contact", "vision"] as const;
const navHrefs = ["#story", "#sanctuary", "#policies", "#impact", "#contact", "#vision"] as const;

export default function GlobalNav() {
  const t = useTranslations("navLinks");
  const locale = useLocale();
  const otherLocale = locale === "en" ? "ar" : "en";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-5 py-5 sm:px-8 lg:px-10 transition-all duration-500 ${
        scrolled ? "bg-[#0d0d0b]/80 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-black/25 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.28em] text-white/80 backdrop-blur-xl transition-colors duration-500 hover:bg-black/40">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <Image src="/images/logo/animal-house-logo.svg" alt="Animal House" width={140} height={36} className="h-9 w-auto" />
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {navKeys.map((key, i) => (
            <a
              key={key}
              href={navHrefs[i]}
              className="transition hover:text-white"
            >
              {t(key)}
            </a>
          ))}
          <div className="mx-2 h-4 w-px bg-white/20" />
          <Link
            href="/"
            locale={otherLocale}
            className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[0.6rem] transition hover:bg-white/20"
          >
            {otherLocale === "ar" ? "العربية" : "English"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
