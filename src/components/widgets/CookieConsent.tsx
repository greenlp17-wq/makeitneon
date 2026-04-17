/* eslint-disable react-refresh/only-export-components */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

const CONSENT_KEY = 'makeitneon_cookie_consent';

type ConsentStatus = 'accepted' | 'declined' | null;

/**
 * GDPR-compliant cookie consent banner.
 * - Appears at the bottom of the viewport
 * - Accept / Decline buttons
 * - Saves choice to localStorage
 * - Triggers GA4 activation on accept
 */
export function CookieConsent() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<ConsentStatus>(() => {
    return (typeof window !== 'undefined' ? localStorage.getItem(CONSENT_KEY) as ConsentStatus : null) || null;
  });
  const [visible, setVisible] = useState(false);

  // Check existing consent on mount
  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY) as ConsentStatus;
    if (saved) {
      if (saved === 'accepted') {
        enableAnalytics();
      }
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setStatus('accepted');
    setVisible(false);
    enableAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setStatus('declined');
    setVisible(false);
  };

  // Don't render if already decided
  if (status) return null;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[60] p-4
        transition-all duration-700 ease-out
        ${visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-full pointer-events-none'
        }
      `}
      id="cookie-banner"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-4xl mx-auto glass border border-border/50 rounded-2xl p-5 md:p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon + Text */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-neon-warm/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="w-5 h-5 text-neon-warm" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">
                {t('cookies.title')}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('cookies.description')}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-medium
                         border border-border hover:bg-muted transition-colors"
              id="cookie-decline"
            >
              {t('cookies.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-sm font-semibold
                         bg-foreground text-background hover:opacity-90 transition-opacity"
              id="cookie-accept"
            >
              {t('cookies.accept')}
            </button>
          </div>

          {/* Close */}
          <button
            onClick={handleDecline}
            className="absolute top-3 right-3 sm:static p-1.5 rounded-lg hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Analytics Helper ───

function enableAnalytics() {
  const GA_ID = siteConfig.analytics.ga4MeasurementId;

  // Only enable if not already loaded
  if (typeof window.gtag === 'function' || !GA_ID) return;

  // Load gtag.js script
  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
}

// ─── Analytics Event Tracking ───

/**
 * Track a custom event in GA4.
 * Only fires if cookies have been accepted.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  const consent = localStorage.getItem(CONSENT_KEY);
  if (consent !== 'accepted' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

// Predefined events
export const analytics = {
  calculatorUse: (font: string, color: string) =>
    trackEvent('calculator_use', { font, color }),
  orderSubmit: (type: string) =>
    trackEvent('order_submit', { order_type: type }),
  productView: (productName: string, price: number) =>
    trackEvent('product_view', { product_name: productName, price }),
  contactForm: () =>
    trackEvent('contact_form'),
  languageSwitch: (lang: string) =>
    trackEvent('language_switch', { language: lang }),
  blogView: (slug: string) =>
    trackEvent('blog_view', { article_slug: slug }),
};

// ─── Type augmentation ───

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
