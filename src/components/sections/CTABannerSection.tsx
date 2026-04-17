import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTABannerSection() {
  const { i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';

  return (
    <section className="py-16 sm:py-20 bg-calc-bg relative overflow-hidden" id="cta-banner">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,45,120,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(0,212,255,0.06)_0%,transparent_60%)]" />

      <div className="container-tight relative z-10">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {isDE ? 'Kostenloses Design-Mockup' : 'Free Design Mockup'}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            {isDE
              ? 'Bereit für Ihr eigenes Neonschild?'
              : 'Ready for Your Own Neon Sign?'}
          </h2>

          <p className="text-lg text-white/50 mb-8 max-w-xl mx-auto">
            {isDE
              ? 'Gestalten Sie Ihr individuelles LED-Neonschild und erhalten Sie innerhalb von 24 Stunden ein kostenloses Foto-Mockup.'
              : 'Design your custom LED neon sign and get a free photo mockup within 24 hours. No commitment required.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              render={<Link to={`/${currentLang}/calculator`} />}
              size="lg"
              className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm font-bold
                         h-13 px-8 shadow-[0_0_24px_rgba(255,45,120,0.4)] hover:shadow-[0_0_40px_rgba(255,45,120,0.6)]
                         transition-all duration-300 rounded-xl hover:scale-105"
              id="cta-banner-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isDE ? 'Jetzt gestalten' : 'Design Your Sign'}
            </Button>

            <Button
              render={<Link to={`/${currentLang}/shop`} />}
              variant="outline"
              size="lg"
              className="bg-transparent border-white/20 text-white hover:bg-white/10 font-heading text-sm font-semibold
                         h-13 px-8 rounded-xl backdrop-blur-sm hover:border-white/40 transition-all duration-300"
              id="cta-banner-secondary"
            >
              {isDE ? 'Kollektion ansehen' : 'Browse Collection'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Trust line */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/30 text-xs font-medium">
            <span>✓ {isDE ? 'Kostenloses Mockup' : 'Free design mockup'}</span>
            <span>✓ {isDE ? '2 Jahre Garantie' : '2 year warranty'}</span>
            <span>✓ {isDE ? 'Antwort in 24h' : 'Response within 24h'}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
