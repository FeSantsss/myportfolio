"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import "flag-icons/css/flag-icons.min.css";

// Cada locale do site com a bandeira correspondente (flag-icons) e o nome no próprio idioma
const languages = [
  { locale: "pt", flag: "pt", label: "Português (Portugal)" },
  { locale: "en", flag: "us", label: "English" },
  { locale: "es", flag: "es", label: "Español (España)" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale(); // Retorna "pt", "en" ou "es"
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (nextLocale: string) => {
    if (nextLocale === locale) return;

    startTransition(() => {
      // Navega para a mesma página, mas com o novo locale
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div
      role="group"
      aria-label="Idioma / Language / Idioma"
      className="flex items-center gap-1 px-2 py-1.5 rounded-full border border-[rgba(255,251,244,0.15)] bg-[#1e1b166d]"
    >
      {languages.map(({ locale: itemLocale, flag, label }) => {
        const isActive = itemLocale === locale;

        return (
          <button
            key={itemLocale}
            type="button"
            onClick={() => changeLanguage(itemLocale)}
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            lang={itemLocale}
            className={`flex cursor-pointer items-center rounded-full px-1.5 py-1 transition-all duration-300 disabled:opacity-50 ${
              isActive
                ? "bg-[#232018] opacity-100"
                : "opacity-40 hover:opacity-100"
            }`}
          >
            <span className={`fi fi-${flag} rounded-[3px] text-[18px]`} />
          </button>
        );
      })}
    </div>
  );
}
