import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <AboutSection />
        <GallerySection />
      </main>
      <Footer />
    </>
  );
}