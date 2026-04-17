import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#' },
  { label: 'Calculator', href: '#' },
  { label: 'Rental', href: '#' },
  { label: 'Portfolio', href: '#' },
  { label: 'Contact', href: '#' },
];

/**
 * Variant 1: Liquid Glass — Morphing glassmorphism pill nav
 * Header starts as a compact centered pill, expands to full-width frosted bar on scroll.
 * Hero has animated gradient mesh background with large clipped typography.
 */
export function HeaderVariantLiquidGlass() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], ['0%', '8%']);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setScrolled(v > 0.02);
  });

  // Letter-by-letter stagger for the headline
  const headline = 'Make It Neon';
  const letters = headline.split('');

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* ── STICKY HEADER ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        style={{ paddingTop: scrolled ? 8 : 20 }}
      >
        <motion.nav
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'w-full max-w-full mx-0 px-6 sm:px-10 py-3 bg-black/50 backdrop-blur-2xl border-b border-white/8'
              : 'w-auto max-w-3xl mx-auto px-3 py-2 bg-white/8 backdrop-blur-xl border border-white/12 rounded-2xl shadow-2xl'
          }`}
        >
          {/* Logo */}
          <Link to="#" className="font-heading text-lg sm:text-xl font-bold text-white tracking-tight shrink-0">
            Make It <span className="gradient-neon-text">Neon</span>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-1 ${scrolled ? 'ml-8' : 'ml-6'}`}>
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/8 group"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-neon-pink group-hover:w-4/5 transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(255,45,120,0.6)]" />
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-2 ${scrolled ? 'ml-auto' : 'ml-6'}`}>
            <button className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors">
              <ShoppingBag className="w-4 h-4" />
            </button>
            <Button
              size="sm"
              className="hidden sm:inline-flex bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-xs font-semibold tracking-wide shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)] transition-all h-8 px-4 rounded-xl"
            >
              Order Now
            </Button>
            <button
              className="lg:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="pointer-events-auto fixed top-16 left-4 right-4 bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/10 p-4 flex flex-col gap-2 lg:hidden z-[101]"
            >
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/8 rounded-xl transition-colors font-medium text-sm">
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO SECTION ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#060609]">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute w-[120vw] h-[120vh] -top-[10vh] -left-[10vw]"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 20% 50%, rgba(255,45,120,0.15) 0%, transparent 70%),
                radial-gradient(ellipse 50% 60% at 80% 30%, rgba(0,212,255,0.12) 0%, transparent 70%),
                radial-gradient(ellipse 40% 50% at 50% 80%, rgba(191,64,255,0.1) 0%, transparent 70%)
              `,
              animation: 'meshFloat 20s ease-in-out infinite',
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-pink text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Swiss Handcrafted Since 2019
          </motion.div>

          {/* Headline with letter stagger */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black leading-[0.9] mb-6">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: 0.5 + i * 0.04,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                className={`inline-block ${
                  letter === ' '
                    ? 'w-4 sm:w-6 md:w-8'
                    : i >= 8
                    ? 'text-transparent bg-clip-text bg-gradient-to-br from-neon-pink via-neon-violet to-neon-blue'
                    : 'text-white'
                }`}
                style={{ perspective: '600px' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-white/40 max-w-xl mx-auto mb-10"
          >
            Custom neon signs handcrafted in Switzerland. Design your vision, we bring it to light.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm font-bold h-14 px-8 rounded-xl shadow-[0_0_30px_rgba(255,45,120,0.3)] hover:shadow-[0_0_50px_rgba(255,45,120,0.5)] hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Design Your Sign
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/15 text-white hover:bg-white/8 font-heading text-sm font-semibold h-14 px-8 rounded-xl backdrop-blur-sm hover:border-white/30 transition-all duration-300"
            >
              Browse Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-14 flex flex-wrap justify-center gap-6 text-white/25 text-xs font-medium"
          >
            <span>✓ Free Design Mockup</span>
            <span>✓ 2-Year Warranty</span>
            <span>✓ 100% Handcrafted</span>
          </motion.div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      {/* Keyframes for gradient mesh */}
      <style>{`
        @keyframes meshFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(2%, -3%) rotate(1deg) scale(1.02); }
          50% { transform: translate(-1%, 2%) rotate(-0.5deg) scale(0.98); }
          75% { transform: translate(3%, 1%) rotate(0.5deg) scale(1.01); }
        }
      `}</style>
    </div>
  );
}
