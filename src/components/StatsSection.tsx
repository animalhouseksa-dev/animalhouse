'use client';

import {useTranslations} from 'next-intl';

export default function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    { key: 'rescued', value: '500+' },
    { key: 'adopted', value: '320+' },
    { key: 'volunteers', value: '600+' },
    { key: 'impressions', value: '1.2B' },
  ];

  return (
    <section className="bg-emerald-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.key} className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-emerald-200 text-sm md:text-base uppercase tracking-wide">
                {t(stat.key as any)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}