'use client';

import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold text-white">AnimalHouse</div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} AnimalHouse. {t('rights')}
          </div>
          <div className="text-sm text-emerald-500">
            {t('madeWith')}
          </div>
        </div>
      </div>
    </footer>
  );
}