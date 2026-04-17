import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../components/calculator/CalculatorLayout';
import { SEO } from '@/components/seo/SEO';

export default function CalculatorPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('pages.calculator.title')}
        description={t('pages.calculator.description')}
      />
        <section className="section-padding">
          <CalculatorLayout />
        </section>
    </>
  );
}
