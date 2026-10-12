import { getRequestConfig } from "next-intl/server";
import { isLocale } from "./locales";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Só carrega mensagens de idiomas conhecidos; o resto cai no idioma padrão
  const requested = await requestLocale;
  const locale =
    requested && isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
