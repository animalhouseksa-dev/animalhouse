import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AdoptPageClient from './AdoptPageClient';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('adopt.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AdoptPage() {
  return <AdoptPageClient />;
}
