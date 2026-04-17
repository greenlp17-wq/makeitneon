import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const currentLang = lang || i18n.language || 'en';
  const isEnglish = currentLang === 'en';

  const switchLanguage = () => {
    const newLang = isEnglish ? 'de' : 'en';
    i18n.changeLanguage(newLang);

    // Update URL to reflect new language
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|de)/, '') || '/';
    navigate(`/${newLang}${pathWithoutLang}`);
  };

  return (
    <button
      onClick={switchLanguage}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                 transition-all duration-200 cursor-pointer select-none ${className}`}
      aria-label={`Switch to ${isEnglish ? 'German' : 'English'}`}
      id="language-switcher"
    >
      <span className="text-base leading-none">{isEnglish ? '🇬🇧' : '🇨🇭'}</span>
      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
        {isEnglish ? 'EN' : 'DE'}
      </span>
    </button>
  );
}
