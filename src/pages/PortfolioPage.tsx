import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Image, X, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { SEO, createBreadcrumbSchema } from '@/components/seo/SEO';

// Portfolio items with real photo and metadata
const PORTFOLIO_DATA = [
  { id: 'cafe_zurich', neonText: 'Café', gradient: 'from-amber-400 to-orange-500', bg: 'bg-stone-900', filterCat: 'Business', tall: false, image: '/images/portfolio/cafe.webp' },
  { id: 'bar_lucerne', neonText: 'BAR', gradient: 'from-blue-400 to-cyan-400', bg: 'bg-slate-900', filterCat: 'Business', tall: true, image: '/images/portfolio/bar.webp' },
  { id: 'wedding_bern', neonText: 'Better Together', gradient: 'from-pink-300 to-rose-400', bg: 'bg-neutral-900', filterCat: 'Wedding', tall: false, image: '/images/portfolio/wedding.webp' },
  { id: 'home_office', neonText: 'Dream Big', gradient: 'from-violet-400 to-purple-500', bg: 'bg-zinc-900', filterCat: 'Home', tall: true, image: '/images/portfolio/home_office.webp' },
  { id: 'salon_geneva', neonText: 'Beauty', gradient: 'from-pink-400 to-fuchsia-400', bg: 'bg-stone-900', filterCat: 'Business', tall: false, image: '/images/portfolio/salon.webp' },
  { id: 'restaurant_zug', neonText: 'Welcome', gradient: 'from-amber-200 to-yellow-300', bg: 'bg-neutral-900', filterCat: 'Business', tall: false, image: '/images/portfolio/hotel.webp' },
  { id: 'bedroom_modern', neonText: 'Sweet Dreams', gradient: 'from-purple-300 to-indigo-400', bg: 'bg-slate-900', filterCat: 'Home', tall: true, image: '/images/portfolio/bedroom_modern.webp' },
  { id: 'wedding_outdoor', neonText: 'I Do', gradient: 'from-rose-300 to-pink-300', bg: 'bg-zinc-900', filterCat: 'Wedding', tall: false, image: '/images/portfolio/wedding_outdoor.webp' },
  { id: 'gym_motivation', neonText: 'HUSTLE', gradient: 'from-red-400 to-orange-500', bg: 'bg-stone-900', filterCat: 'Business', tall: false, image: '/images/portfolio/gym_motivation.webp' },
  { id: 'office_startup', neonText: 'Create', gradient: 'from-cyan-400 to-teal-400', bg: 'bg-neutral-900', filterCat: 'Business', tall: true, image: '/images/portfolio/office_startup.webp' },
  { id: 'hotel_lobby', neonText: 'Welcome', gradient: 'from-amber-300 to-amber-500', bg: 'bg-zinc-900', filterCat: 'Business', tall: false, image: '/images/portfolio/hotel_lobby.webp' },
  { id: 'nursery_room', neonText: '★ Star ★', gradient: 'from-yellow-300 to-pink-400', bg: 'bg-indigo-950', filterCat: 'Home', tall: false, image: '/images/portfolio/nursery_room.webp' },
  { id: 'club_entrance', neonText: 'CLUB', gradient: 'from-fuchsia-500 to-violet-600', bg: 'bg-slate-950', filterCat: 'Events', tall: true, image: '/images/portfolio/club_entrance.webp' },
  { id: 'pop_up_store', neonText: 'POP UP', gradient: 'from-lime-400 to-emerald-500', bg: 'bg-neutral-900', filterCat: 'Events', tall: false, image: '/images/portfolio/pop_up_store.webp' },
  { id: 'rooftop_bar', neonText: 'Cheers', gradient: 'from-amber-400 to-red-400', bg: 'bg-stone-900', filterCat: 'Events', tall: false, image: '/images/portfolio/rooftop_bar.webp' },
  { id: 'bakery_sign', neonText: 'Fresh', gradient: 'from-orange-300 to-amber-500', bg: 'bg-stone-900', filterCat: 'Business', tall: true, image: '/images/portfolio/bakery_sign.webp' },
  { id: 'living_room', neonText: 'Love', gradient: 'from-red-400 to-pink-500', bg: 'bg-neutral-900', filterCat: 'Home', tall: false, image: '/images/portfolio/living_room.webp' },
  { id: 'wedding_arch', neonText: 'Forever', gradient: 'from-rose-200 to-pink-300', bg: 'bg-zinc-900', filterCat: 'Wedding', tall: false, image: '/images/portfolio/wedding_arch.webp' },
  { id: 'yoga_studio', neonText: 'Namaste', gradient: 'from-teal-300 to-cyan-400', bg: 'bg-slate-900', filterCat: 'Business', tall: true, image: '/images/portfolio/yoga_studio.webp' },
  { id: 'event_stage', neonText: 'GLOW', gradient: 'from-violet-500 to-blue-500', bg: 'bg-neutral-950', filterCat: 'Events', tall: false, image: '/images/portfolio/event_stage.webp' },
];

