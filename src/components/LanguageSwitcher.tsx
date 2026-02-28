import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../i18n';
import './LanguageSwitcher.css';

const STORAGE_KEY = 'symptom-tracker-lang';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  return (
    <div className="language-switcher">
      <label className="language-switcher-label" htmlFor="lang-select">
        <span className="visually-hidden">Language</span>
      </label>
      <select
        id="lang-select"
        className="language-switcher-select"
        value={i18n.language}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Language"
      >
        {supportedLanguages.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
