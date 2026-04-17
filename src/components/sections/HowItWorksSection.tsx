import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { gsap, useGSAP } from '@/lib/animations';
import {
  Palette, FileCheck, Hammer, PackageCheck, Truck, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const STEP_ICONS = [Palette, FileCheck, Hammer, PackageCheck, Truck];

export function HowItWorksSection() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const steps = [
    { num: '01', titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Desc' },
    { num: '02', titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Desc' },
    { num: '03', titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Desc' },
    { num: '04', titleKey: 'howItWorks.step4Title', descKey: 'howItWorks.step4Desc' },
    { num: '05', titleKey: 'howItWorks.step5Title', descKey: 'howItWorks.step5Desc' },
  ];

  // Draw the connecting line down based on scroll
  useGSAP(
    () => {
      if (!sectionRef.current || !lineRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section-padding bg-muted/30 pb-32" id="how-it-works-section">
      <div className="container-tight">
        <ScrollReveal className="text-center mb-20">
          <h2 className="mb-4">{t('howItWorks.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('howItWorks.subtitle')}</p>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto pl-8 sm:pl-16">
          {/* Animated Progress Line */}
          <div className="absolute left-[39px] sm:left-[71px] top-4 bottom-4 w-1 bg-border rounded-full overflow-hidden">
            <div
              ref={lineRef}
              className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-neon-pink via-neon-violet to-neon-blue origin-top will-change-transform"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16 relative z-10">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <ScrollReveal direction="left" distance={40} delay={0.1} key={i}>
                  <div className="relative">
                    {/* Step Number Badge */}
                    <div className="absolute -left-[56px] sm:-left-[88px] top-[-8px] w-10 h-10 rounded-full bg-background border-2 border-neon-pink flex items-center justify-center font-heading font-bold text-neon-pink shadow-md z-10">
                      {step.num}
                    </div>
                    
                    <div className="bg-background border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-neon-pink/10 flex items-center justify-center text-neon-pink">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-2xl font-bold font-heading">{t(step.titleKey)}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center mt-16">
          <Button
            render={<Link to={`/${currentLang}/calculator`} />}
            size="lg"
            className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm font-semibold
                       shadow-[0_0_20px_rgba(255,45,120,0.3)] hover:shadow-[0_0_32px_rgba(255,45,120,0.5)]
                       transition-all duration-300 group"
            id="how-it-works-cta"
          >
            {t('howItWorks.cta')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
