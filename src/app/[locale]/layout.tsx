import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages} from 'next-intl/server';
import ScrollSmootherProvider from '@/components/ScrollSmootherProvider';
import GlobalNav from '@/components/GlobalNav';
import Footer from '@/components/Footer';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased bg-[#0d0d0b] text-white">
        <NextIntlClientProvider messages={messages}>
          <GlobalNav />
          <ScrollSmootherProvider>
            {children}
            <Footer />
          </ScrollSmootherProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
