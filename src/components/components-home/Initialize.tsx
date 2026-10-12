"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import {
  announceHeroReady,
  DURATION,
  EASE,
  MOTION_OK,
  STAGGER,
} from "@/lib/motion";

import DotGrid from "../DotGrid";
import { SplitChars } from "../SplitChars";

const Marquee = dynamic(() => import("../Marquee").then((mod) => mod.Marquee));

// Qualquer interação acelera a abertura: quem já quer ver o site não precisa esperar
const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

export function Initialize() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  // A rolagem fica parada só enquanto a abertura cobre a tela
  const introPlaying = useRef(true);

  useEffect(() => {
    lenisRef.current = lenis;
    if (lenis && introPlaying.current) lenis.stop();
  }, [lenis]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const timeline = gsap.timeline({ defaults: { ease: EASE.reveal } });
        const skip = () => timeline.timeScale(4);
        const stopListening = () =>
          SKIP_EVENTS.forEach((type) => window.removeEventListener(type, skip));
        SKIP_EVENTS.forEach((type) =>
          window.addEventListener(type, skip, { passive: true }),
        );

        timeline
          // Abertura: o nome se revela, a linha se desenha e a assinatura aparece
          .fromTo(
            ".introName",
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
            0.1,
          )
          .fromTo(
            ".introLine",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: EASE.draw },
            0.2,
          )
          .fromTo(
            ".introSub",
            { opacity: 0, y: 8 },
            { opacity: 0.4, y: 0, duration: 0.6 },
            0.6,
          )
          // Saída: o miolo sobe e a cortina abre para cima, revelando o hero
          .addLabel("exit", 1.5)
          .to(
            ".introCenter",
            { yPercent: -60, opacity: 0, duration: 0.5, ease: EASE.exit },
            "exit",
          )
          .to(
            ".intro",
            { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
            "exit+=0.05",
          )
          .set(".intro", { display: "none" })
          .addLabel("hero", "exit+=0.45")
          .call(
            () => {
              timeline.timeScale(1);
              stopListening();
              introPlaying.current = false;
              lenisRef.current?.start();
              announceHeroReady();
            },
            [],
            "hero",
          )
          // Hero: o nome entra letra por letra e o resto chega em sequência
          .from(
            ".heroEyebrow",
            { yPercent: 110, duration: DURATION.base },
            "hero",
          )
          .from(
            ".hero-name .split-char",
            {
              yPercent: 120,
              opacity: 0,
              duration: DURATION.slow,
              stagger: STAGGER.char * 1.4,
            },
            "hero",
          )
          .from(
            ".upTitle",
            { opacity: 0, y: 16, duration: DURATION.base },
            "hero+=0.1",
          )
          .from(
            ".description",
            { opacity: 0, y: 16, duration: DURATION.base },
            "hero+=0.45",
          )
          .from(
            ".detail-item",
            {
              opacity: 0,
              x: 24,
              duration: DURATION.base,
              stagger: STAGGER.base,
            },
            "hero+=0.5",
          )
          .from(".marque", { opacity: 0, duration: 1 }, "hero+=0.6")
          // A seta convida a rolar: aparece e balança algumas vezes. Ela está girada
          // 90° (propriedade rotate), então o deslocamento "para baixo" é no eixo x
          .from(".arrow", { opacity: 0, x: -10, duration: 0.6 }, "hero+=0.8")
          .to(".arrow", {
            x: 6,
            duration: 0.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 5,
          });

        return stopListening;
      });

      // Só no desktop: ao rolar, "Felipy" desliza para a esquerda e "Santos" para a direita
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const separate = () => ({
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        });
        gsap.to(".titleOne", {
          xPercent: -14,
          ease: "none",
          scrollTrigger: separate(),
        });
        gsap.to(".titleTwo", {
          xPercent: 14,
          ease: "none",
          scrollTrigger: separate(),
        });
      });

      // Com movimento reduzido a abertura nem aparece (CSS) e nada se move
      mm.add("(prefers-reduced-motion: reduce)", () => {
        introPlaying.current = false;
        announceHeroReady();
      });
    },
    { scope: pageRef },
  );

  const tl = useTranslations("initialize");

  return (
    <div ref={pageRef} className="relative">
      <DotGrid theme="dark" spacing={24} />
      {/* Sem JavaScript a abertura nunca sairia da frente do site */}
      <noscript>
        <style>{".intro{display:none!important}"}</style>
      </noscript>
      <div className="intro fixed inset-0 z-[9999] bg-mywhite flex items-center justify-center transform-gpu motion-reduce:hidden">
        <div className="introCenter flex flex-col items-center gap-4">
          <div
            className="introName font-[chillax] text-[clamp(28px,5vw,42px)] font-medium tracking-tight text-myblack uppercase whitespace-nowrap [clip-path:inset(0_100%_0_0)]"
            translate="no"
          >
            {tl("nameintro")}
          </div>

          <div className="introLine w-full h-[1px] bg-myblack opacity-20 [transform:scaleX(0)]" />
          <div className="introSub font-[montserrat] text-[clamp(9px,1.2vw,12px)] tracking-[3px] text-myblack opacity-0 lowercase">
            {tl("minimalistdev")}
          </div>
        </div>
      </div>

      <section className="hero relative pt-[70px] max-w-[1900px] contain-paint mx-2.5 md:pt-28 md:mx-12 2xl:mx-auto lg:px-2 xl:px-5 2xl:px-20">
        <div className="block overflow-hidden">
          <span
            translate="no"
            className="heroEyebrow subtitles mb-1 md:mt-6 lg:mb-4"
          >
            {tl("fulldev")}
          </span>
        </div>
        <div className="font-[chillax] font-normal text-mybeige text-2xl leading-[1.3] lg:text-2xl">
          <p className="upTitle">{tl("iam")}</p>

          <h1
            className="hero-name block overflow-hidden"
            aria-label={`${tl("nameone")} ${tl("nametwo")}`}
          >
            <span
              className="titleOne font-semibold text-[clamp(90px,27vw,100px)] mt-2 tracking-tighter leading-[0.80] block md:text-[clamp(90px,27vw,150px)] lg:text-[clamp(150px,17vw,200px)] 2xl:text-[clamp(220px,15vw,220px)]"
              translate="no"
            >
              <SplitChars text={tl("nameone")} />
            </span>
            <span
              className="titleTwo font-semibold text-[clamp(90px,27vw,100px)] mt-2 tracking-tighter leading-[0.80] block md:text-[clamp(90px,27vw,150px)] lg:text-[clamp(150px,17vw,200px)] 2xl:text-[clamp(220px,15vw,220px)]"
              translate="no"
            >
              <SplitChars text={tl("nametwo")} />
            </span>
          </h1>
        </div>
        <div className="flex flex-col items-start my-6 gap-5 md:items-end md:flex-row md:justify-between md:my-14 lg:my-12 xl:my-10 2xl:my-8">
          <p className="description font-[montserrat] text-mywhite text-sm my-5 leading-[1.65] max-w-[280px] opacity-70 md:max-w-[240px] lg:max-w-[280px] xl:max-w-[350px]">
            {tl("description")}
          </p>
          <div className="flex flex-col items-start md:items-end lg:scale-110">
            <div className="detail-item bg-[rgba(0,128,0,0.119)] text-[rgb(31,226,31)] border-green-600">
              <div className="w-2 h-2 bg-green-400 rounded-4xl inline-block mr-2 animate-pulse shadow-green-600 motion-reduce:animate-none"></div>
              <p>{tl("detailitemone")}</p>
            </div>
            <div className="detail-item">
              <p>{tl("detailitemtwo")}</p>
            </div>
            <div className="detail-item bg-[rgba(81,10,102,0.32)] text-[rgb(221,0,255)] border-[rgba(221,0,255,0.618)]">
              <p>{tl("detailitemthree")}</p>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="arrow text-2xl rotate-90 inline-block mt-2"
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
