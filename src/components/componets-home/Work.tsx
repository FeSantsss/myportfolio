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
      gsap.from(".subtitles", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",

        scrollTrigger: {
          start: "top 80%",
          trigger: ".subtitles",
        },
      });
      gsap.from(".title", {
        x: -25,
        opacity: 0,
        duration: 1.8,
        ease: "power4.inOut",

        scrollTrigger: {
          start: "top 80%",
          trigger: ".title",
        },
      });
      gsap.to(".lines", {
        width: "100%",
        duration: 0.5,
        ease: "power4.out",

        scrollTrigger: {
          start: "top 80%",
          trigger: ".lines",
        },
      });
      gsap.from(".workCase", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power4.inOut",

        scrollTrigger: {
          start: "top 80%",
          trigger: ".workCase",
        },
      });
    },
    { scope: pageRef },
  );

  return (
    <section
      ref={pageRef}
      id="work"
      className="pt-18 mx-2.5 md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20">II - SELECTED PROJECTS</span>

      <h2
        translate="no"
        className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20"
      >
        <span className="title">Work</span>
        <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      </h2>

      <div className="workCase">
        <WorkCase />
      </div>

      <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
    </section>
  );
}
