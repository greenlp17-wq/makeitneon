import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, Wifi, Clock, Shield, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TOP_BAR_ITEMS = [
  { icon: Wifi, label: 'Online', color: 'text-neon-green' },
  { icon: Clock, label: '24/7 Support', color: 'text-neon-blue' },
  { icon: Shield, label: 'Secure Checkout', color: 'text-neon-violet' },
];

const NAV_ITEMS = [
  'Home', 'Shop', 'Calculator', 'Rental', 'Portfolio', 'Contact',
];

const STATS = [
  { value: '500+', label: 'Signs Crafted', icon: Zap },
  { value: '98%', label: 'Satisfaction', icon: Star },
  { value: '24h', label: 'Free Mockup', icon: Clock },
];

function useCounter(end: number, duration: number = 2000, delay: number = 500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = end / (duration / 16);
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [end, duration, delay]);
  return count;
}

/**
 * Variant 3: Hex Grid — Futuristic HUD dashboard aesthetic
 * Thin status bar on top + main nav with hexagonal logo.
 * Hero has animated hex grid background, central card with neon border trace.
 */
export function HeaderVariantHexGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNav, setActiveNav] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '5%']);

  const signsCount = useCounter(500, 2000, 800);
  const satisfactionCount = useCounter(98, 1800, 1000);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050508]">

        {/* ── TOP STATUS BAR ── */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute top-0 left-0 right-0 z-50 h-8 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-8"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            {TOP_BAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/40 font-mono uppercase tracking-wider">
                  <Icon className={`w-3 h-3 ${item.color}`} />
                  <span className="hidden sm:inline">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="text-[10px] text-white/20 font-mono tracking-wider hidden sm:block">
            SYS.ONLINE — v3.2.1
          </div>
        </motion.div>

        {/* ── MAIN NAV ── */}
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute top-8 left-0 right-0 z-50 h-14 border-b border-white/[0.06] flex items-center px-4 sm:px-8"
        >
          {/* Hex Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <svg viewBox="0 0 40 44" className="w-8 h-8 sm:w-9 sm:h-9">
                <polygon
                  points="20,0 40,11 40,33 20,44 0,33 0,11"
                  fill="none"
                  stroke="rgba(255,45,120,0.5)"
                  strokeWidth="1.5"
                  className="animate-pulse"
                />
                <polygon
                  points="20,6 34,14 34,30 20,38 6,30 6,14"
                  fill="rgba(255,45,120,0.1)"
                  stroke="rgba(255,45,120,0.3)"
                  strokeWidth="0.5"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-heading font-black text-neon-pink">N</span>
            </div>
            <span className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
              Make It <span className="text-neon-pink">Neon</span>
            </span>
          </div>

          {/* Connector line */}
          <div className="hidden lg:block flex-1 h-px mx-6 bg-gradient-to-r from-white/10 via-neon-pink/20 to-white/10 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neon-pink rounded-full shadow-[0_0_6px_rgba(255,45,120,0.6)]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-neon-pink/30 rounded-full" />
          </div>

          {/* Nav items */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item}
                onClick={() => setActiveNav(i)}
                className={`relative px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-all rounded ${
                  activeNav === i
                    ? 'text-neon-pink bg-neon-pink/10 border border-neon-pink/20'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
                }`}
              >
                {activeNav === i && (
                  <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-[3px] h-3 bg-neon-pink rounded-full shadow-[0_0_6px_rgba(255,45,120,0.6)]" />
                )}
                {item}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-3">
            <Button
              size="sm"
              className="bg-neon-pink/10 hover:bg-neon-pink/20 text-neon-pink border border-neon-pink/30 font-mono text-[11px] uppercase tracking-wider h-8 px-4 rounded transition-all"
            >
              Order Now
            </Button>
          </div>
        </motion.header>

        {/* ── HEX GRID BACKGROUND ── */}
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
                <polygon points="24,0 48,14 48,42 24,56 0,42 0,14" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                <polygon points="24,44 48,58 48,86 24,100 0,86 0,58" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" />
          </svg>

          {/* Gradient accents */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-neon-blue/5 rounded-full blur-[100px]" />
        </div>

        {/* ── HERO CONTENT ── */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 h-full flex items-center justify-center px-4 pt-20"
        >
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center">

            {/* Left — Text content */}
            <div className="lg:col-span-2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neon-pink/10 border border-neon-pink/20 text-neon-pink text-[10px] font-mono uppercase tracking-widest mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-pink animate-pulse" />
                New Collection
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] mb-5"
              >
                Precision
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-blue">Engineered</span>
                <br />
                Light
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-white/35 text-sm sm:text-base mb-8 max-w-sm mx-auto lg:mx-0"
              >
                Every sign is meticulously crafted with aerospace-grade components and Swiss precision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Button className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm h-12 px-6 rounded-lg shadow-[0_0_20px_rgba(255,45,120,0.2)]">
                  <Sparkles className="w-4 h-4 mr-2" /> Configure Sign
                </Button>
                <Button variant="outline" className="border-white/10 text-white/70 hover:bg-white/5 h-12 px-6 rounded-lg font-mono text-xs uppercase tracking-wider">
                  View Specs <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Center — Hero Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, type: 'spring' }}
              className="lg:col-span-2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group aspect-[3/4] max-h-[500px] mx-auto">
                {/* Animated border trace */}
                <div className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,45,120,0.5) 0%, transparent 50%, rgba(0,212,255,0.5) 100%)',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '1px',
                  }}
                />
                <img
                  src="/images/catalog/good-vibes.webp"
                  alt="Good Vibes Neon"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Product info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="font-heading text-xl font-bold text-white mb-1">Good Vibes</h3>
                  <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
                    <span>CHF 189</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>50cm × 30cm</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-3 -right-3 sm:-right-6 px-3 py-2 rounded-xl bg-neon-green/10 border border-neon-green/20 text-neon-green text-[10px] font-mono uppercase tracking-wider shadow-xl"
              >
                ✓ In Stock
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -bottom-3 -left-3 sm:-left-6 px-3 py-2 rounded-xl bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-[10px] font-mono uppercase tracking-wider shadow-xl"
              >
                ⚡ Fast Ship
              </motion.div>
            </motion.div>

            {/* Right — Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-1 flex flex-row lg:flex-col gap-4 justify-center"
            >
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                const displayValue = stat.value.includes('+')
                  ? `${signsCount}+`
                  : stat.value.includes('%')
                  ? `${satisfactionCount}%`
                  : stat.value;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.15 }}
                    className="text-center lg:text-left p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors flex-1"
                  >
                    <Icon className="w-4 h-4 text-neon-pink mb-2 mx-auto lg:mx-0" />
                    <div className="text-2xl sm:text-3xl font-heading font-bold text-white mb-0.5 font-mono">
                      {displayValue}
                    </div>
                    <div className="text-[10px] text-white/30 uppercase tracking-wider font-mono">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none z-30 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </div>
    </div>
  );
}
