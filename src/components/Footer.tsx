'use client';

import { useTranslations } from 'next-intl';
import { PawPrint, Heart } from 'lucide-react';

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const XIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-1.311-.036-1.811.295-1.811 1.618v1.353h3.912l-.532 3.667h-3.38v7.98H9.1Z"/></svg>
);
const WhatsAppIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.821 11.821 0 00-3.48-8.413"/></svg>
);

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[#0a0a08] text-white/50">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 text-white text-xl font-bold mb-4">
              <PawPrint className="w-6 h-6 text-white/80" />
              Animal House
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A NO-KILL animal rescue dedicated to saving cats and dogs across the Kingdom of Saudi Arabia.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <XIcon />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#story" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#vision" className="hover:text-white transition-colors">Vision</a></li>
              <li><a href="#sanctuary" className="hover:text-white transition-colors">Sanctuary</a></li>
              <li><a href="#policies" className="hover:text-white transition-colors">Policies</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">Impact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>Riyadh, Saudi Arabia</li>
              <li>info@animalhouse.sa</li>
              <li>+966 50 000 0000</li>
              <li className="pt-1">
                <span className="inline-block px-2 py-1 bg-white/10 text-white/80 text-xs font-semibold rounded">
                  Emergency Hotline
                </span>
              </li>
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Our Impact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>1,200+ Cats Spayed</li>
              <li>500+ Dogs Spayed</li>
              <li>270,000+ Births Prevented</li>
              <li>600+ Yearly Volunteers</li>
              <li>1.2B+ Media Impressions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div>
            &copy; {new Date().getFullYear()} Animal House. {t('rights')}
          </div>
          <div className="flex items-center gap-1.5 text-white/60">
            <span>{t('madeWith')}</span>
            <Heart className="w-4 h-4 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
}
