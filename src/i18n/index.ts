import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
] as const;

export type SupportedLocale = (typeof supportedLanguages)[number]['code'];

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('symptom-tracker-lang') ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
