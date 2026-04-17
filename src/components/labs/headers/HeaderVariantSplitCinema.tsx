import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Shop', href: '#' },
  { label: 'Custom Order', href: '#' },
  { label: 'Rental', href: '#' },
  { label: 'Portfolio', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

/**
 * Variant 2: Split Cinema — Asymmetric 60/40 split-screen layout
 * Left panel: full-bleed product photo. Right panel: dark with oversized typography.
 * Header sits transparently on top with color inversion feel.
 */
export function HeaderVariantSplitCinema() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-5%']);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ['0%', '3%']);
  const overallOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Ticker items
  const tickerItems = ['HANDCRAFTED', 'IN SWITZERLAND', 'SINCE 2019', 'PREMIUM QUALITY', 'FREE DESIGN', '2-YEAR WARRANTY'];

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#060609]">
        <motion.div style={{ opacity: overallOpacity }} className="relative w-full h-full">

          {/* ── HEADER ── */}
          <header className="absolute top-0 left-0 right-0 z-50 px-6 sm:px-10 py-5 flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-heading text-xl font-bold text-white tracking-tight z-10"
            >
              Make It <span className="gradient-neon-text">Neon</span>
            </motion.a>

            {/* Center status ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hidden lg:flex items-center gap-2 text-xs text-white/30 font-medium uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
              Available For Projects
            </motion.div>

            {/* Menu trigger — dot grid style */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group z-10"
            >
              <span className="text-sm font-medium tracking-wider uppercase hidden sm:block">Menu</span>
              <div className="grid grid-cols-2 gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-current transition-transform duration-300 group-hover:scale-125" />
                ))}
              </div>
            </motion.button>
          </header>

          {/* ── SPLIT LAYOUT ── */}
          <div className="h-full flex flex-col lg:flex-row">
            {/* Left Panel — Product Image (60%) */}
            <motion.div
              style={{ x: leftX }}
              className="relative w-full lg:w-[58%] h-[45vh] lg:h-full overflow-hidden"
            >
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="w-full h-full"
              >
                <img
                  src="/images/catalog/love.webp"
                  alt="Neon Love Sign"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#060609]/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#060609]/90 lg:to-transparent" />

              {/* Floating label on image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-8 z-10"
              >
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <span className="text-xs font-heading font-bold text-white uppercase tracking-wider">Featured</span>
                  <span className="w-px h-3 bg-white/20" />
                  <span className="text-xs text-white/60">Love Collection</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Panel — Content (40%) */}
            <motion.div
              style={{ x: rightX }}
              className="relative w-full lg:w-[42%] flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12 lg:py-0"
            >
              {/* Geometric accent */}
              <div className="absolute top-1/4 right-8 w-32 h-32 border border-neon-pink/20 rotate-45 rounded-2xl hidden lg:block" />
              <div className="absolute bottom-1/3 right-16 w-20 h-20 border border-neon-blue/15 rotate-12 rounded-xl hidden lg:block" />

              {/* Tag */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neon-pink text-xs font-bold uppercase tracking-[0.25em] mb-6"
              >
                Swiss Craftsmanship
              </motion.span>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white leading-[1.05] mb-6"
              >
                Light Up
                <br />
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-violet">Story</span>
              </motion.h1>

              {/* Body */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-white/40 text-base sm:text-lg max-w-md mb-10 leading-relaxed"
              >
                Bespoke neon signs that transform spaces and capture emotions. Every piece is a handcrafted story.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-neon-pink hover:text-white font-heading text-sm font-bold h-14 px-8 rounded-xl transition-all duration-300 group"
                >
                  Create Yours
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/15 text-white hover:bg-white/8 font-heading text-sm h-14 px-8 rounded-xl transition-all"
                >
                  View Collection
                </Button>
              </motion.div>

              {/* Vertical ticker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-14 overflow-hidden h-5"
              >
                <motion.div
                  animate={{ y: [0, -(tickerItems.length * 20)] }}
                  transition={{ duration: tickerItems.length * 2.5, repeat: Infinity, ease: 'linear' }}
                  className="flex flex-col"
                >
                  {[...tickerItems, ...tickerItems].map((item, i) => (
                    <span key={i} className="h-5 text-xs text-white/20 font-medium tracking-[0.3em] uppercase">
                      {item}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </div>

      {/* ── FULL-SCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[200] bg-[#0A0A12] flex flex-col"
          >
            {/* Close */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5">
              <span className="font-heading text-xl font-bold text-white">
                Make It <span className="gradient-neon-text">Neon</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium tracking-wider uppercase hidden sm:block">Close</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`group flex items-center justify-between py-4 sm:py-5 border-b border-white/5 transition-all duration-300 ${
                    hoveredLink !== null && hoveredLink !== i ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  <span className="text-3xl sm:text-5xl lg:text-6xl font-heading font-bold text-white group-hover:text-neon-pink transition-colors duration-300">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-white/30 group-hover:text-neon-pink group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
