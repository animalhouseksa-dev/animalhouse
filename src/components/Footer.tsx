'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const navT = useTranslations('navLinks');

  return (
    <footer className="bg-[#fbf8ff] text-[#2d2139]/70 border-t border-[#d8c7ef]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image src="/images/logo/animal-house-logo.svg" alt="Animal House" width={160} height={40} className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-6 text-[#2d2139]/60">
              {t('brandDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#5b3585] font-bold mb-4 text-sm uppercase tracking-wider">{t('navigate')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#story" className="hover:text-[#5b3585] transition-colors">{navT('story')}</a></li>
              <li><a href="#sanctuary" className="hover:text-[#5b3585] transition-colors">{navT('sanctuary')}</a></li>
              <li><a href="#vision" className="hover:text-[#5b3585] transition-colors">{navT('vision')}</a></li>
              <li><a href="#policies" className="hover:text-[#5b3585] transition-colors">{navT('policies')}</a></li>
              <li><a href="#impact" className="hover:text-[#5b3585] transition-colors">{navT('impact')}</a></li>
              <li><a href="#contact" className="hover:text-[#5b3585] transition-colors">{navT('contact')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#5b3585] font-bold mb-4 text-sm uppercase tracking-wider">{t('contact')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>animalhouseksa@gmail.com</li>
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-[#5b3585] font-bold mb-4 text-sm uppercase tracking-wider">{t('ourImpact')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li>3,000+ {t('catsRescued')}</li>
              <li>2,500+ {t('catsSpayed')}</li>
              <li>150+ {t('dogsSpayed')}</li>
              <li>270k+ {t('birthsPrevented')}</li>
              <li>250+ {t('dogsRescued')}</li>
              <li>100+ {t('volunteersEngaged')}</li>
              <li>1.2B+ Media Impressions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm border-t border-[#d8c7ef]">
        <div className="text-[#2d2139]/50">
          &copy; {new Date().getFullYear()} Animal House. {t('rights')}
        </div>
        <div className="flex items-center gap-1.5 text-[#8b5fc7]">
          <span>{t('madeWith')}</span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </div>
    </footer>
  );
}
