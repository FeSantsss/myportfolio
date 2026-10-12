"use client";

import { NextIntlClientProvider, type Messages } from "next-intl";
import { createContext, useContext, useRef, useState } from "react";
import { htmlLang, type Locale } from "@/i18n/locales";

// Mensagens carregadas sob demanda: cada idioma vira um chunk separado
const loaders: Record<Locale, () => Promise<{ default: Messages }>> = {
  pt: () => import("../../messages/pt.json"),
  en: () => import("../../messages/en.json"),
  es: () => import("../../messages/es.json"),
};

type DocumentMeta = Record<Locale, { title: string; description: string }>;

type LocaleSwitchContextValue = {
  // Troca o idioma sem navegação; `path` é a URL que passa a aparecer na barra de endereço
  switchLocale: (locale: Locale, path: string) => void;
  pendingLocale: Locale | null;
};

const LocaleSwitchContext = createContext<LocaleSwitchContextValue | null>(
  null,
);

export function useLocaleSwitch() {
  const context = useContext(LocaleSwitchContext);
  if (!context) {
    throw new Error("useLocaleSwitch must be used within LocaleProvider");
  }
  return context;
}

export function LocaleProvider({
  initialLocale,
  initialMessages,
  documentMeta,
  children,
}: {
  initialLocale: Locale;
  initialMessages: Messages;
  documentMeta: DocumentMeta;
  children: React.ReactNode;
}) {
  const [current, setCurrent] = useState({
    locale: initialLocale,
    messages: initialMessages,
  });
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const cache = useRef(new Map([[initialLocale, initialMessages]]));
  // Evita que um clique antigo sobrescreva um mais recente
  const latestRequest = useRef<Locale>(initialLocale);

  const switchLocale = async (locale: Locale, path: string) => {
    latestRequest.current = locale;
    if (locale === current.locale) {
      setPendingLocale(null);
      return;
    }

    let messages = cache.current.get(locale);
    if (!messages) {
      setPendingLocale(locale);
      try {
        messages = (await loaders[locale]()).default;
        cache.current.set(locale, messages);
      } catch {
        // Sem conseguir carregar as mensagens (ex.: offline), cai para a navegação normal
        window.location.assign(path);
        return;
      }
      if (latestRequest.current !== locale) return;
    }

    setCurrent({ locale, messages });
    setPendingLocale(null);

    // Mantém <html lang>, título, descrição, cookie do proxy e URL em sincronia com o idioma
    document.documentElement.lang = htmlLang[locale];
    document.title = documentMeta[locale].title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", documentMeta[locale].description);
    document.cookie = `NEXT_LOCALE=${locale}; path=/; SameSite=Lax`;
    window.history.replaceState(null, "", path + window.location.hash);
  };

  return (
    <LocaleSwitchContext.Provider value={{ switchLocale, pendingLocale }}>
      <NextIntlClientProvider
        locale={current.locale}
        messages={current.messages}
      >
        {children}
      </NextIntlClientProvider>
    </LocaleSwitchContext.Provider>
  );
}
