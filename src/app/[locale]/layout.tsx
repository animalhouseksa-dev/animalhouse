import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import ScrollSmootherProvider from "@/components/ScrollSmootherProvider";
import GlobalNav from "@/components/GlobalNav";
import Footer from "@/components/Footer";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Animal House — Give Them a Home",
  description:
    "A NO-KILL animal rescue in Saudi Arabia founded by Colin Rhys and Khadija Abdullah. We rescue, rehabilitate, and rehome cats and dogs across the Kingdom.",
  openGraph: {
    title: "Animal House — Give Them a Home",
    description: "A NO-KILL animal rescue in Saudi Arabia. Rescue. Rehabilitate. Rehome.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animal House — Give Them a Home",
    description: "A NO-KILL animal rescue in Saudi Arabia",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${cormorant.variable} ${notoSansArabic.variable}`}
    >
      <body className="antialiased bg-[#0d0d0b] text-white font-sans">
        <NextIntlClientProvider messages={messages}>
          <GlobalNav />
          <ScrollSmootherProvider>
            {children}
            <Footer />
          </ScrollSmootherProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
