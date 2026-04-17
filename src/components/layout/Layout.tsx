import { useEffect, useRef } from 'react';
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

  // Refresh GSAP ScrollTrigger after route change
  // Track previous pathname to differentiate initial mount from navigation
  const prevPathname = useRef(location.pathname);
  useEffect(() => {
    const isNavigation = prevPathname.current !== location.pathname;
    prevPathname.current = location.pathname;

    if (isNavigation) {
      // On route change: kill old triggers, wait for new DOM, then refresh
      ScrollTrigger.getAll().forEach(st => st.kill());
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          window.scrollTo(0, 0);
        });
      });
      return () => cancelAnimationFrame(raf);
    } else {
      // On initial load (or StrictMode re-run): just refresh, don't kill
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(timer);
    }
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
