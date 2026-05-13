import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

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
  title: "Animal House - Give Them a Home",
  description: "A NO-KILL animal rescue in Saudi Arabia founded by Colin Rhys and Khadija Abdullah. We rescue, rehabilitate, and rehome cats and dogs across the Kingdom.",
  openGraph: {
    title: "Animal House - Give Them a Home",
    description: "A NO-KILL animal rescue in Saudi Arabia. Rescue. Rehabilitate. Rehome.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animal House - Give Them a Home",
    description: "A NO-KILL animal rescue in Saudi Arabia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${inter.variable} ${cormorant.variable} ${notoSansArabic.variable} scroll-smooth`}
    >
      <body className="min-h-full flex flex-col antialiased bg-cream text-charcoal font-sans">
        {children}
      </body>
    </html>
  );
}
