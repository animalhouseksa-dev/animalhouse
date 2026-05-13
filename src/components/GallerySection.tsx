'use client';

import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function GallerySection() {
  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 text-center mb-4">
          Rescue Photos
        </h2>
        <p className="text-emerald-700 text-center mb-12 max-w-2xl mx-auto">
          See the animals we care for and the facility that keeps them safe
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/cats1.jpg" alt="Cat area" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/cats2.jpg" alt="Cats in colony" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/cats3.jpg" alt="Cat care" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/cats4.jpg" alt="Happy cats" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/kittens1.jpg" alt="Kitten area" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/kittens2.jpg" alt="Kittens" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/dogs1.jpg" alt="Dog area" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md group">
            <Image src="/images/dogs2.jpg" alt="Dogs in pack" fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}