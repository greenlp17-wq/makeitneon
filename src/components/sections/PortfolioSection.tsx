import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Portfolio items with CSS gradient-based neon sign visuals
const PORTFOLIO_ITEMS = [
  { id: 'cafe_zurich', neonText: 'Café', gradient: 'from-amber-400 to-orange-500', bg: 'bg-stone-900', image: '/images/portfolio/cafe.webp' },
  { id: 'bar_lucerne', neonText: 'BAR', gradient: 'from-blue-400 to-cyan-400', bg: 'bg-slate-900', image: '/images/portfolio/bar.webp' },
  { id: 'wedding_bern', neonText: 'Better Together', gradient: 'from-pink-300 to-rose-400', bg: 'bg-neutral-900', image: '/images/portfolio/wedding.webp' },
  { id: 'home_office', neonText: 'Dream Big', gradient: 'from-violet-400 to-purple-500', bg: 'bg-zinc-900', image: '/images/portfolio/home_office.webp' },
  { id: 'salon_geneva', neonText: 'Beauty', gradient: 'from-pink-400 to-fuchsia-400', bg: 'bg-stone-900', image: '/images/portfolio/salon.webp' },
  { id: 'restaurant_zug', neonText: 'Welcome', gradient: 'from-amber-200 to-yellow-300', bg: 'bg-neutral-900', image: '/images/portfolio/hotel.webp' },
  { id: 'bedroom_modern', neonText: 'Sweet Dreams', gradient: 'from-purple-300 to-indigo-400', bg: 'bg-slate-900', image: '/images/portfolio/bedroom_modern.webp' },
  { id: 'wedding_outdoor', neonText: 'I Do', gradient: 'from-rose-300 to-pink-300', bg: 'bg-zinc-900', image: '/images/portfolio/wedding_outdoor.webp' },
  { id: 'gym_motivation', neonText: 'HUSTLE', gradient: 'from-red-400 to-orange-500', bg: 'bg-stone-900', image: '/images/portfolio/gym_motivation.webp' },
  { id: 'office_startup', neonText: 'Create', gradient: 'from-cyan-400 to-teal-400', bg: 'bg-neutral-900', image: '/images/portfolio/office_startup.webp' },
];

function NeonCard({ item, neonText, gradient, bg, image }: { 
  item: string; 
  neonText: string; 
  gradient: string; 
  bg: string;
  image?: string;
}) {
  const { t } = useTranslation();
  const title = t(`portfolio.items.${item}.title`);
  const category = t(`portfolio.items.${item}.category`);
  const location = t(`portfolio.items.${item}.location`);

  return (
    <div 
      className={`relative flex-shrink-0 w-[300px] h-[220px] rounded-2xl ${bg} overflow-hidden group cursor-pointer`}
      id={`portfolio-card-${item}`}
    >
      {/* Neon sign visualization or real photo */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <span
            className={`font-heading text-2xl sm:text-3xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent
              drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`}
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08)',
            }}
          >
            {neonText}
          </span>
        )}
      </div>

      {/* Subtle ambient glow */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Info overlay on hover */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-heading font-semibold text-sm">{title}</p>
        <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
          <MapPin className="w-3 h-3" />
          {location} · {category}
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const scrollRef = useRef<HTMLDivElement>(null);

  // Infinite auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Duplicate items for seamless loop
    const scrollWidth = container.scrollWidth / 2;
    let animId: number;
    let pos = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    function animate() {
      pos += 0.5;
      if (pos >= scrollWidth) pos = 0;
      if (container) container.scrollLeft = pos;
      animId = requestAnimationFrame(animate);
    }

    // Pause on hover
    const handleMouseEnter = () => cancelAnimationFrame(animId);
    const handleMouseLeave = () => { animId = requestAnimationFrame(animate); };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Duplicated items for seamless loop
  const displayItems = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  return (
    <section className="section-padding bg-background relative overflow-hidden" id="portfolio-section">
      <div className="container-tight">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="mb-4">{t('portfolio.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('portfolio.subtitle')}
          </p>
        </ScrollReveal>
      </div>

      {/* Full-width scrolling carousel */}
      <ScrollReveal direction="up" delay={0.2}>
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden px-4 py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((item, i) => (
            <NeonCard
              key={`${item.id}-${i}`}
              item={item.id}
              neonText={item.neonText}
              gradient={item.gradient}
              bg={item.bg}
              image={item.image}
            />
          ))}
        </div>
      </ScrollReveal>

      <div className="container-tight">
        <ScrollReveal className="text-center mt-10">
          <Button
            render={<Link to={`/${currentLang}/portfolio`} />}
            variant="outline"
            size="lg"
            className="font-heading text-sm font-semibold group"
            id="portfolio-see-all"
          >
            {t('portfolio.seeAll')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
