import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap, useGSAP } from '@/lib/animations';

/**
 * Hero Section — Aurora Borealis style.
 *
 * Multi-layer animated gradient sky with twinkling CSS stars.
 * Large "MAKE IT / NEON" typography with breathing letter-spacing.
 * Keeps existing i18n translations, links, and GSAP scroll parallax.
 * The site's main Header sits on top (unchanged).
 */

// Pre-generate stars once (stable across re-renders)
function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));
}

const STARS = generateStars(80);

export function HeroSection() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax fade on scroll (desktop only, respects reduced motion)
  useGSAP(
    () => {
      if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      if (isMobile) {
        gsap.set(bgRef.current, { clearProps: 'all' });
        gsap.set(contentRef.current, { clearProps: 'all' });
        return;
      }

      gsap.set(bgRef.current, { y: '0%', opacity: 1, scale: 1 });
      gsap.set(contentRef.current, { y: '0%', opacity: 1 });

      // Aurora background parallax + scale up on scroll
      gsap.to(bgRef.current, {
        y: '15%',
        scale: 1.2,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content drifts up faster (depth illusion)
      gsap.to(contentRef.current, {
        y: '-12%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden -mt-20"
      id="hero"
    >
      {/* ── Base dark sky ── */}
      <div className="absolute inset-0 bg-[#020210]" />

      {/* ── Aurora Background ── */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Base sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020210] via-[#0a0a2e] to-[#060620]" />

        {/* Aurora layer 1 — slow drift */}
        <div
          className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 50% 35% at 25% 50%, rgba(0,212,255,0.28) 0%, transparent 70%),
              radial-gradient(ellipse 40% 20% at 30% 45%, rgba(0,212,255,0.3) 0%, transparent 70%),
              radial-gradient(ellipse 35% 15% at 60% 40%, rgba(57,255,20,0.2) 0%, transparent 70%),
              radial-gradient(ellipse 30% 25% at 45% 50%, rgba(191,64,255,0.15) 0%, transparent 70%)
            `,
            animation: 'aurora1 25s ease-in-out infinite alternate',
          }}
        />

        {/* Aurora layer 2 — opposite direction */}
        <div
          className="absolute w-[300%] h-[300%] -top-[100%] -left-[100%] opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 50% 20% at 70% 35%, rgba(255,45,120,0.2) 0%, transparent 70%),
              radial-gradient(ellipse 40% 30% at 35% 55%, rgba(0,212,255,0.25) 0%, transparent 70%)
            `,
            animation: 'aurora2 20s ease-in-out infinite alternate-reverse',
          }}
        />

        {/* Aurora layer 3 — vertical shimmer */}
        <div
          className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%] opacity-20"
          style={{
            background: `
              linear-gradient(175deg, transparent 30%, rgba(0,212,255,0.15) 40%, rgba(57,255,20,0.1) 50%, rgba(191,64,255,0.1) 60%, transparent 70%)
            `,
            animation: 'aurora3 15s ease-in-out infinite alternate',
          }}
        />

        {/* Stars */}
        <div className="absolute inset-0">
          {STARS.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Content overlay ── */}
      <div ref={contentRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-24 sm:mt-32 pointer-events-none">


        {/* "MAKE IT" — large heading */}
        <div className="overflow-hidden mb-4 sm:mb-6">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black text-white leading-[0.9]"
          >
            <motion.span
              animate={{ letterSpacing: ['0em', '0.05em', '0em'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="block"
            >
              MAKE IT
            </motion.span>
          </motion.h1>
        </div>

        {/* "NEON" — gradient heading */}
        <div className="overflow-hidden mb-8 sm:mb-10">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black leading-[0.85]"
          >
            <motion.span
              animate={{ letterSpacing: ['0.02em', '0.08em', '0.02em'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="block gradient-neon-text"
            >
              NEON
            </motion.span>
          </motion.h1>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 text-white/40 text-sm sm:text-base font-medium mb-10 mx-auto max-w-2xl"
        >
          <span className="flex items-center gap-1.5">✓ {t('common.freeDesign')}</span>
          <span className="flex items-center gap-1.5">✓ {t('common.warranty')}</span>
          <span className="flex items-center gap-1.5">✓ {currentLang === 'de' ? 'Weltweiter Versand' : 'Delivered worldwide'}</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
        >
          <Button
            render={<Link to={`/${currentLang}/calculator`} />}
            size="lg"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40
                       font-heading text-sm font-semibold h-14 px-10 rounded-full backdrop-blur-sm
                       transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]
                       hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:scale-[1.02]"
            id="hero-cta-primary"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {t('hero.cta_primary')}
          </Button>

          <Button
            render={<Link to={`/${currentLang}/shop`} />}
            variant="outline"
            size="lg"
            className="bg-transparent hover:bg-white/5 text-white/60 hover:text-white
                       border border-white/10 hover:border-white/20
                       font-heading text-sm h-14 px-10 rounded-full transition-all duration-300"
            id="hero-cta-secondary"
          >
            {t('hero.cta_secondary')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>


      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
      >
        <div
          className="flex flex-col items-center gap-3 text-[#020210]/60 hover:text-[#020210] transition-colors cursor-pointer"
          onClick={() => {
            const nextSection = sectionRef.current?.nextElementSibling;
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-[#020210]/40 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-[#020210]/60" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Bottom gradient fade into light site ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[138px] bg-gradient-to-t from-background to-background/0 z-[5]" />
    </section>
  );
}
