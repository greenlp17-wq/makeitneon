import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SEO, createArticleSchema, createBreadcrumbSchema } from '@/components/seo/SEO';
import { getArticleBySlug, getRelatedArticles } from '@/data/blog';
export default function BlogPostPage() {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    lang,
    slug
  } = useParams();
  const navigate = useNavigate();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';
  const categoryLabels: Record<string, { de: string; uk: string }> = {
    'Business': { de: 'Business', uk: 'Бізнес' },
    'Behind the Scenes': { de: 'Hinter den Kulissen', uk: 'За лаштунками' },
    'Inspiration': { de: 'Inspiration', uk: 'Натхнення' },
    'Guide': { de: 'Ratgeber', uk: 'Гід' },
  };
  const getCategoryLabel = (cat: string) => isUK ? categoryLabels[cat]?.uk || cat : isDE ? categoryLabels[cat]?.de || cat : cat;
  const article = getArticleBySlug(slug || '');
  const related = article ? getRelatedArticles(article) : [];
  useEffect(() => {
    if (!article) {
      navigate(`/${currentLang}/blog`, {
        replace: true
      });
    }
  }, [article, navigate, currentLang]);

  // Intercept clicks on internal links rendered inside markdown content
  // so they use react-router SPA navigation instead of full page reloads
  const handleContentClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  }, [navigate]);
  if (!article) return null;
  const title = isUK ? article.title.uk || article.title.en : isDE ? article.title.de : article.title.en;
  const description = isUK ? article.metaDescription.uk || article.metaDescription.en : isDE ? article.metaDescription.de : article.metaDescription.en;
  const content = isUK ? article.content.uk || article.content.en : isDE ? article.content.de : article.content.en;

  // Simple markdown-to-HTML conversion
  const renderMarkdown = (md: string) => {
    let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-heading font-bold mt-8 mb-3">$1</h3>').replace(/^## (.+)$/gm, '<h2 class="text-xl md:text-2xl font-heading font-bold mt-10 mb-4">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-neon-pink hover:underline font-medium">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-muted-foreground">$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal text-muted-foreground">$1</li>')
    // Tables (basic)
    .replace(/\|(.+)\|/g, match => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => /^[-\s:]+$/.test(c))) return ''; // separator row
      const tag = cells.length > 0 ? 'td' : 'td';
      return `<tr>${cells.map(c => `<${tag} class="px-3 py-2 border border-border text-sm">${c.trim()}</${tag}>`).join('')}</tr>`;
    })
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-8 border-border" />')
    // Paragraphs
    .replace(/^(?!<[hluot]|<hr|<li|<tr)(.+)$/gm, '<p class="text-muted-foreground leading-relaxed mb-4">$1</p>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li[^>]*>.*?<\/li>\n?)+/g, match => {
      const isOrdered = match.includes('list-decimal');
      return isOrdered ? `<ol class="space-y-1 mb-4">${match}</ol>` : `<ul class="space-y-1 mb-4">${match}</ul>`;
    });

    // Wrap <tr> in <table>
    html = html.replace(/(<tr>.*?<\/tr>\s*)+/g, match => `<table class="w-full border-collapse border border-border rounded-lg overflow-hidden mb-6">${match}</table>`);
    return html;
  };
  return <>
      <SEO title={`${title} | Make It Neon Blog`} description={description} ogType="article" jsonLd={[createArticleSchema({
      title,
      description,
      slug: article.slug,
      lang: currentLang,
      datePublished: article.datePublished,
      dateModified: article.dateModified
    }), createBreadcrumbSchema([{
      name: 'Home',
      url: `/${currentLang}`
    }, {
      name: 'Blog',
      url: `/${currentLang}/blog`
    }, {
      name: title,
      url: `/${currentLang}/blog/${article.slug}`
    }])]} />

      <article className="section-padding" id="blog-post">
        <div className="container-tight max-w-3xl">
          {/* Back */}
          <Link to={`/${currentLang}/blog`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog')}
          </Link>

          {/* Header */}
          <ScrollReveal direction="up">
            {/* Category */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-violet/10 text-neon-violet text-xs font-semibold mb-4">
              <BookOpen className="w-3 h-3" />
              {getCategoryLabel(article.category)}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5 leading-tight">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {t('blog.publishedOn')}{' '}
                {new Date(article.datePublished).toLocaleDateString(isUK ? 'uk-UA' : isDE ? 'de-CH' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readingTime} {t('blog.minRead')}
              </span>
            </div>

            {/* Hero image */}
            <div className="aspect-[21/9] rounded-2xl flex items-center justify-center mb-10 overflow-hidden relative bg-stone-900">
              <img src={article.image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </ScrollReveal>

          {/* Article Content — intercept internal link clicks for SPA navigation */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{
            __html: renderMarkdown(content)
          }} onClick={handleContentClick} />
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="glass p-8 md:p-10 rounded-3xl text-center mt-12 mb-16">
              <h3 className="text-xl font-heading font-bold mb-3">{t('blog.ctaTitle')}</h3>
              <p className="text-muted-foreground mb-5">{t('blog.ctaText')}</p>
              <Link to={`/${currentLang}/calculator`} className="inline-flex items-center gap-2 px-6 py-3 bg-neon-pink hover:bg-neon-pink/90 
                           text-white rounded-xl font-heading text-sm font-semibold
                           shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]
                           transition-all duration-300">
                {t('blog.ctaButton')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Related Articles */}
          {related.length > 0 && <ScrollReveal direction="up" delay={0.25}>
              <h2 className="text-xl font-heading font-bold mb-6">{t('blog.relatedArticles')}</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {related.map(rel => <Link key={rel.slug} to={`/${currentLang}/blog/${rel.slug}`} className="glass rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[16/9] flex items-center justify-center overflow-hidden relative bg-stone-900">
                      <img src={rel.image} alt={isUK ? rel.title.uk || rel.title.en : isDE ? rel.title.de : rel.title.en} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-sm mb-1 group-hover:text-neon-pink transition-colors line-clamp-2">
                        {isUK ? rel.title.uk || rel.title.en : isDE ? rel.title.de : rel.title.en}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-neon-pink text-xs font-semibold group-hover:gap-2 transition-all">
                        {t('blog.readMore')} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>)}
              </div>
            </ScrollReveal>}
        </div>
      </article>
    </>;
}