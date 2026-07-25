"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import Image from "next/image";
import usaFlag from "../../public/images/usunitedstatesflag_111929.svg";
import brFlag from "../../public/images/br_icon_128192.svg";

export function LanguageSwitcher() {
  const locale = useLocale(); // Retorna "pt" ou "en"
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    // Se o idioma atual for "pt", muda para "en", e vice-versa
    const nextLocale = locale === "pt" ? "en" : "pt";

    startTransition(() => {
      // Navega para a mesma página, mas com o novo locale
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="font-['montserrat'] cursor-pointer text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-[rgba(255,251,244,0.15)] bg-[#1e1b16] text-mybeige hover:bg-[#232018] hover:border-[rgba(255,251,244,0.4)] transition-all duration-300 disabled:opacity-50"
      title="Alternar idioma / Switch language"
    >
      {/* Exibe o idioma oposto para onde o usuário vai ao clicar */}
      {locale === "pt" ? (
        <Image
          className="w-[25px] opacity-50 hover:opacity-100 duration-300 rounded-md"
          width={100}
          height={50}
          src={usaFlag}
          alt="language selected: USA"
        />
      ) : (
        <Image
          className="w-[25px] opacity-50 hover:opacity-100 duration-300 rounded-md"
          width={100}
          height={50}
          src={brFlag}
          alt="language selected: BR"
        />
      )}
    </button>
  );
}
