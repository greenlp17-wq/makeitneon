import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, ArrowRight, Calendar } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { SEO, createBreadcrumbSchema } from '@/components/seo/SEO';
import { blogArticles } from '@/data/blog';

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';

  const featured = blogArticles[0];
  const rest = blogArticles.slice(1);

  return (
    <>
      <SEO
        title={t('pages.blog.title')}
        description={t('pages.blog.description')}
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', url: `/${currentLang}` },
          { name: 'Blog', url: `/${currentLang}/blog` },
        ])}
      />

      <section className="section-padding" id="blog-page">
        <div className="container-tight">
          {/* Header */}
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-violet/10 text-neon-violet text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Blog
            </div>
            <h1 className="mb-6">
              {isDE ? (
                <>Neonschild-<span className="gradient-neon-text">Blog</span></>
              ) : (
                <>Neon Sign <span className="gradient-neon-text">Blog</span></>
              )}
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              {t('blog.pageSubtitle')}
            </p>
          </ScrollReveal>

          {/* Featured Article */}
          <ScrollReveal direction="up" delay={0.1}>
            <Link
              to={`/${currentLang}/blog/${featured.slug}`}
              className="block glass rounded-3xl overflow-hidden mb-12 group hover:shadow-xl transition-all duration-300"
              id="blog-featured"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-[16/10] md:aspect-auto flex items-center justify-center overflow-hidden bg-stone-900">
                  <img 
                    src={featured.image} 
                    alt={isDE ? featured.title.de : featured.title.en} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                      {t('blog.featuredBadge')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featured.datePublished).toLocaleDateString(isDE ? 'de-CH' : 'en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readingTime} {t('blog.minRead')}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-heading font-bold mb-3 group-hover:text-neon-pink transition-colors">
                    {isDE ? featured.title.de : featured.title.en}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
                    {isDE ? featured.metaDescription.de : featured.metaDescription.en}
                  </p>

                  <span className="inline-flex items-center gap-2 text-neon-pink text-sm font-semibold group-hover:gap-3 transition-all">
                    {t('blog.readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Article Grid */}
          <StaggerGroup
            childSelector=".blog-card"
            staggerAmount={0.1}
            direction="up"
            distance={30}
            className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-16"
          >
            {rest.map((article) => (
              <Link
                key={article.slug}
                to={`/${currentLang}/blog/${article.slug}`}
                className="blog-card glass rounded-2xl overflow-hidden group hover:shadow-lg transition-all duration-300"
                id={`blog-card-${article.slug}`}
              >
                {/* Real Image */}
                <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden bg-stone-900">
                  <img 
                    src={article.image} 
                    alt={isDE ? article.title.de : article.title.en} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/10">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.datePublished).toLocaleDateString(isDE ? 'de-CH' : 'en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readingTime} {t('blog.minRead')}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base mb-2 group-hover:text-neon-pink transition-colors line-clamp-2">
                    {isDE ? article.title.de : article.title.en}
                  </h3>

                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {isDE ? article.metaDescription.de : article.metaDescription.en}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-neon-pink text-xs font-semibold group-hover:gap-2.5 transition-all">
                    {t('blog.readMore')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
