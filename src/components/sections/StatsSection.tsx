import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap, useGSAP } from '@/lib/animations';
import { Award, Users, Zap, Shield } from 'lucide-react';

const STATS = [
  { icon: Award, valueKey: 'stats.signsValue', labelKey: 'stats.signsLabel' },
  { icon: Users, valueKey: 'stats.clientsValue', labelKey: 'stats.clientsLabel' },
  { icon: Zap, valueKey: 'stats.lifespanValue', labelKey: 'stats.lifespanLabel' },
  { icon: Shield, valueKey: 'stats.warrantyValue', labelKey: 'stats.warrantyLabel' },
];

export function StatsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  // Animate numbers on scroll into view
  useGSAP(
    () => {
      if (!sectionRef.current || !countersRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const items = countersRef.current.querySelectorAll('.stat-item');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="pt-[clamp(4rem,8vw,8rem)] pb-8 lg:pb-12 relative overflow-hidden" id="stats-section">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,45,120,0.06)_0%,transparent_70%)]" />

      <div className="container-tight relative z-10">
        <div ref={countersRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="stat-item text-center p-6 rounded-2xl glass border border-border/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neon-pink/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-neon-pink" />
                </div>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-1">
                  {t(stat.valueKey)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {t(stat.labelKey)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
