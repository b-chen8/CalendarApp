import { useTranslation } from 'react-i18next';
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { fr } from 'date-fns/locale/fr';
import type { Locale } from 'date-fns';

const localeMap: Record<string, Locale> = {
  en: enUS,
  es,
  fr,
};

export function useDateLocale(): Locale {
  const { i18n } = useTranslation();
  return localeMap[i18n.language] ?? enUS;
}
