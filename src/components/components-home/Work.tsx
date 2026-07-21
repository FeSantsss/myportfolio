"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkCase } from "./WorkCase";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Work() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 80%",
          end: "bottom 90%",
        },
      });

      tl.from(".subtitles", {
        y: 100,
        autoAlpha: 0,
        duration: 0.5,
        ease: "expo.out",
      })
        .from(
          ".title",
          {
            x: -25,
            autoAlpha: 0,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.5",
        )
        .to(
          ".lines",
          {
            width: "100%",
            duration: 0.9,
            ease: "power3.inOut",
            stagger: 0.35,
          },
          "-=0.5",
        );
      gsap.from(".workCaseContainer", {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".workCaseContainer",
          start: "top 85%",
        },
      });
    },
    { scope: pageRef },
  );

  return (
    <section
      ref={pageRef}
      id="work"
      className="pt-18 contain-paint mx-2.5 md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20">II - SELECTED PROJECTS</span>

      <h2
        translate="no"
        className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20"
      >
        <span className="title">Work</span>
        <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      </h2>

      <div className="workCaseContainer transform-gpu">
        <WorkCase />
      </div>

      <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
    </section>
  );
}
