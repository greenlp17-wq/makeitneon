// ═══════════════════════════════════════════════
// Make It Neon — Shop Page (Catalog)
// ═══════════════════════════════════════════════

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/shop/ProductCard';
import { catalog } from '@/data/catalog';
import { CATEGORY_LABELS, type ProductCategory } from '@/data/types';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SEO, createBreadcrumbSchema } from '@/components/seo/SEO';
type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'new';
const SORT_LABELS: Record<SortOption, {
  en: string;
  de: string;
  uk: string;
}> = {
  'popular': {
    en: 'Popular',
    de: 'Beliebt',
    uk: 'Популярні'
  },
  'price-asc': {
    en: 'Price: Low → High',
    de: 'Preis: Niedrig → Hoch',
    uk: 'Ціна: ↑'
  },
  'price-desc': {
    en: 'Price: High → Low',
    de: 'Preis: Hoch → Niedrig',
    uk: 'Ціна: ↓'
  },
  'new': {
    en: 'Newest',
    de: 'Neueste',
    uk: 'Новинки'
  }
};
export default function ShopPage() {
  const {
    t,
    i18n
  } = useTranslation();
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';
  const [activeCategory, setActiveCategory] = useState<'all' | ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Filter + sort
  const filteredProducts = useMemo(() => {
    let result = [...catalog];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => {
        const name = isUK ? p.name_uk || p.name_en : isDE ? p.name_de : p.name_en;
        const desc = isUK ? p.description_uk || p.description_en : isDE ? p.description_de : p.description_en;
        return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q);
      });
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
        break;
      case 'price-asc':
        result.sort((a, b) => Math.min(...a.availableSizes.map(s => s.price)) - Math.min(...b.availableSizes.map(s => s.price)));
        break;
      case 'price-desc':
        result.sort((a, b) => Math.min(...b.availableSizes.map(s => s.price)) - Math.min(...a.availableSizes.map(s => s.price)));
        break;
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [activeCategory, searchQuery, sortBy, isDE]);
  const categories = ['all', 'business', 'wedding', 'motivation', 'home-decor'] as const;
  return <>
      <SEO title={t('pages.shop.title')} description={t('pages.shop.description')} jsonLd={createBreadcrumbSchema([{
      name: 'Home',
      url: `/${i18n.language}`
    }, {
      name: t('nav.shop'),
      url: `/${i18n.language}/shop`
    }])} />
    <section className="section-padding" id="shop-page">
      <div className="container-wide">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 text-neon-blue text-sm font-medium mb-6">
            <ShoppingBag className="w-4 h-4" />
            {t('nav.shop')}
          </div>
          <h1 className="mb-6">
            {isUK ? <>Готові <span className="gradient-neon-text">Неонові Вивіски</span></> : isDE ? <>Fertige LED <span className="gradient-neon-text">Neonschilder</span></> : <>Ready-Made <span className="gradient-neon-text">Neon Signs</span></>}
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {isUK ? 'Перегляньте нашу колекцію неонових вивісок ручної роботи для бізнесу, весіль та дому.' : isDE ? 'Durchsuchen Sie unsere Kollektion handgefertigter LED-Neonschilder für Business, Hochzeiten und Wohndeko.' : 'Browse our collection of handcrafted LED neon signs for business, weddings, and home decor.'}
          </p>
        </ScrollReveal>

        {/* Filters Bar */}
        <div className="glass p-4 sm:p-6 rounded-2xl mb-8 space-y-4">
          {/* Top row: search + sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="text" placeholder={isUK ? 'Пошук вивісок...' : isDE ? 'Schilder suchen...' : 'Search signs...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 pr-9 h-10 bg-background/80" id="shop-search" />
              {searchQuery && <button className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <X className="w-4 h-4" />
                </button>}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground hidden sm:block" />
              <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)} className="h-10 rounded-lg border border-input bg-background/80 px-3 text-sm 
                           focus:outline-none focus:ring-2 focus:ring-neon-pink/30 cursor-pointer" id="shop-sort">
                {(Object.keys(SORT_LABELS) as SortOption[]).map(key => <option key={key} value={key}>
                    {isUK ? SORT_LABELS[key].uk || SORT_LABELS[key].en : isDE ? SORT_LABELS[key].de : SORT_LABELS[key].en}
                  </option>)}
              </select>
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              const label = cat === 'all' ? isUK ? 'Всі' : isDE ? 'Alle' : 'All' : isUK ? CATEGORY_LABELS[cat as ProductCategory].uk || CATEGORY_LABELS[cat as ProductCategory].en : isDE ? CATEGORY_LABELS[cat as ProductCategory].de : CATEGORY_LABELS[cat as ProductCategory].en;
              return <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive ? 'bg-foreground text-background shadow-lg' : 'bg-background/60 text-muted-foreground hover:text-foreground hover:bg-background/80 border border-black/5'}`} id={`filter-${cat}`}>
                  {label}
                </button>;
            })}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} {isUK ? 'вивісок' : isDE ? 'Schilder' : 'signs'}
            {searchQuery && <span>
                {' '}{isUK ? 'за' : isDE ? 'für' : 'for'} "{searchQuery}"
              </span>}
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? <div className="glass p-12 rounded-3xl text-center">
            <p className="text-lg text-muted-foreground mb-2">
              {isUK ? 'Вивісок не знайдено' : isDE ? 'Keine Schilder gefunden' : 'No signs found'}
            </p>
            <p className="text-sm text-muted-foreground">
              {isUK ? 'Спробуйте змінити фільтри.' : isDE ? 'Versuchen Sie einen anderen Suchbegriff oder Filter.' : 'Try a different search or filter.'}
            </p>
            <button onClick={() => {
            setSearchQuery('');
            setActiveCategory('all');
          }} className="mt-4 text-sm text-neon-pink hover:underline">
              {isUK ? 'Скинути фільтри' : isDE ? 'Filter zurücksetzen' : 'Reset filters'}
            </button>
          </div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass p-8 sm:p-10 rounded-3xl inline-block max-w-xl">
            <h3 className="text-lg mb-2">
              {isUK ? 'Не знайшли те, що шукали?' : isDE ? 'Nicht gefunden, was Sie suchen?' : "Can't find what you're looking for?"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isUK ? 'Створіть власний логотип з нашим калькулятором.' : isDE ? 'Gestalten Sie Ihr eigenes Neonschild mit unserem Konfigurator.' : 'Design your own custom neon sign with our calculator.'}
            </p>
            <Link to={`/${i18n.language}/calculator`} className="inline-flex items-center gap-2 px-6 py-3 bg-neon-pink hover:bg-neon-pink/90 
                         text-white rounded-xl font-heading text-sm font-semibold
                         shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]
                         transition-all duration-300">
              {isUK ? 'Створити власний дизайн' : isDE ? 'Eigenes Schild gestalten' : 'Design Your Own Sign'}
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>;
}