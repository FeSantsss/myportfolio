"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { FINE_POINTER, magnetic } from "@/lib/motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";

export interface Project {
  id: number;
  imageSrc: string;
  data: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
}

interface ProjectDrawerProps {
  project: Project;
  // Chamado depois que a animação de saída termina, para o pai desmontar a gaveta
  onClosed: () => void;
}

export function ProjectDrawer({ project, onClosed }: ProjectDrawerProps) {
  const tl = useTranslations("work");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const titleId = useId();
  const lenis = useLenis();

  // `<dialog>` nativo com showModal(): focus trap, Esc e fundo inerte já vêm do navegador,
  // e o foco volta para o card que abriu a gaveta ao fechar
  useGSAP(
    () => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (!dialog.open) dialog.showModal();
      lenis?.stop();

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const d = reduceMotion ? 0 : 1;

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          ".drawer-overlay",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 * d, ease: "power2.out" },
        )
        .fromTo(
          ".drawer-panel",
          { xPercent: 100 },
          { xPercent: 0, duration: 0.9 * d },
          0,
        )
        .fromTo(
          ".drawer-image",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 * d },
          0.25 * d,
        )
        .fromTo(
          ".drawer-image img",
          { scale: 1.15 },
          { scale: 1, duration: 1.4 * d },
          0.25 * d,
        )
        .fromTo(
          ".drawer-item",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7 * d,
            stagger: 0.06 * d,
            ease: "power3.out",
          },
          0.35 * d,
        );

      // O texto do botão "ver case" é puxado na direção do cursor
      const mm = gsap.matchMedia();
      mm.add(FINE_POINTER, () => {
        const cta = dialog.querySelector<HTMLElement>(".drawer-cta");
        const content = cta?.querySelector<HTMLElement>(".drawer-cta-content");
        if (cta && content) {
          return magnetic(content, { area: cta, strength: 0.25, max: 8 });
        }
      });

      return () => {
        lenis?.start();
      };
    },
    // Roda uma vez por abertura: a gaveta é montada a cada projeto selecionado
    { scope: dialogRef },
  );

  // A saída é mais rápida que a entrada
  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog || closingRef.current) return;
    closingRef.current = true;

    // Seletores limitados à gaveta, como o `scope` do useGSAP
    const q = gsap.utils.selector(dialog);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const d = reduceMotion ? 0 : 1;

    gsap
      .timeline({
        onComplete: () => {
          dialog.close();
          onClosed();
        },
      })
      .to(q(".drawer-item"), {
        y: 12,
        autoAlpha: 0,
        duration: 0.2 * d,
        stagger: 0.02 * d,
        ease: "power2.in",
      })
      .to(
        q(".drawer-panel"),
        { xPercent: 100, duration: 0.5 * d, ease: "power3.in" },
        0.05 * d,
      )
      .to(
        q(".drawer-overlay"),
        { autoAlpha: 0, duration: 0.4 * d, ease: "power2.in" },
        0.15 * d,
      );
  };

  // A seção de projetos usa `contain: paint`, que prenderia um elemento fixo; por isso o portal no <body>
  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 text-mybeige backdrop:bg-transparent"
    >
      <div
        aria-hidden
        onClick={close}
        className="drawer-overlay invisible absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="drawer-panel absolute inset-y-0 right-0 flex w-full flex-col border-l border-white/10 bg-[#1e1b16] shadow-[-24px_0_80px_rgba(0,0,0,0.5)] md:w-[min(600px,90vw)] xl:w-[640px]">
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-6 py-4 md:px-8">
          <div className="drawer-item flex items-center gap-3 font-[montserrat] text-[11px] uppercase tracking-[0.2em] text-mybeige/55">
            <span className="text-mybeige">
              {String(project.id).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-8 bg-mybeige/40" />
            <span>{project.data}</span>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label={tl("close")}
            className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 text-mybeige outline-none transition-[background-color,border-color,transform] duration-300 hover:rotate-90 hover:border-white/40 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-mybeige/60 motion-reduce:hover:rotate-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        <div
          data-lenis-prevent
          // O esmaecimento no fim indica que há mais conteúdo acima do botão fixo
          className="flex-1 overflow-y-auto overscroll-contain px-6 pb-16 [mask-image:linear-gradient(to_bottom,black_calc(100%-3rem),transparent)] md:px-8"
        >
          {project.imageSrc && (
            <div className="drawer-image relative mt-6 aspect-[3/2] overflow-hidden rounded-xl border border-white/10">
              <Image
                src={project.imageSrc}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <h2
            id={titleId}
            translate="no"
            className="drawer-item mt-8 font-[chillax] text-4xl font-semibold leading-tight text-balance md:text-5xl"
          >
            {project.title}
          </h2>

          <div className="drawer-item mt-8">
            <span className="subtitles">{tl("aboutProject")}</span>
          </div>
          <p className="drawer-item mt-3 max-w-[62ch] font-[montserrat] text-sm leading-relaxed tracking-wide text-mybeige/80 md:text-[15px]">
            {project.description}
          </p>

          {project.stack.length > 0 && (
            <>
              <div className="drawer-item mt-8">
                <span className="subtitles">{tl("stack")}</span>
              </div>
              <ul className="drawer-item mt-3 flex flex-wrap gap-2 font-[montserrat]">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    translate="no"
                    className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs tracking-wider text-mybeige/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {project.url && (
          <footer className="border-t border-white/[0.06] px-6 py-5 md:px-8">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-cta drawer-item group flex h-12 w-full items-center justify-center rounded-full bg-mybeige font-[montserrat] text-sm font-medium tracking-wide text-myblack outline-none transition-colors duration-300 hover:bg-mywhite focus-visible:ring-2 focus-visible:ring-mybeige/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1b16]"
            >
              <span className="drawer-cta-content inline-flex items-center gap-3">
                {tl("viewCase")}
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
              </span>
            </a>
          </footer>
        )}
      </div>
    </dialog>,
    document.body,
  );
}
