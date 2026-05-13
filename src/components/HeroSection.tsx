'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative bg-emerald-50 py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-900 tracking-tight mb-6">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-emerald-700 mb-10 leading-relaxed">
              {t('subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/adopt"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-lg"
              >
                {t('ctaAdopt')}
              </Link>
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-emerald-700 border-2 border-emerald-600 hover:bg-emerald-50 transition-colors shadow-lg"
              >
                {t('ctaDonate')}
              </Link>
            </div>
          </div>
          <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/cover.jpg"
              alt="Animal House rescue"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}