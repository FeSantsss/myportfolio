import { routing } from "./routing";

export type Locale = (typeof routing.locales)[number];

// Valor do atributo `lang` do <html> para cada locale do site
export const htmlLang: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
  es: "es-ES",
};

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}
