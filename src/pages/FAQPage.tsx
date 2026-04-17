import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Search, HelpCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Input } from '@/components/ui/input';
import { SEO, createBreadcrumbSchema } from '@/components/seo/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

export default function FAQPage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const isDE = i18n.language === 'de';
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqItems = t('faq.items', { returnObjects: true }) as FAQItem[];

  const categories = [
    { key: 'all', label: t('portfolio.filterAll') },
    { key: 'order', label: t('faq.categoryOrder') },
    { key: 'product', label: t('faq.categoryProduct') },
    { key: 'shipping', label: t('faq.categoryShipping') },
  ];

  const filteredItems = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = search === '' || 
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqItems, activeCategory, search]);

  // Group by category for display
  const grouped = useMemo(() => {
    const groups: Record<string, FAQItem[]> = {};
    filteredItems.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filteredItems]);

  const categoryLabels: Record<string, string> = {
    order: t('faq.categoryOrder'),
    product: t('faq.categoryProduct'),
    shipping: t('faq.categoryShipping'),
  };

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={t('pages.faq.title')}
        description={t('pages.faq.description')}
        jsonLd={[
          jsonLd,
          createBreadcrumbSchema([
            { name: 'Home', url: `/${lang || 'en'}` },
            { name: t('nav.faq'), url: `/${lang || 'en'}/faq` },
          ]),
        ]}
      />

      <section className="section-padding" id="faq-page">
        <div className="container-tight">
          {/* Header */}
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-blue/10 text-neon-blue text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              {t('nav.faq')}
            </div>
            <h1 className="mb-6">
              {isDE ? (
                <>Häufige <span className="gradient-neon-text">Fragen</span></>
              ) : (
                <>Frequently Asked <span className="gradient-neon-text">Questions</span></>
              )}
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              {t('faq.subtitle')}
            </p>
          </ScrollReveal>

          {/* Search */}
          <ScrollReveal direction="up" delay={0.1} className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('faq.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 rounded-xl glass border-border/50 text-sm"
                id="faq-search"
              />
            </div>
          </ScrollReveal>

          {/* Category filters */}
          <ScrollReveal direction="up" delay={0.15} className="flex justify-center gap-2 mb-10 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${activeCategory === cat.key
                    ? 'bg-neon-pink text-white shadow-[0_0_12px_rgba(255,45,120,0.3)]'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                id={`faq-filter-${cat.key}`}
              >
                {cat.label}
              </button>
            ))}
          </ScrollReveal>

          {/* FAQ Items */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">{t('faq.noResults')}</p>
            </div>
          ) : activeCategory === 'all' ? (
            // Grouped view
            <div className="max-w-3xl mx-auto space-y-10">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <h2 className="text-lg font-heading font-semibold mb-4 text-neon-pink">
                    {categoryLabels[category] || category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {items.map((item, i) => (
                      <AccordionItem
                        key={`${category}-${i}`}
                        value={`${category}-${i}`}
                        className="glass px-6 border border-border/50 rounded-xl overflow-hidden
                                   data-[state=open]:border-neon-pink/20 data-[state=open]:shadow-[0_0_16px_rgba(255,45,120,0.06)]
                                   transition-all duration-300"
                      >
                        <AccordionTrigger className="text-left font-heading font-semibold text-sm py-5 hover:no-underline hover:text-neon-pink transition-colors">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            // Flat filtered view
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-3">
                {filteredItems.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`filtered-${i}`}
                    className="glass px-6 border border-border/50 rounded-xl overflow-hidden
                               data-[state=open]:border-neon-pink/20 data-[state=open]:shadow-[0_0_16px_rgba(255,45,120,0.06)]
                               transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold text-sm py-5 hover:no-underline hover:text-neon-pink transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
