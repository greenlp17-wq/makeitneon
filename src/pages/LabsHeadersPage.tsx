import { useState, useEffect } from 'react';
import { HeaderVariantLiquidGlass } from '@/components/labs/headers/HeaderVariantLiquidGlass';
import { HeaderVariantSplitCinema } from '@/components/labs/headers/HeaderVariantSplitCinema';
import { HeaderVariantHexGrid } from '@/components/labs/headers/HeaderVariantHexGrid';
import { HeaderVariantCurtainReveal } from '@/components/labs/headers/HeaderVariantCurtainReveal';
import { HeaderVariantAurora } from '@/components/labs/headers/HeaderVariantAurora';
import { Droplets, Film, Hexagon, Theater, Orbit } from 'lucide-react';

const VARIANTS = [
  { id: 'liquid', title: 'Liquid Glass', icon: Droplets, component: HeaderVariantLiquidGlass },
  { id: 'cinema', title: 'Split Cinema', icon: Film, component: HeaderVariantSplitCinema },
  { id: 'hex', title: 'Hex Grid', icon: Hexagon, component: HeaderVariantHexGrid },
  { id: 'curtain', title: 'Curtain Reveal', icon: Theater, component: HeaderVariantCurtainReveal },
  { id: 'aurora', title: 'Aurora', icon: Orbit, component: HeaderVariantAurora },
];

export default function LabsHeadersPage() {
  const [activeId, setActiveId] = useState(VARIANTS[0].id);

  // Hide the site's main header, footer, and global widgets on this page
  useEffect(() => {
    const header = document.getElementById('main-header');
    const mainEl = header?.closest('.min-h-screen')?.querySelector('main');
    const footer = document.querySelector('footer');

    
    // Hide header
    if (header) header.style.display = 'none';
    // Remove main padding-top that compensates for header
    if (mainEl) (mainEl as HTMLElement).style.paddingTop = '0';
    // Hide footer
    if (footer) (footer as HTMLElement).style.display = 'none';
    
    return () => {
      if (header) header.style.display = '';
      if (mainEl) (mainEl as HTMLElement).style.paddingTop = '';
      if (footer) (footer as HTMLElement).style.display = '';
    };
  }, []);

  // Auto-scroll to top when variant changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeId]);

  const ActiveComponent = VARIANTS.find(v => v.id === activeId)?.component || HeaderVariantLiquidGlass;

  return (
    <div className="relative min-h-screen bg-background -mt-20">

      {/* ── EXPERIMENTAL BADGE ── */}
      <div className="fixed top-4 right-4 z-[60] pointer-events-none">
        <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-2xl">
          ⬡ Header Lab
        </div>
      </div>

      {/* ── RENDER ACTIVE HEADER+HERO ── */}
      <div key={activeId} className="animate-in fade-in duration-500">
        <ActiveComponent />
      </div>

      {/* ── DUMMY SCROLL CONTENT ── */}
      <div className="min-h-[50vh] bg-background border-t border-border/20 flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-heading font-bold mb-4 opacity-30">Page Content Below</h2>
        <p className="text-muted-foreground max-w-lg text-center opacity-50">
          This section represents the rest of the page. Scroll up to see how the header transitions and behaves.
        </p>
      </div>

      {/* ── CONTROLLER (FIXED BOTTOM) ── */}
      <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] sm:w-auto">
        <div className="bg-black/70 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl shadow-2xl overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {VARIANTS.map(variant => {
              const Icon = variant.icon;
              const isActive = activeId === variant.id;

              return (
                <button
                  key={variant.id}
                  onClick={() => setActiveId(variant.id)}
                  className={`flex items-center justify-center gap-2 px-4 h-10 rounded-xl font-heading text-sm font-semibold transition-all duration-300 whitespace-nowrap
                    ${isActive
                      ? 'bg-gradient-to-r from-neon-pink to-neon-violet text-white shadow-[0_0_20px_rgba(255,45,120,0.3)]'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {variant.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
