"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { WorkCase } from "./WorkCase";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { MOTION_OK, revealOnScroll } from "@/lib/motion";
import { SplitChars } from "../SplitChars";

export function Work() {
  const pageRef = useRef<HTMLDivElement>(null);
  const tl = useTranslations("work");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Título letra por letra, sobrancelha por trás da máscara e linhas que se desenham
        if (pageRef.current) revealOnScroll(pageRef.current);

        // Os cards entram em sequência, com um stagger curto
        gsap.from(".workcase-card", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".workCaseContainer",
            start: "top 85%",
          },
        });
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
