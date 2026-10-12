"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { getPathname, Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/locales";
import DotGrid from "./DotGrid";
import { Marquee } from "./Marquee";

// O zero do 404 é um olho que procura a página: a pupila segue o rato e,
// sem rato (toque) ou antes do primeiro movimento, olha em volta sozinha
function SearchingEye() {
  const eyeRef = useRef<HTMLSpanElement>(null);
  const pupilRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = eye.getBoundingClientRect();
        // Até onde a pupila anda sem encostar na borda do olho
        const reach = (box.width - pupil.offsetWidth) / 2 - box.width * 0.05;
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        // Longe do olho ela vai até a borda; perto, anda proporcionalmente
        const pull = Math.min(1, distance / (box.width * 1.2));
        eye.dataset.tracking = "true";
        pupil.style.transform = `translate(${(dx / distance) * reach * pull}px, ${(dy / distance) * reach * pull}px)`;
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    // Entrada, piscar e olhar ficam em camadas separadas para as animações não disputarem o transform
    <span className="inline-flex animate-nf-pop motion-reduce:animate-none">
      <span
        ref={eyeRef}
        className="group flex h-[0.74em] w-[0.74em] items-center justify-center rounded-full bg-mybeige shadow-[0_0_80px_rgba(255,245,222,0.12)] animate-nf-blink motion-reduce:animate-none"
      >
        <span
          ref={pupilRef}
          className="h-[0.28em] w-[0.28em] rounded-full bg-myblack transition-transform duration-200 ease-out animate-nf-look group-data-[tracking=true]:animate-none motion-reduce:animate-none"
        />
      </span>
    </span>
  );
}

export function NotFoundView() {
  const t = useTranslations("notFound");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  // Caminho como aparece na barra de endereço (com /en ou /es quando não é o idioma padrão)
  const path = getPathname({ href: pathname, locale });

  // Faixa no rodapé, no estilo do marquee do hero
  const marquee = Array.from({ length: 6 }, () => ["404", t("marquee")]).flat();

  // O layout define o título do site; na 404 a aba mostra "página não encontrada"
  const pageTitle = t("metaTitle");
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <section className="relative flex min-h-dvh flex-col overflow-hidden pb-6 text-mybeige">
      <DotGrid theme="dark" spacing={24} />

      {/* O mesmo @ do header leva de volta ao início */}
      <div className="relative px-6 pt-6 md:px-12 md:pt-8">
        <Link
          href="/"
          translate="no"
          className="rounded-md font-[chillax] text-lg font-medium tracking-[-1.2px] text-mywhite outline-none transition-opacity duration-300 hover:opacity-80 focus-visible:ring-2 focus-visible:ring-mybeige/60 lg:text-[19px]"
        >
          @felipysantsss
        </Link>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-14 text-center">
        <p className="subtitles animate-nf-rise motion-reduce:animate-none">
          {t("eyebrow")}
        </p>

        <div
          aria-hidden
          className="mt-8 flex items-center gap-[0.06em] font-[chillax] text-[clamp(7.5rem,32vw,17rem)] leading-[0.8] font-semibold tracking-tighter select-none"
        >
          <span className="animate-nf-rise motion-reduce:animate-none">4</span>
          <SearchingEye />
          <span className="animate-nf-rise [animation-delay:200ms] motion-reduce:animate-none">
            4
          </span>
        </div>

        <h1 className="mt-10 font-[chillax] text-[clamp(2rem,7vw,3.5rem)] leading-tight font-semibold text-balance animate-nf-rise [animation-delay:300ms] motion-reduce:animate-none">
          {t("title")}
        </h1>
        <p className="mt-4 max-w-[44ch] font-[montserrat] text-sm leading-relaxed tracking-wide text-balance text-mybeige/70 animate-nf-rise [animation-delay:380ms] motion-reduce:animate-none md:text-base">
          {t("description")}
        </p>

        {/* A requisição que falhou, como numa linha de log */}
        <code
          translate="no"
          className="mt-6 inline-block max-w-full truncate rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs tracking-wider text-mybeige/60 animate-nf-rise [animation-delay:440ms] motion-reduce:animate-none"
        >
          GET {path} <span className="text-mybeige">→ 404</span>
        </code>

        <div className="mt-10 flex w-full flex-col items-center gap-3 animate-nf-rise [animation-delay:500ms] motion-reduce:animate-none sm:w-auto sm:flex-row">
          <Link
            href="/"
            className="group flex h-12 w-full items-center justify-center gap-3 rounded-full bg-mybeige px-7 font-[montserrat] text-sm font-medium tracking-wide text-myblack outline-none transition-colors duration-300 hover:bg-mywhite focus-visible:ring-2 focus-visible:ring-mybeige/60 focus-visible:ring-offset-2 focus-visible:ring-offset-myblack sm:w-auto"
          >
            {t("home")}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              className="-rotate-45 transition-transform duration-300 group-hover:rotate-0 motion-reduce:transition-none"
            >
              <path
                d="M2 8H14M14 8L8 2M14 8L8 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/#work"
            className="flex h-12 w-full items-center justify-center rounded-full border border-white/15 px-7 font-[montserrat] text-sm tracking-wide text-mybeige outline-none transition-colors duration-300 hover:border-white/40 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-mybeige/60 sm:w-auto"
          >
            {t("work")}
          </Link>
        </div>
      </div>

      <Marquee items={marquee} />
    </section>
  );
}
