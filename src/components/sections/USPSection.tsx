import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { Factory, Globe, Zap, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    icon: Factory,
    titleKey: 'usp.handcrafted',
    descKey: 'usp.handcraftedDesc',
    color: 'neon-pink',
    bgClass: 'bg-neon-pink/10',
    textClass: 'text-neon-pink',
    hoverBorder: 'hover:border-neon-pink/30',
    hoverShadow: 'hover:shadow-[0_0_24px_rgba(255,45,120,0.12)]',
    glowColor: 'rgba(255,45,120,0.10)',
  },
  {
    icon: Globe,
    titleKey: 'usp.shipping',
    descKey: 'usp.shippingDesc',
    color: 'neon-blue',
    bgClass: 'bg-neon-blue/10',
    textClass: 'text-neon-blue',
    hoverBorder: 'hover:border-neon-blue/30',
    hoverShadow: 'hover:shadow-[0_0_24px_rgba(0,212,255,0.12)]',
    glowColor: 'rgba(0,212,255,0.10)',
  },
  {
    icon: Zap,
    titleKey: 'usp.energy',
    descKey: 'usp.energyDesc',
    color: 'neon-green',
    bgClass: 'bg-neon-green/10',
    textClass: 'text-neon-green',
    hoverBorder: 'hover:border-neon-green/30',
    hoverShadow: 'hover:shadow-[0_0_24px_rgba(57,255,20,0.12)]',
    glowColor: 'rgba(57,255,20,0.10)',
  },
  {
    icon: ShieldCheck,
    titleKey: 'usp.warranty',
    descKey: 'usp.warrantyDesc',
    color: 'neon-warm',
    bgClass: 'bg-neon-warm/10',
    textClass: 'text-neon-warm',
    hoverBorder: 'hover:border-neon-warm/30',
    hoverShadow: 'hover:shadow-[0_0_24px_rgba(255,184,0,0.12)]',
    glowColor: 'rgba(255,184,0,0.10)',
  },
];

export function USPSection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-background relative overflow-hidden" id="usp-section">
      {/* Dynamic light blobs */}
      <div className="absolute top-0 right-[-20%] w-[60%] h-[60%] bg-neon-pink/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-[-15%] w-[40%] h-[40%] bg-neon-blue/6 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-tight relative z-10">
        <ScrollReveal direction="up" className="text-center mb-16">
          <h2 className="mb-4">{t('usp.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('usp.subtitle')}
          </p>
        </ScrollReveal>

        <StaggerGroup
          childSelector=".usp-card"
          staggerAmount={0.15}
          direction="up"
          distance={40}
          className="grid sm:grid-cols-2 gap-6"
        >
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={`usp-card glass p-8 rounded-2xl flex flex-col gap-4 border border-border/50 
                ${feature.hoverBorder} ${feature.hoverShadow} 
                transition-all duration-300 group cursor-default`}
              id={`usp-card-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgClass} flex items-center justify-center ${feature.textClass} 
                group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
