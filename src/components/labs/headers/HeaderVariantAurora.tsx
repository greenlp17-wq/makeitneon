import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = ['Home', 'Shop', 'Calculator', 'Rental', 'Portfolio', 'Contact'];

/**
 * Variant 5: Aurora Borealis — Animated gradient sky with organic aurora effect
 * Ultra-minimal white centered nav that floats on top of the aurora.
 * Multi-layer gradient blobs create depth with CSS-only animation.
 * Stars particle overlay.
 */
export function HeaderVariantAurora() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '10%']);
  const auroraScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.3]);

  // Generate CSS stars  
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#020210]">

        {/* ── AURORA GRADIENT LAYERS ── */}
        <motion.div style={{ scale: auroraScale }} className="absolute inset-0 overflow-hidden">
          {/* Base sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020210] via-[#0a0a2e] to-[#060620]" />

          {/* Aurora layer 1 — slow drift */}
          <div
            className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-40"
            style={{
              background: `
                radial-gradient(ellipse 40% 20% at 30% 45%, rgba(0,212,255,0.3) 0%, transparent 70%),
                radial-gradient(ellipse 35% 15% at 60% 40%, rgba(57,255,20,0.2) 0%, transparent 70%),
                radial-gradient(ellipse 30% 25% at 45% 50%, rgba(191,64,255,0.15) 0%, transparent 70%)
              `,
              animation: 'aurora1 25s ease-in-out infinite alternate',
            }}
          />

          {/* Aurora layer 2 — opposite direction */}
          <div
            className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%] opacity-30"
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
            className="absolute w-full h-full opacity-20"
            style={{
              background: `
                linear-gradient(175deg, transparent 30%, rgba(0,212,255,0.15) 40%, rgba(57,255,20,0.1) 50%, rgba(191,64,255,0.1) 60%, transparent 70%)
              `,
              animation: 'aurora3 15s ease-in-out infinite alternate',
            }}
          />

          {/* Stars */}
          <div className="absolute inset-0">
            {stars.map((star) => (
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
        </motion.div>

        {/* ── HEADER — Centered minimal nav ── */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-5"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            {/* Left Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.slice(0, 3).map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5 font-medium"
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Center Logo */}
            <a href="#" className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight text-center shrink-0 mx-4 lg:mx-0">
              Make It <span className="gradient-neon-text">Neon</span>
            </a>

            {/* Right Nav */}
            <div className="flex items-center gap-1">
              <nav className="hidden lg:flex items-center gap-1">
                {NAV_ITEMS.slice(3).map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="px-3 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/5 font-medium"
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <button className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors ml-2">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* ── HERO CONTENT ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/60 text-xs font-medium tracking-wide mb-10 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
            Illuminating Dreams Since 2019
          </motion.div>

          {/* Headline with letter-spacing animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black leading-[0.85]"
            >
              <motion.span
                animate={{ letterSpacing: ['0.02em', '0.08em', '0.02em'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-green to-neon-violet"
              >
                NEON
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-white/30 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Custom neon signs that dance with the northern lights. Born under Swiss stars.
          </motion.p>

          {/* CTAs — outline minimalist style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 font-heading text-sm font-semibold h-14 px-10 rounded-full backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Design Your Sign
            </Button>
            <Button
              size="lg"
              className="bg-transparent hover:bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/20 font-heading text-sm h-14 px-10 rounded-full transition-all duration-300"
            >
              Browse Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/15"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
            >
              <div className="w-1 h-2 rounded-full bg-white/30" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes aurora1 {
          0% { transform: translate(0%, 0%) rotate(0deg); }
          33% { transform: translate(10%, -5%) rotate(2deg); }
          66% { transform: translate(-5%, 3%) rotate(-1deg); }
          100% { transform: translate(8%, -2%) rotate(1.5deg); }
        }
        @keyframes aurora2 {
          0% { transform: translate(0%, 0%) rotate(0deg); }
          50% { transform: translate(-8%, 5%) rotate(-2deg); }
          100% { transform: translate(5%, -3%) rotate(1deg); }
        }
        @keyframes aurora3 {
          0% { transform: translateX(0%) skewX(0deg); opacity: 0.15; }
          50% { transform: translateX(5%) skewX(2deg); opacity: 0.25; }
          100% { transform: translateX(-3%) skewX(-1deg); opacity: 0.2; }
        }
        @keyframes twinkle {
          0% { opacity: var(--tw-opacity, 0.1); transform: scale(1); }
          100% { opacity: calc(var(--tw-opacity, 0.1) * 2.5); transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
