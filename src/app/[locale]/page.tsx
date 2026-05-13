export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export default function HomePage() {
  return (
    <main>
      <h1>Animal House</h1>
      <p>Test page — static render</p>
    </main>
  );
}
