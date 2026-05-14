'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 text-center mb-16">
          {t('title')}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/founders.jpg"
              alt="Animal House Animals"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('history')}
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-lg">
              <p className="text-emerald-800 italic font-medium">
                {t('nokill')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t('facility')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t('team')}
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg order-1 lg:order-2">
            <Image
              src="/images/facility.png"
              alt="Animal House facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}