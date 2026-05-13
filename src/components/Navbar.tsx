'use client';

import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <nav className="bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-tight">
              AnimalHouse
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <Link href="/" className="hover:text-emerald-200 transition-colors">
              {t('home')}
            </Link>
            <Link href="/adopt" className="hover:text-emerald-200 transition-colors">
              {t('adopt')}
            </Link>
            <Link href="/donate" className="hover:text-emerald-200 transition-colors">
              {t('donate')}
            </Link>
            <Link href="/about" className="hover:text-emerald-200 transition-colors">
              {t('about')}
            </Link>
            <Link href="/contact" className="hover:text-emerald-200 transition-colors">
              {t('contact')}
            </Link>
            <Link href="/volunteer" className="hover:text-emerald-200 transition-colors">
              {t('volunteer')}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center">
            <Link
              href="/"
              locale={otherLocale}
              className="px-3 py-1 rounded-md bg-emerald-800 hover:bg-emerald-900 text-sm font-medium transition-colors"
            >
              {otherLocale === 'ar' ? 'العربية' : 'English'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}