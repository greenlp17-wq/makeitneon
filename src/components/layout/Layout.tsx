import { useEffect } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollTrigger } from '@/lib/animations';
import { WhatsAppButton } from '@/components/widgets/WhatsAppButton';
import { ScrollToTop } from '@/components/widgets/ScrollToTop';
import { CookieConsent } from '@/components/widgets/CookieConsent';

export function Layout() {
  const { lang } = useParams();
  const { i18n } = useTranslation();

  const location = useLocation();

  // Sync URL language param with i18n
  useEffect(() => {
    if (lang && lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Disable browser's automatic scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Handle route changes gracefully (scroll to top + soft refresh GSAP)
  useEffect(() => {
    // Scroll instantly to top immediately on route change
    window.scrollTo(0, 0);

    // Refresh ScrollTrigger after a slight delay to allow layout to settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet key={location.pathname} />
      </main>
      <Footer />

      {/* Global Widgets */}
      <WhatsAppButton />
      <ScrollToTop />
      <CookieConsent />
    </div>
  );
}
