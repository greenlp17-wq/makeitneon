import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Users, Globe, Zap, Heart, Award, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { Button } from '@/components/ui/button';
import { SEO, createBreadcrumbSchema } from '@/components/seo/SEO';

const STATS = [
  { value: '500+', label_en: 'Signs Delivered', label_de: 'Schilder geliefert', label_uk: 'Вивісок зроблено' },
  { value: '120+', label_en: 'Happy Clients', label_de: 'Zufriedene Kunden', label_uk: 'Задоволених клієнтів' },
  { value: '4.9★', label_en: 'Average Rating', label_de: 'Bewertung', label_uk: 'Середній рейтинг' },
  { value: '2yr', label_en: 'Full Warranty', label_de: 'Volle Garantie', label_uk: 'Повна гарантія' },
];

const VALUES = [
  {
    icon: Heart,
    title_en: 'Passion for Craft', title_de: 'Leidenschaft', title_uk: 'Пристрасть до справи',
    desc_en: 'Every sign is made with love and attention to detail by our skilled artisans.',
    desc_de: 'Jedes Schild wird mit Liebe und Liebe zum Detail von unseren Handwerkern gefertigt.',
    desc_uk: 'Кожна вивіска зроблена з любов\'ю та увагою до деталей нашими майстрами.',
    color: 'neon-pink',
  },
  {
    icon: Award,
    title_en: 'Premium Quality', title_de: 'Premium-Qualität', title_uk: 'Преміум якість',
    desc_en: 'We use only the highest quality LED neon flex and precision-cut Swiss acrylic.',
    desc_de: 'Wir verwenden nur hochwertigsten LED Neon Flex und präzisionsgeschnittenes Schweizer Acryl.',
    desc_uk: 'Ми використовуємо тільки найякісніший LED неон та швейцарський акріл.',
    color: 'neon-blue',
  },
  {
    icon: Globe,
    title_en: 'Local & Global', title_de: 'Lokal & Global', title_uk: 'Локально та глобально',
    desc_en: 'Based in Zurich, serving the world. Installation services across Switzerland.',
    desc_de: 'Aus Zürich, für die ganze Welt. Montageservice in der ganzen Schweiz.',
    desc_uk: 'Базуємось у Цюриху, працюємо по всьому світу. Монтаж по Швейцарії.',
    color: 'neon-green',
  },
  {
    icon: Zap,
    title_en: 'Eco-Friendly', title_de: 'Umweltfreundlich', title_uk: 'Екологічність',
    desc_en: '80% less energy than glass neon, zero hazardous gases, cool to the touch.',
    desc_de: '80% weniger Energie als Glasneon, keine Schadstoffe, kühl bei Berührung.',
    desc_uk: 'На 80% менше енергії ніж скляний неон, без шкідливих газів, не нагрівається.',
    color: 'neon-warm',
  },
];

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';

  return (
    <>
      <SEO
        title={t('pages.about.title')}
        description={t('pages.about.description')}
        jsonLd={createBreadcrumbSchema([
          { name: 'Home', url: `/${currentLang}` },
          { name: t('nav.about'), url: `/${currentLang}/about` },
        ])}
      />
    <section className="section-padding" id="about-page">
      <div className="container-tight">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-warm/10 text-neon-warm text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            {t('nav.about')}
          </div>
          <h1 className="mb-6">
            {isUK ? <>Про <span className="gradient-neon-text">Make It Neon</span></> : isDE ? <>Über <span className="gradient-neon-text">Make It Neon</span></> : <>About <span className="gradient-neon-text">Make It Neon</span></>}
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            {isUK ? 'Ми — команда пристрасних майстрів з Цюриха, Швейцарія, які створюють вражаючі LED неонові вивіски, що оживляють простір. Від затишних кафе до розкішних весільних залів — наші вивіски ручної роботи освітлюють моменти, що мають значення.'
            : isDE ? 'Wir sind ein Team leidenschaftlicher Handwerker aus Zürich, Schweiz, die atemberaubende LED-Neonschilder fertigen, die Räume zum Leben erwecken.'
            : "We're a team of passionate artisans based in Zurich, Switzerland, dedicated to creating stunning LED neon signs that bring spaces to life. From cozy cafés to grand wedding venues, our handcrafted signs illuminate moments that matter."}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal direction="up" delay={0.1} className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="glass p-6 rounded-2xl text-center">
                <div className="font-heading text-3xl font-bold gradient-neon-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{isUK ? stat.label_uk : isDE ? stat.label_de : stat.label_en}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Story section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <ScrollReveal direction="left">
            <div className="bg-stone-900 rounded-3xl aspect-video flex relative items-center justify-center overflow-hidden group">
              <img 
                src="/images/about/workshop.webp" 
                alt="Make It Neon Workshop" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
              <span
                className="relative font-heading text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent"
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}
              >
                {isUK ? 'Наша Майстерня' : isDE ? 'Unsere Werkstatt' : 'Our Workshop'}
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <h2 className="mb-4">{isUK ? 'Наша Історія' : isDE ? 'Unsere Geschichte' : 'Our Story'}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {isUK ? 'Заснований у 2022 році, Make It Neon народився з простої ідеї: зробити преміальні LED неонові вивіски доступними для кожного. Те, що починалося як хобі-проєкт у маленькій цюрихській майстерні, виросло у провідне місце в Швейцарії для кастомного неону.'
              : isDE ? 'Make It Neon wurde 2022 gegründet — aus der einfachen Idee, Premium LED-Neonschilder für jeden zugänglich zu machen.'
              : "Founded in 2022, Make It Neon was born from a simple idea: to make premium LED neon signs accessible to everyone. What started as a passion project in a small Zurich workshop has grown into Switzerland's go-to destination for custom neon."}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {isUK ? 'Ми поєднуємо традиційну майстерність із сучасними LED технологіями. Кожна вивіска згинається вручну, перевіряється на якість і ретельно пакується прямо тут, у Цюриху.'
              : isDE ? 'Wir verbinden traditionelles Handwerk mit modernster LED-Technologie. Jedes Schild wird von Hand gebogen und hier in Zürich verpackt.'
              : 'We combine traditional sign-making craftsmanship with cutting-edge LED technology. Each sign is hand-bent, quality-tested, and carefully packaged right here in Zurich — ensuring every piece meets our high standards.'}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {isUK ? 'Будь то яскрава вивіска для бізнесу, романтичний весільний декор або особистий штрих для вашого дому — ми вкладаємо душу у кожну роботу.'
              : isDE ? 'Ob ein kühnes Geschäftsschild, ein romantischer Hochzeitshintergrund oder eine persönliche Note für Ihr Zuhause — wir stecken Herz und Seele in jede Kreation.'
              : "Whether it's a bold business sign, a romantic wedding backdrop, or a personal touch for your home — we pour heart and soul into every creation."}
            </p>
          </ScrollReveal>
        </div>

        {/* Values */}
        <ScrollReveal direction="up" className="text-center mb-10">
          <h2 className="mb-4">{isUK ? 'Наші Цінності' : isDE ? 'Wofür wir stehen' : 'What We Stand For'}</h2>
        </ScrollReveal>

        <StaggerGroup
          childSelector=".value-card"
          staggerAmount={0.12}
          direction="up"
          className="grid sm:grid-cols-2 gap-6 mb-16"
        >
          {VALUES.map((value, i) => (
            <div
              key={i}
              className="value-card glass p-8 rounded-2xl flex flex-col gap-4 border border-border/50 
                         hover:border-neon-pink/20 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-${value.color}/10 flex items-center justify-center text-${value.color} 
                group-hover:scale-110 transition-transform duration-300`}>
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-heading">{isUK ? value.title_uk : isDE ? value.title_de : value.title_en}</h3>
              <p className="text-muted-foreground leading-relaxed">{isUK ? value.desc_uk : isDE ? value.desc_de : value.desc_en}</p>
            </div>
          ))}
        </StaggerGroup>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <div className="glass p-10 rounded-3xl border border-border/50">
            <h3 className="text-2xl font-heading font-bold mb-4">
              {isUK ? 'Готові створити щось особливе?' : isDE ? 'Bereit, etwas Besonderes zu schaffen?' : 'Ready to Create Something Special?'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {isUK ? 'Створіть свою кастомну LED вивіску з нашим калькулятором або зверніться до нас для безкоштовного прорахунку.'
              : isDE ? 'Gestalten Sie Ihr eigenes Neonschild mit unserem Konfigurator oder kontaktieren Sie uns für ein kostenloses Angebot.'
              : 'Design your own custom LED neon sign with our online configurator, or reach out for a free quote on custom projects.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                render={<Link to={`/${currentLang}/calculator`} />}
                size="lg"
                className="bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm font-semibold
                           shadow-[0_0_20px_rgba(255,45,120,0.3)] hover:shadow-[0_0_32px_rgba(255,45,120,0.5)]
                           transition-all duration-300 group"
              >
                {isUK ? 'Створити вивіску' : isDE ? 'Schild gestalten' : 'Design Your Sign'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                render={<Link to={`/${currentLang}/contact`} />}
                variant="outline"
                size="lg"
                className="font-heading text-sm font-semibold"
              >
                {isUK ? 'Зв\'язатись з нами' : isDE ? 'Kontaktieren' : 'Contact Us'}
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
}
