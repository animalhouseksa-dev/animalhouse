import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactPageClient from './ContactPageClient';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contactPage.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