function Lightbox({ 
  item, 
  onClose, 
  onPrev, 
  onNext,
  t,
}: { 
  item: typeof PORTFOLIO_DATA[0]; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  t: (key: string) => string;
}) {
  const title = t(`portfolio.items.${item.id}.title`);
  const category = t(`portfolio.items.${item.id}.category`);
  const location = t(`portfolio.items.${item.id}.location`);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-50"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Nav buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div 
        className="max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${item.bg} rounded-3xl aspect-video relative flex items-center justify-center overflow-hidden`}>
          <img 
            src={item.image} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-white font-heading font-bold text-xl">{title}</h3>
          <p className="text-white/60 mt-1 flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {location} · {category}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters = [
    { key: 'All', label: t('portfolio.filterAll') },
    { key: 'Business', label: t('portfolio.filterBusiness') },
    { key: 'Events', label: t('portfolio.filterEvents') },
    { key: 'Home', label: t('portfolio.filterHome') },
    { key: 'Wedding', label: t('portfolio.filterWedding') },
  ];

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return PORTFOLIO_DATA;
    return PORTFOLIO_DATA.filter(item => item.filterCat === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  
  const prevLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);
  
  const nextLightbox = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
  }, [lightboxIndex, closeLightbox, prevLightbox, nextLightbox]);

  // Register keyboard listener
  useState(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <>
      <SEO
        title={t('pages.portfolio.title')}
        description={t('pages.portfolio.description')}
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', url: `/${currentLang}` },
          { name: t('nav.portfolio'), url: `/${currentLang}/portfolio` },
        ])}
      />
      <section className="section-padding" id="portfolio-page">
        <div className="container-tight">
          {/* Header */}
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 text-neon-green text-sm font-medium mb-6">
              <Image className="w-4 h-4" />
              {t('nav.portfolio')}
            </div>
            <h1 className="mb-6">
              {isDE ? (
                <>Unser <span className="gradient-neon-text">Portfolio</span></>
              ) : (
                <>Our <span className="gradient-neon-text">Portfolio</span></>
              )}
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              {t('portfolio.pageSubtitle')}
            </p>
          </ScrollReveal>

          {/* Category filters */}
          <ScrollReveal direction="up" delay={0.1} className="flex justify-center gap-2 mb-10 flex-wrap">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.key
                    ? 'bg-neon-pink text-white shadow-[0_0_12px_rgba(255,45,120,0.3)]'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                id={`portfolio-filter-${filter.key}`}
              >
                {filter.label}
              </button>
            ))}
          </ScrollReveal>

          {/* Masonry Grid */}
          <StaggerGroup
            childSelector=".portfolio-item"
            staggerAmount={0.08}
            direction="up"
            distance={30}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            {filteredItems.map((item, i) => {
              const title = t(`portfolio.items.${item.id}.title`);
              const category = t(`portfolio.items.${item.id}.category`);
              const location = t(`portfolio.items.${item.id}.location`);

              return (
                <div
                  key={item.id}
                  className={`portfolio-item break-inside-avoid ${item.bg} rounded-2xl overflow-hidden cursor-pointer 
                             group relative transition-all duration-300 hover:shadow-xl hover:shadow-black/20`}
                  style={{ height: item.tall ? '320px' : '220px' }}
                  onClick={() => openLightbox(i)}
                  id={`portfolio-item-${item.id}`}
                >
                  {/* Neon sign photo */}
                  <div className="absolute inset-0 flex items-center justify-center p-0">
                    <img
                      src={item.image}
                      alt={title}
                      loading="lazy"
                      className="absolute w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Info on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 
                                  group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-heading font-semibold text-sm">{title}</p>
                    <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                      <MapPin className="w-3 h-3" />
                      {location} · {category}
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={filteredItems[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
          t={t}
        />
      )}
    </>
  );
}
