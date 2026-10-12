"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { MOTION_OK } from "@/lib/motion";

const defaultItems = [
  "NEXT.JS",
  "TYPESCRIPT",
  "JAVA",
  "SPRING BOOT",
  "FAST WEB APPLICATIONS",
  "SCALABLE SYSTEMS",
  "MODERN WEB PRODUCTS",
  "AVAILABLE FOR PROJECTS",
  "REMOTE WORLDWIDE",
  "PERFORMANCE",
  "USER EXPERIENCE",
  "CLEAN ARCHITECTURE",
  "WEB SYSTEMS",
  "RELIABLE SOFTWARE",
];

export function Marquee({ items = defaultItems }: { items?: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const settleRef = useRef<number | undefined>(undefined);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Uma volta = metade da faixa, porque os itens aparecem duas vezes
        loopRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });
        return () => {
          loopRef.current = null;
          window.clearTimeout(settleRef.current);
        };
      });
    },
    { scope: trackRef },
  );

  // A faixa corre mais rápido e inclina conforme a velocidade da rolagem
  useLenis(({ velocity }) => {
    const loop = loopRef.current;
    const track = trackRef.current;
    if (!loop || !track) return;

    const speed = Math.min(Math.abs(velocity), 40);
    gsap.to(loop, {
      timeScale: 1 + speed * 0.25,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(track, {
      skewX: gsap.utils.clamp(-10, 10, -velocity * 0.3),
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Sem rolagem por um instante, volta ao ritmo normal e endireita
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      gsap.to(loop, {
        timeScale: 1,
        duration: 0.8,
        ease: "power2.out",
        overwrite: true,
      });
      gsap.to(track, {
        skewX: 0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
      });
    }, 150);
  });

  return (
    <div
      className="overflow-hidden w-full bg-[#ffffff00] border-y-[0.5px] border-[rgba(190,190,190,0.488)] py-3.5 select-none mt-10"
      aria-hidden="true"
    >
      <div ref={trackRef} className="flex w-max">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-5 px-5 font-[montserrat] text-[0.68rem] tracking-widest text-mybeige flex-nowrap uppercase"
          >
            <span className="text-mywhite tracking-widest"> • </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
