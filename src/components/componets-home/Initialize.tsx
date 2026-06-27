"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import dynamic from "next/dynamic";

const Marquee = dynamic(() => import("../Marquee").then((mod) => mod.Marquee));

export function Initialize() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tlIntro = gsap.timeline();
      gsap.fromTo(
        ".introDot",
        {
          opacity: 0.1,
          scale: 1,
        },
        {
          opacity: 0.4,
          scale: 1.1,
          ease: "power1.in",
          duration: 1,
          repeat: -1,
          yoyo: true,
        },
      );
      tlIntro
        .to(".introName", {
          width: "100%",
          duration: 0.9,
          ease: "power1.inOut",
        })
        .to(
          ".introLine",
          {
            width: "100%",
            ease: "power1.inOut",
            duration: 0.6,
          },
          "-=0.2",
        )
        .to(
          ".introSub",
          {
            opacity: 0.4,
            duration: 2,
            ease: "power1.inOut",
          },
          "-=0.5",
        )
        .to(".introCenter", {
          y: "100vh",
          duration: 1,
          ease: "back.inOut",
        })
        .to(
          ".intro",
          {
            duration: 1,
            y: "-100vh",
            ease: "power4.out",
            autoAlpha: 0,
          },
          "-=0.5",
        );

      tlIntro
        .from(
          ".upTitle",
          {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.9",
        )
        .from(
          ".subtitles",
          {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.5",
        )
        .from(
          ".titleOne",
          {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".titleTwo",
          {
            opacity: 0,
            yPercent: 100,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .from(
          ".description",
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.8",
        )
        .from(
          ".detail-item",
          {
            x: 25,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            stagger: 0.2,
          },
          "-=0.5",
        )
        .from(
          ".arrow",
          {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.7",
        )
        .from(
          ".marque",
          {
            opacity: 0,
            y: 25,
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.7",
        );
    },
    { scope: pageRef },
  );

  return (
    <div ref={pageRef}>
      <div className="intro fixed inset-0 z-[9999] bg-mywhite flex items-center justify-center">
        <div className="introCenter flex flex-col items-center gap-4">
          <div className="introDot w-1.5 h-1.5 rounded-full opacity-0 bg-myblack" />
          <div
            className="introName font-[chillax] text-[clamp(28px,5vw,42px)] font-medium tracking-tight text-myblack uppercase overflow-hidden whitespace-nowrap w-0"
            translate="no"
          >
            Felipy Santos
          </div>
          <div className="introLine w-0 h-[1px] bg-myblack opacity-20" />
          <div className="introSub font-[montserrat] text-[clamp(9px,1.2vw,12px)] tracking-[3px] text-myblack opacity-0 lowercase">
            Minimalist developer
          </div>
        </div>
      </div>

      <section className="pt-[70px] max-w-[1900px] mx-2.5 md:pt-28 md:mx-12 2xl:mx-auto lg:px-2 xl:px-5 2xl:px-20">
        <div className="block overflow-hidden">
          <span translate="no" className="subtitles mb-1 md:mt-6 lg:mb-4">
            I - FULL-STACK DEVELOPER
          </span>
        </div>
        <div className="font-[chillax] font-normal text-mybeige text-2xl leading-[1.3] lg:text-2xl">
          <p className="upTitle">Hi, I'm</p>

          <h1 className="block overflow-hidden">
            <span
              className="titleOne font-semibold text-[clamp(90px,27vw,100px)] mt-2 tracking-tighter leading-[0.80] block md:text-[clamp(90px,27vw,150px)] lg:text-[clamp(150px,17vw,200px)] 2xl:text-[clamp(220px,15vw,220px)]"
              translate="no"
            >
              Felipy
            </span>
            <span
              className="titleTwo font-semibold text-[clamp(90px,27vw,100px)] mt-2 tracking-tighter leading-[0.80] block md:text-[clamp(90px,27vw,150px)] lg:text-[clamp(150px,17vw,200px)] 2xl:text-[clamp(220px,15vw,220px)]"
              translate="no"
            >
              Santos
            </span>
          </h1>
        </div>
        <div className="flex flex-col items-start my-6 gap-5 md:items-end md:flex-row md:justify-between md:my-14 lg:my-12 xl:my-10 2xl:my-8">
          <p className="description font-[montserrat] text-mywhite text-sm my-5 leadind-[1.65] max-w-[280px] opacity-70 md:max-w-[240px] lg:max-w-[280px] xl:max-w-[350px]">
            I build fast, scalable and client-friendly web applications with
            Next.js, Tailwind CSS, Sanity CMS, TypeScript and Spring Boot.
          </p>
          <div className="flex flex-col items-start md:items-end lg:scale-110">
            <div className="detail-item bg-[rgba(0,128,0,0.119)] text-[rgb(31,226,31)] border-green-600">
              <div className="w-2 h-2 bg-green-400 rounded-4xl inline-block mr-2 animate-pulse shadow-green-600"></div>
              <p>available for work</p>
            </div>
            <div className="detail-item">
              <p>Pernambuco, Brazil</p>
            </div>
            <div className="detail-item bg-[rgba(81,10,102,0.32)] text-[rgb(221,0,255)] border-[rgba(221,0,255,0.618)]">
              <p aria-label="creative and minimalist developer">
                creative and minimalist
              </p>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="arrow text-2xl rotate-90 inline-block mt-2 animate-pulse"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8H14M14 8L8 2M14 8L8 14"
              stroke="#484848"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="marque">
          <Marquee />
        </div>
      </section>
    </div>
  );
}
