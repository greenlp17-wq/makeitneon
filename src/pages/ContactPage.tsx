import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, MapPin, Phone, Clock, Send, MessageCircle, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerGroup } from '@/components/animations/StaggerGroup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SEO, createBreadcrumbSchema } from '@/components/seo/SEO';
import { siteConfig } from '@/config/site';
import { sendEmail } from '@/lib/email';

/* Inline social icons */
function InstagramIcon({
  className
}: {
  className?: string;
}) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>;
}
function FacebookIcon({
  className
}: {
  className?: string;
}) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>;
}
function TikTokIcon({
  className
}: {
  className?: string;
}) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.94a8.27 8.27 0 004.76 1.5V7a4.85 4.85 0 01-1-.31z" />
    </svg>;
}
function WhatsAppIcon({
  className
}: {
  className?: string;
}) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>;
}
function createContactSchema(t: (key: string, options?: Record<string, unknown>) => string) {
  return z.object({
    name: z.string().min(2, {
      message: t('contact.formMinLength', {
        min: 2
      })
    }),
    email: z.string().email({
      message: t('contact.formInvalidEmail')
    }),
    subject: z.string().min(3, {
      message: t('contact.formMinLength', {
        min: 3
      })
    }),
    message: z.string().min(10, {
      message: t('contact.formMinLength', {
        min: 10
      })
    })
  });
}
type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
const CONTACT_CARDS = [{
  icon: MapPin,
  labelKey: 'contact.address',
  valueKey: 'contact.addressFull',
  color: 'neon-pink',
  href: 'https://maps.google.com/?q=Bahnhofstrasse+10+8001+Zurich'
}, {
  icon: Phone,
  labelKey: 'nav.contact',
  valueKey: 'contact.phone',
  color: 'neon-blue',
  href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`
}, {
  icon: Mail,
  labelKey: 'contact.email',
  valueKey: 'contact.email',
  color: 'neon-green',
  href: `mailto:${siteConfig.email}`
}, {
  icon: Clock,
  labelKey: 'contact.workingHours',
  valueKey: 'contact.workingHoursNote',
  color: 'neon-warm',
  href: null
}] as const;
const SOCIAL_LINKS = [{
  icon: InstagramIcon,
  name: 'Instagram',
  handle: '@makeitneon',
  url: siteConfig.socials.instagram,
  color: 'hover:text-pink-500',
  bg: 'hover:bg-pink-500/10'
}, {
  icon: TikTokIcon,
  name: 'TikTok',
  handle: '@makeitneon',
  url: siteConfig.socials.tiktok,
  color: 'hover:text-foreground',
  bg: 'hover:bg-foreground/10'
}, {
  icon: FacebookIcon,
  name: 'Facebook',
  handle: 'Make It Neon',
  url: siteConfig.socials.facebook,
  color: 'hover:text-blue-600',
  bg: 'hover:bg-blue-600/10'
}];
export default function ContactPage() {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    lang
  } = useParams();
  const isDE = i18n.language === 'de';
  const isUK = i18n.language === 'uk';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const schema = createContactSchema(t);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema)
  });
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await sendEmail(data, 'Contact Form');
      setIsSuccess(true);
    } catch (e) {
      console.error(e);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleReset = () => {
    reset();
    setIsSuccess(false);
  };

  // JSON-LD LocalBusiness structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: `${siteConfig.domain}/og-image.jpg`,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstrasse 10',
      addressLocality: 'Zurich',
      postalCode: '8001',
      addressCountry: 'CH'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: ['https://instagram.com/makeitneon', 'https://tiktok.com/@makeitneon', 'https://facebook.com/makeitneon']
  };
  return <>
      <SEO title={t('pages.contact.title')} description={t('pages.contact.description')} jsonLd={[jsonLd, createBreadcrumbSchema([{
      name: 'Home',
      url: `/${lang || 'en'}`
    }, {
      name: t('nav.contact'),
      url: `/${lang || 'en'}/contact`
    }])]} />

      <section className="section-padding relative overflow-hidden" id="contact-page">
        {/* Ambient glow */}
        <div className="absolute top-0 right-[-20%] w-[50%] h-[50%] bg-neon-pink/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-15%] w-[40%] h-[40%] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-tight relative z-10">
          {/* Header */}
          <ScrollReveal direction="up" className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 text-neon-pink text-sm font-medium mb-6">
              <Mail className="w-4 h-4" />
              {t('nav.contact')}
            </div>
            <h1 className="mb-6">
              {isUK ? <>Зв'яжіться <span className="gradient-neon-text">з нами</span></> : isDE ? <>Kontaktieren <span className="gradient-neon-text">Sie uns</span></> : <>Get in <span className="gradient-neon-text">Touch</span></>}
            </h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">
              {t('contact.pageSubtitle')}
            </p>
          </ScrollReveal>

          {/* Contact Info Cards */}
          <StaggerGroup childSelector=".contact-card" staggerAmount={0.1} direction="up" distance={30} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {CONTACT_CARDS.map((card, i) => {
            const Wrapper = card.href ? 'a' : 'div';
            const wrapperProps = card.href ? {
              href: card.href,
              target: '_blank',
              rel: 'noopener noreferrer'
            } : {};
            return <Wrapper key={i} {...wrapperProps} className={`contact-card glass p-6 rounded-2xl border border-border/50 
                    hover:border-${card.color}/30 hover:shadow-md transition-all duration-300 group
                    ${card.href ? 'cursor-pointer' : ''}`} id={`contact-card-${i}`}>
                  <div className={`w-10 h-10 rounded-xl bg-${card.color}/10 flex items-center justify-center text-${card.color} mb-4
                    group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <p className="font-heading font-semibold text-sm mb-1">{t(card.labelKey)}</p>
                  <p className="text-sm text-muted-foreground">{t(card.valueKey)}</p>
                  {card.href && <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 mt-2 group-hover:text-foreground transition-colors" />}
                </Wrapper>;
          })}
          </StaggerGroup>

          {/* Main Content: Form + Sidebar */}
          <div className="grid lg:grid-cols-5 gap-8 mb-16">
            {/* Contact Form - 3 cols */}
            <ScrollReveal direction="left" className="lg:col-span-3">
              <div className="glass p-8 rounded-3xl border border-border/50">
                <h2 className="text-xl font-heading font-bold mb-6">{t('contact.formTitle')}</h2>

                {isSuccess ? <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-neon-green/10 flex items-center justify-center text-neon-green mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-3">{t('contact.successTitle')}</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{t('contact.successMessage')}</p>
                    <button onClick={handleReset} className="text-neon-pink hover:underline text-sm font-medium" id="contact-send-another">
                      {t('contact.sendAnother')}
                    </button>
                  </div> : <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name + Email grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block" htmlFor="contact-name">
                          {t('contact.formName')} <span className="text-neon-pink">*</span>
                        </label>
                        <Input id="contact-name" placeholder={t('contact.formNamePlaceholder')} className="h-11 rounded-xl glass border-border/50" {...register('name')} />
                        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block" htmlFor="contact-email">
                          {t('contact.formEmail')} <span className="text-neon-pink">*</span>
                        </label>
                        <Input id="contact-email" type="email" placeholder={t('contact.formEmailPlaceholder')} className="h-11 rounded-xl glass border-border/50" {...register('email')} />
                        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-sm font-medium mb-1.5 block" htmlFor="contact-subject">
                        {t('contact.formSubject')} <span className="text-neon-pink">*</span>
                      </label>
                      <Input id="contact-subject" placeholder={t('contact.formSubjectPlaceholder')} className="h-11 rounded-xl glass border-border/50" {...register('subject')} />
                      {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-sm font-medium mb-1.5 block" htmlFor="contact-message">
                        {t('contact.formMessage')} <span className="text-neon-pink">*</span>
                      </label>
                      <textarea id="contact-message" rows={5} placeholder={t('contact.formMessagePlaceholder')} className="w-full rounded-xl glass border border-border/50 bg-transparent px-3 py-2.5 text-sm 
                                   placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50 
                                   outline-none transition-colors resize-none" {...register('message')} />
                      {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit */}
                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-heading text-sm font-semibold
                                 shadow-[0_0_20px_rgba(255,45,120,0.3)] hover:shadow-[0_0_32px_rgba(255,45,120,0.5)]
                                 transition-all duration-300 h-12 rounded-xl" id="contact-submit">
                      {isSubmitting ? <>
                          <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                          {t('contact.formSending')}
                        </> : <>
                          <Send className="w-4 h-4 mr-2" />
                          {t('contact.formSend')}
                        </>}
                    </Button>
                  </form>}
              </div>
            </ScrollReveal>

            {/* Sidebar - 2 cols */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp CTA */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="glass p-6 rounded-2xl border border-border/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full blur-[40px] pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                    <WhatsAppIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold mb-2">{t('contact.whatsappTitle')}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {t('contact.whatsappText')}
                  </p>
                  <a href={`https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(siteConfig.whatsapp.defaultMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 
                               text-white text-sm font-semibold font-heading transition-colors duration-200
                               shadow-[0_0_16px_rgba(34,197,94,0.3)] hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]" id="contact-whatsapp">
                    <MessageCircle className="w-4 h-4" />
                    {t('contact.whatsappButton')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </ScrollReveal>

              {/* Social Links */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="glass p-6 rounded-2xl border border-border/50">
                  <h3 className="font-heading font-bold mb-4">{t('contact.socialTitle')}</h3>
                  <div className="space-y-3">
                    {SOCIAL_LINKS.map(social => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 p-3 rounded-xl ${social.bg} transition-all duration-200 group`} id={`contact-social-${social.name.toLowerCase()}`}>
                        <div className={`w-9 h-9 rounded-lg bg-muted flex items-center justify-center ${social.color} transition-colors`}>
                          <social.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold">{social.name}</p>
                          <p className="text-xs text-muted-foreground">{social.handle}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
                      </a>)}
                  </div>
                </div>
              </ScrollReveal>


            </div>
          </div>
        </div>
      </section>
    </>;
}