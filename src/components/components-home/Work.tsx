"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { WorkCase } from "./WorkCase";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  DURATION,
  EASE,
  FINE_POINTER,
  magnetic,
  MOTION_OK,
  observeReveals,
  onceInView,
  STAGGER,
} from "@/lib/motion";
import { SplitChars } from "../SplitChars";

export function Work() {
  const pageRef = useRef<HTMLDivElement>(null);
  const tl = useTranslations("work");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const scope = pageRef.current;
        if (!scope) return;

        // Título letra por letra, sobrancelha por trás da máscara e linhas que se desenham (CSS)
        const stopReveals = observeReveals(scope);

        // Cards: sobem, o número desliza da esquerda e o conteúdo entra em sequência
        const cards = gsap.utils.toArray<HTMLElement>(".workcase-card");
        const entrances = new Map(
          cards.map((card) => [
            card as Element,
            gsap
              .timeline({ paused: true, defaults: { ease: EASE.reveal } })
              .from(card, { opacity: 0, y: 60, duration: DURATION.slow })
              .from(
                card.querySelector(".workcase-number"),
                { xPercent: -40, opacity: 0, duration: 1.6 },
                0.1,
              )
              .from(
                card.querySelectorAll(".workcase-item"),
                {
                  opacity: 0,
                  y: 20,
                  duration: DURATION.base,
                  stagger: STAGGER.tight,
                },
                0.2,
              ),
          ]),
        );
        // Os cards que aparecem juntos (mesma linha) entram um depois do outro
        const stopCards = onceInView(cards, (entered) =>
          entered.forEach((card, i) =>
            gsap.delayedCall(i * STAGGER.base * 1.5, () =>
              entrances.get(card)?.play(),
            ),
          ),
        );

        // Parallax: o número (decorativo) anda um pouco mais devagar que o card ao rolar
        cards.forEach((card) => {
          gsap.fromTo(
            card.querySelector(".workcase-number"),
            { yPercent: 12 },
            {
              yPercent: -12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        return () => {
          stopReveals();
          stopCards();
        };
      });

      // A seta de cada card se inclina na direção do cursor enquanto ele passa pelo card
      mm.add(FINE_POINTER, () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>(".workcase-card")
          .map((card) => {
            const arrow = card.querySelector<HTMLElement>(".workcase-arrow");
            return arrow
              ? magnetic(arrow, { area: card, strength: 0.2, max: 10 })
              : () => {};
          });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    },
    { scope: pageRef },
  );

  return (
    <section
      ref={pageRef}
      id="work"
      className="pt-18 pb-1 contain-paint mx-2.5 md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20 overflow-hidden">
        <span data-reveal="mask" className="block">
          {tl("projects")}
        </span>
      </span>

      <h2
        translate="no"
        aria-label={tl("title")}
        className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20"
      >
        <span data-reveal="chars" className="title block">
          <SplitChars text={tl("title")} />
        </span>
        <span
          data-reveal="line"
          className="lines block h-[.5px] mt-3 opacity-20 bg-mybeige"
        ></span>
      </h2>

      <div className="workCaseContainer transform-gpu">
        <WorkCase />
      </div>

      <div
        data-reveal="line"
        className="lines h-[.5px] mt-5 opacity-20 bg-mybeige"
      ></div>
    </section>
  );
}
