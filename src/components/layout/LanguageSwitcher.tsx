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

  const switchLanguage = () => {
    let newLang = 'en';
    if (currentLang === 'en') newLang = 'de';
    else if (currentLang === 'de') newLang = 'uk';
    else if (currentLang === 'uk') newLang = 'en';
    
    i18n.changeLanguage(newLang);

    // Update URL to reflect new language
    const currentPath = window.location.pathname;
    const pathWithoutLang = currentPath.replace(/^\/(en|de|uk)/, '') || '/';
    navigate(`/${newLang}${pathWithoutLang}`);
  };

  let flag = '🇬🇧';
  let code = 'EN';
  if (currentLang === 'de') {
    flag = '🇨🇭';
    code = 'DE';
  } else if (currentLang === 'uk') {
    flag = '🇺🇦';
    code = 'UK';
  }

  return (
    <button
      onClick={switchLanguage}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                 transition-all duration-200 cursor-pointer select-none ${className}`}
      aria-label={`Switch language`}
      id="language-switcher"
    >
      <span className="text-base leading-none">{flag}</span>
      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
        {code}
      </span>
    </button>
  );
}
