import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const currentLang = lang || 'en';

  const faqItems = t('faq.items', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
    category: string;
  }>;

  // Show first 6 questions on homepage
  const previewItems = faqItems.slice(0, 6);

  return (
    <section className="section-padding bg-background relative" id="faq-section">
      <div className="container-tight">
        <ScrollReveal direction="up" className="text-center mb-12">
          <h2 className="mb-4">{t('faq.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t('faq.subtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {previewItems.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
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
        </ScrollReveal>

        <ScrollReveal className="text-center mt-10">
          <Button
            render={<Link to={`/${currentLang}/faq`} />}
            variant="outline"
            size="lg"
            className="font-heading text-sm font-semibold group"
            id="faq-see-all"
          >
            {t('faq.seeAll')}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
