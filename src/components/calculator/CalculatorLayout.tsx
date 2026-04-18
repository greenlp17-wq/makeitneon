import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { useNeonCalculator } from '../../hooks/useNeonCalculator';
import { NeonPreview } from './NeonPreview';
import { CalculatorPanel } from './CalculatorPanel';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export function CalculatorLayout() {
  const calcState = useNeonCalculator();
  const { t, i18n } = useTranslation();
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';

  return (
    <div className="container-wide">
      {/* Page Header */}
      <ScrollReveal direction="up" className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          {t('nav.calculator')}
        </div>
        <h1 className="mb-6">
          {isUK ? (
            <>Створіть свою <span className="gradient-neon-text">Неонову Вивіску</span></>
          ) : isDE ? (
            <>Gestalten Sie Ihr <span className="gradient-neon-text">Neonschild</span></>
          ) : (
            <>Create Your <span className="gradient-neon-text">Custom Neon Sign</span></>
          )}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {isUK
            ? 'Дизайн. Перегляд. Замовлення. — Створіть ідеальну LED вивіску за кілька простих кроків.'
            : isDE
            ? 'Entwerfen. Ansehen. Bestellen. — Erstellen Sie Ihr perfektes LED-Neonschild in wenigen einfachen Schritten.'
            : 'Design it. See it. Order it. — Create your perfect LED neon sign in a few simple steps.'}
        </p>
      </ScrollReveal>

      {/* Two-column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Side: Preview (larger) */}
        <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-24">
          <NeonPreview calcState={calcState} />
        </div>

        {/* Right Side: Controls */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-hidden flex flex-col">
            <CalculatorPanel calcState={calcState} />
          </div>
        </div>
      </div>
    </div>
  );
}
