import { useTranslation } from 'react-i18next';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { FeaturedProductsSection } from '@/components/sections/FeaturedProductsSection';
import { USPSection } from '@/components/sections/USPSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTABannerSection } from '@/components/sections/CTABannerSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { SEO, LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA } from '@/components/seo/SEO';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('pages.home.title')}
        description={t('pages.home.description')}
        jsonLd={[LOCAL_BUSINESS_SCHEMA, WEBSITE_SCHEMA]}
      />

      {/* 3D Hero Section */}
      <HeroSection />

      {/* Stats Counter — 500+ signs, 98% satisfaction */}
      <StatsSection />

      {/* Featured Bestsellers with prices */}
      <FeaturedProductsSection />

      {/* Why Choose Make It Neon? */}
      <USPSection />

      {/* How It Works — 5 Steps */}
      <HowItWorksSection />

      {/* Portfolio Carousel */}
      <PortfolioSection />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner — final conversion push */}
      <CTABannerSection />

      {/* FAQ Preview */}
      <FAQSection />
    </>
  );
}
