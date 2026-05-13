import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('aboutPage.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
