import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/site';

/* Inline social icons since lucide-react v1.8 removed brand icons */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.94a8.27 8.27 0 004.76 1.5V7a4.85 4.85 0 01-1-.31z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';

  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: t('footer.customSigns'), path: `/${currentLang}/calculator` },
    { label: t('footer.readySigns'), path: `/${currentLang}/shop` },
    { label: t('footer.businessSigns'), path: `/${currentLang}/shop` },
    { label: t('footer.weddingSigns'), path: `/${currentLang}/shop` },
    { label: t('footer.logoSigns'), path: `/${currentLang}/custom-order` },
  ];

  const companyLinks = [
    { label: t('footer.aboutUs'), path: `/${currentLang}/about` },
    { label: t('footer.ourWork'), path: `/${currentLang}/portfolio` },
    { label: t('footer.blog'), path: `/${currentLang}/blog` },
    { label: t('nav.faq'), path: `/${currentLang}/faq` },
  ];

  const legalLinks = [
    { label: t('footer.impressum'), path: `/${currentLang}/impressum` },
    { label: t('footer.privacy'), path: `/${currentLang}/privacy` },
    { label: t('footer.terms'), path: `/${currentLang}/terms` },
  ];

  return (
    <footer className="bg-foreground text-background" id="main-footer">
      {/* Main footer content */}
      <div className="container-wide pt-10 pb-8 lg:pt-14 lg:pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Column 1: Brand + Contact */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link to={`/${currentLang}`} className="font-heading text-2xl font-bold block">
              Make It <span className="text-neon-pink">Neon</span>
            </Link>
            <p className="text-sm opacity-60 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>

            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-neon-pink" />
                <span>{siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-neon-pink" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-neon-pink" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-neon-pink" />
                <span>{t('footer.workingHours')}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-5 text-background">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-60 hover:opacity-100 hover:text-neon-pink transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-5 text-background">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-60 hover:opacity-100 hover:text-neon-pink transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider mb-5 text-background">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-60 hover:opacity-100 hover:text-neon-pink transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-neon-pink/20 hover:text-neon-pink transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-neon-pink/20 hover:text-neon-pink transition-all duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/10 hover:bg-neon-pink/20 hover:text-neon-pink transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <Separator className="opacity-10" />
      <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground opacity-80">
          © {year} Make It Neon. {t('footer.rights')}
        </p>
        <p className="text-xs text-muted-foreground opacity-80">
          🇨🇭 Made in Switzerland
        </p>
      </div>
    </footer>
  );
}
