import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { siteConfig } from '@/config/site';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-neon-warm text-neon-warm' : 'fill-muted text-muted'}`}
        />
      ))}
    </div>
  );
}

const avatarMap: Record<string, string> = {
  'Anna Müller': '/images/avatars/anna.webp',
  'Thomas & Sarah Weber': '/images/avatars/thomas_sarah.webp',
  'Marco Bernasconi': '/images/avatars/marco.webp',
};

function AvatarPlaceholder({ name }: { name: string }) {
  if (avatarMap[name]) {
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border">
        <img src={avatarMap[name]} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');
  
  // Generate consistent color from name
  const colors = [
    'bg-neon-pink/30 text-white',
    'bg-neon-blue/30 text-white',
    'bg-neon-violet/30 text-white',
    'bg-neon-green/30 text-white',
    'bg-neon-warm/30 text-white',
  ];
  const colorIndex = name.length % colors.length;

  return (
    <div className={`w-12 h-12 rounded-full shrink-0 ${colors[colorIndex]} flex items-center justify-center font-heading font-bold text-sm`}>
      {initials}
    </div>
  );
}

export function TestimonialsSection() {
  const { t } = useTranslation();
  const reviews = t('testimonials.reviews', { returnObjects: true }) as Array<{
    name: string;
    location: string;
    rating: number;
    text: string;
    category: string;
  }>;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % reviews.length) + reviews.length) % reviews.length);
  }, [reviews.length]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-scroll
  useEffect(() => {
    if (!isAutoPlaying) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next]);

  // Show 3 cards on desktop, 1 on mobile
  const getVisibleReviews = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const idx = ((activeIndex + i) % reviews.length + reviews.length) % reviews.length;
      result.push({ review: reviews[idx], offset: i });
    }
    return result;
  };

  return (
    <section 
      className="section-padding bg-muted/30 relative overflow-hidden" 
      id="testimonials-section"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-tight relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-6">
          <h2 className="mb-4">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('testimonials.subtitle')}
          </p>
        </ScrollReveal>

        {/* Average rating badge */}
        <ScrollReveal direction="up" delay={0.1} className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-neon-warm text-neon-warm" />
              <span className="font-heading font-bold text-lg">{t('testimonials.averageRating')}</span>
            </div>
            <div className="w-px h-5 bg-border" />
            <span className="text-sm text-muted-foreground">{t('testimonials.reviewCount')}</span>
          </div>
        </ScrollReveal>

        {/* Cards carousel */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 rounded-full 
                       bg-background border border-border shadow-md flex items-center justify-center
                       hover:bg-muted transition-colors hidden md:flex"
            aria-label="Previous review"
            id="testimonial-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 rounded-full 
                       bg-background border border-border shadow-md flex items-center justify-center
                       hover:bg-muted transition-colors hidden md:flex"
            aria-label="Next review"
            id="testimonial-next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards grid */}
          <div className="flex justify-center gap-6 px-8">
            {getVisibleReviews().map(({ review, offset }) => (
              <div
                key={review.name}
                className={`glass p-6 rounded-2xl border border-border/50 w-full max-w-sm transition-all duration-500 ease-out
                  ${offset === 0 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-40 scale-95 hidden md:block'
                  }`}
              >
                <Quote className="w-8 h-8 text-neon-pink/20 mb-4" />
                
                <p className="text-foreground leading-relaxed mb-6 text-sm min-h-[80px]">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3">
                  <AvatarPlaceholder name={review.name} />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-sm truncate">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.category} · {review.location}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-0 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="w-11 h-11 flex items-center justify-center group"
                aria-label={`Go to review ${i + 1}`}
              >
                <div
                  className={`h-2 rounded-full transition-all duration-300
                    ${i === activeIndex 
                      ? 'w-8 bg-neon-pink' 
                      : 'w-2 bg-border group-hover:bg-muted-foreground/50'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Trust links */}
        <ScrollReveal direction="up" delay={0.3} className="flex justify-center gap-6 mt-10">
          <a
            href={siteConfig.socials.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google Reviews
          </a>
          <a
            href={siteConfig.socials.trustpilot}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#00B67A"/>
            </svg>
            Trustpilot
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
