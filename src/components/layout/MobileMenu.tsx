import { useTranslation } from 'react-i18next';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavItem {
  key: string;
  path: string;
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const { t } = useTranslation();
  const { lang } = useParams();
  const location = useLocation();
  const currentLang = lang || 'en';

  const checkActive = (path: string) => {
    const current = location.pathname;
    const base = path === `/${currentLang}` ? `/${currentLang}` : path;
    if (base === `/${currentLang}`) {
      return current === base || current === `${base}/`;
    }
    return current === base || current.startsWith(`${base}/`);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-border/50">
        <SheetHeader className="text-left pb-6 border-b border-border/50">
          <SheetTitle className="font-heading text-xl font-bold">
            Make It <span className="gradient-neon-text">Neon</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 py-6" id="mobile-nav">
          {navItems.map((item) => {
            const active = checkActive(item.path);
            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={onClose}
                className={`px-4 py-3 text-base font-medium rounded-xl transition-all relative
                  ${active 
                    ? 'text-neon-pink bg-neon-pink/10' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
                id={`mobile-nav-${item.key}`}
              >
                {t(`nav.${item.key}`)}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-neon-pink rounded-r-full shadow-[0_0_8px_rgba(255,45,120,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-border/50 space-y-4">
          <Button
            render={<Link to={`/${currentLang}/calculator`} onClick={onClose} />}
            className="w-full bg-neon-pink hover:bg-neon-pink/90 text-white font-heading
                       text-sm font-semibold shadow-[0_0_16px_rgba(255,45,120,0.3)]"
            id="mobile-cta-order"
          >
            {t('nav.orderNow')}
          </Button>

          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
