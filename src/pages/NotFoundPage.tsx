// ═══════════════════════════════════════════════
// Make It Neon — 404 Not Found Page
// ═══════════════════════════════════════════════

import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';
export default function NotFoundPage() {
  const {
    lang
  } = useParams();
  const {
    i18n
  } = useTranslation();
  const currentLang = lang || i18n.language || 'en';
  const isDE = currentLang === 'de';
  const isUK = currentLang === 'uk';
  return <section className="min-h-[70vh] flex items-center justify-center section-padding" id="not-found-page">
      <div className="text-center max-w-lg mx-auto">
        {/* Neon 404 */}
        <div className="relative mb-10">
          <h1 className="text-[8rem] sm:text-[10rem] md:text-[12rem] font-heading font-bold leading-none select-none neon-404" style={{
          color: '#FF2D78',
          textShadow: `
                0 0 7px #FF2D78,
                0 0 15px #FF2D78,
                0 0 30px #FF2D7890,
                0 0 60px #FF2D7850,
                0 0 100px #FF2D7830,
                0 0 150px #FF2D7820
              `
        }}>
            404
          </h1>
          {/* Ambient glow behind text */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-20" style={{
          background: 'radial-gradient(ellipse at center, #FF2D78 0%, transparent 70%)'
        }} />
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
          {isUK ? 'Сторінку не знайдено' : isDE ? 'Seite nicht gefunden' : 'Page Not Found'}
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
          {isUK ? 'Сторінка, яку ви шукаєте, не існує або була переміщена.' : isDE ? 'Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.' : "The page you're looking for doesn't exist or has been moved."}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={`/${currentLang}`} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-neon-pink hover:bg-neon-pink/90
                       text-white rounded-xl font-heading text-sm font-semibold
                       shadow-[0_0_16px_rgba(255,45,120,0.3)] hover:shadow-[0_0_24px_rgba(255,45,120,0.5)]
                       transition-all duration-300" id="404-home-btn">
            <Home className="w-4 h-4" />
            {isUK ? 'На головну' : isDE ? 'Zur Startseite' : 'Back to Home'}
          </Link>

          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-background border-2 border-border
                       text-foreground rounded-xl font-heading text-sm font-semibold
                       hover:border-foreground/30 hover:bg-muted/50 transition-all duration-300" id="404-back-btn">
            <ArrowLeft className="w-4 h-4" />
            {isUK ? 'Повернутися' : isDE ? 'Zurück' : 'Go Back'}
          </button>
        </div>

        {/* Subtle flicker animation */}
        <style>{`
          .neon-404 {
            animation: neon-flicker-404 4s ease-in-out infinite;
          }
          @keyframes neon-flicker-404 {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
              opacity: 1;
            }
            20%, 24%, 55% {
              opacity: 0.85;
            }
          }
        `}</style>
      </div>
    </section>;
}