import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import VolunteerPageClient from './VolunteerPageClient';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('volunteerPage.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function VolunteerPage() {
  return <VolunteerPageClient />;
}
