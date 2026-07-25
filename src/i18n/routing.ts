import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "pt",
  // Opcional: esconde o sufixo '/pt' da URL se o idioma for o padrão
  localePrefix: "as-needed",
});
