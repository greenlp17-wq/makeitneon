import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { label: 'Home', href: '#', image: '/images/catalog/hello.webp' },
  { label: 'Shop', href: '#', image: '/images/catalog/good-vibes.webp' },
  { label: 'Custom Order', href: '#', image: '/images/catalog/create.webp' },
  { label: 'Rental', href: '#', image: '/images/catalog/cheers.webp' },
  { label: 'Portfolio', href: '#', image: '/images/catalog/love.webp' },
  { label: 'About', href: '#', image: '/images/catalog/dream-big.webp' },
  { label: 'Contact', href: '#', image: '/images/catalog/welcome.webp' },
];

const HERO_IMAGES = [
  '/images/catalog/love.webp',
  '/images/catalog/good-vibes.webp',
  '/images/catalog/hello.webp',
  '/images/catalog/dream-big.webp',
];

/**
 * Variant 4: Curtain Reveal — Full-screen menu with dramatic entrance
 * Minimal header with just logo and "Menu" text. Full-screen overlay with
 * large nav links that show thumbnail previews on hover.
 * Hero cycles through images with Ken Burns effect.
 */
export function HeaderVariantCurtainReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Ken Burns image cycling
  useState(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#060609]">

        {/* ── MINIMAL HEADER ── */}
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-6">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight"
          >
            Make It <span className="gradient-neon-text">Neon</span>
          </motion.a>

          {/* Menu trigger */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300 group"
          >
            <span className="text-sm font-heading font-semibold tracking-wider uppercase">
              Menu
            </span>
            <div className="relative w-8 h-5 flex flex-col justify-between">
              <span className="block h-[2px] w-full bg-current transition-transform duration-300 group-hover:translate-x-1" />
              <span className="block h-[2px] w-3/4 bg-current transition-transform duration-300 group-hover:w-full ml-auto" />
            </div>
          </motion.button>
        </header>

        {/* ── HERO WITH KEN BURNS IMAGES ── */}
        <motion.div style={{ opacity: heroOpacity }} className="relative w-full h-full">
          {/* Image Layer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <motion.img
                src={HERO_IMAGES[currentImage]}
                alt="Neon"
                className="w-full h-full object-cover"
                animate={{ scale: [1, 1.08] }}
                transition={{ duration: 5, ease: 'linear' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-transparent to-[#060609]/50" />

          {/* Curtain wipe entrance overlay */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'top' }}
            className="absolute inset-0 bg-[#060609] z-30"
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            {/* Elegant serif-inspired headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mb-2"
            >
              <span className="text-xs sm:text-sm text-white/30 font-medium tracking-[0.4em] uppercase">
                Handcrafted in Switzerland
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-black text-white leading-[0.85] mb-6 tracking-tighter"
            >
              <span className="block">MAKE</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: '2px rgba(255,45,120,0.7)' }}>
                IT
              </span>
              <span className="block gradient-neon-text">NEON</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="text-white/30 text-sm sm:text-base max-w-md mb-10 leading-relaxed"
            >
              Transform any space with custom neon artistry. From concept to creation in 48 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="bg-white text-black hover:bg-neon-pink hover:text-white font-heading text-sm font-bold h-14 px-10 rounded-full transition-all duration-500">
                Design Your Sign
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-10 rounded-full font-heading text-sm transition-all">
                Explore Gallery
              </Button>
            </motion.div>

            {/* Image counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="absolute bottom-10 flex items-center gap-2"
            >
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    i === currentImage ? 'w-8 bg-neon-pink' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30" />
      </div>

      {/* ── FULL-SCREEN MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-[#0A0A12] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-6 shrink-0">
              <span className="font-heading text-xl sm:text-2xl font-bold text-white">
                Make It <span className="gradient-neon-text">Neon</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              >
                <span className="text-sm font-heading font-semibold tracking-wider uppercase hidden sm:block">Close</span>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links + Preview */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Links */}
              <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    onMouseEnter={() => setHoveredLink(i)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`group flex items-center justify-between py-3 sm:py-4 border-b border-white/5 transition-all duration-300 ${
                      hoveredLink !== null && hoveredLink !== i ? 'opacity-20' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono text-white/20 w-6">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-white group-hover:text-neon-pink transition-colors duration-300">
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/20 group-hover:text-neon-pink group-hover:rotate-45 transition-all duration-300" />
                  </motion.a>
                ))}
              </div>

              {/* Image Preview (desktop) */}
              <div className="hidden lg:flex w-[40%] items-center justify-center p-12 relative">
                <AnimatePresence mode="wait">
                  {hoveredLink !== null && (
                    <motion.div
                      key={hoveredLink}
                      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                      <img
                        src={NAV_LINKS[hoveredLink].image}
                        alt={NAV_LINKS[hoveredLink].label}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                {hoveredLink === null && (
                  <div className="text-white/10 text-sm font-mono tracking-wider uppercase">
                    Hover a link
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
