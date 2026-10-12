"use client";

import { useLocale, useTranslations } from "next-intl";
import { useLinkStatus } from "next/link";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import "flag-icons/css/flag-icons.min.css";

// Cada locale do site com a bandeira correspondente (flag-icons), o código exibido e o nome no próprio idioma
const languages = [
  { locale: "pt", flag: "pt", code: "PT", label: "Português (Portugal)", hrefLang: "pt-PT" },
  { locale: "en", flag: "us", code: "EN", label: "English", hrefLang: "en" },
  { locale: "es", flag: "es", code: "ES", label: "Español (España)", hrefLang: "es-ES" },
] as const;

// Bandeira circular; pulsa enquanto a navegação para o novo idioma está pendente
function Flag({ flag, active }: { flag: string; active: boolean }) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden
      className={`fi fis fi-${flag} rounded-full text-[15px] ring-1 ring-white/15 transition-[filter] duration-300 group-hover:grayscale-0 ${
        active ? "" : "grayscale"
      } ${pending ? "animate-pulse motion-reduce:animate-none" : ""}`}
    />
  );
}

export function LanguageSwitcher() {
  const locale = useLocale(); // Retorna "pt", "en" ou "es"
  const pathname = usePathname();
  const tl = useTranslations("footer");

  // Move o indicador imediatamente no clique, sem esperar a navegação terminar
  const [selected, setSelected] = useState<string | null>(null);
  const activeLocale = selected ?? locale;
  const activeIndex = Math.max(
    languages.findIndex((item) => item.locale === activeLocale),
    0,
  );

  return (
    <nav aria-label={tl("language")} className="flex flex-col items-center gap-3">
      <span className="subtitles">{tl("language")}</span>

      <div className="relative grid grid-cols-3 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {/* Indicador deslizante do idioma ativo */}
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full border border-mybeige/20 bg-mybeige/10 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />

        {languages.map(({ locale: itemLocale, flag, code, label, hrefLang }) => {
          const isActive = itemLocale === activeLocale;

          return (
            <Link
              key={itemLocale}
              href={pathname}
              locale={itemLocale}
              hrefLang={hrefLang}
              lang={itemLocale}
              aria-label={label}
              aria-current={itemLocale === locale ? "true" : undefined}
              title={label}
              onClick={() => setSelected(itemLocale)}
              className={`group relative z-[1] flex h-9 min-w-[68px] items-center justify-center gap-2 rounded-full px-3 font-[montserrat] text-[11px] font-medium tracking-[0.15em] text-mybeige no-underline transition-opacity duration-300 outline-none focus-visible:ring-2 focus-visible:ring-mybeige/60 md:h-10 md:min-w-[76px] ${
                isActive ? "opacity-100" : "opacity-60 hover:opacity-90"
              }`}
            >
              <Flag flag={flag} active={isActive} />
              <span aria-hidden>{code}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
