'use client';

import {useTranslations} from 'next-intl';
import {Heart, HandHeart, Users, Home} from 'lucide-react';

export default function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    { key: 'adopt', icon: Heart },
    { key: 'donate', icon: HandHeart },
    { key: 'volunteer', icon: Users },
    { key: 'foster', icon: Home },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-lg hover:border-emerald-200 transition-all group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors">
                <Icon className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t(`${key}Title` as any)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`${key}Desc` as any)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}