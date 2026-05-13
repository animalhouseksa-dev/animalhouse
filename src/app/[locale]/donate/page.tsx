import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import DonatePageClient from './DonatePageClient';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('donate.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function DonatePage() {
  return <DonatePageClient />;
}
