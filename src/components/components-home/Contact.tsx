"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, type CSSProperties } from "react";
import contacts from "@/data/contacts.json";
import { useTranslations } from "next-intl";
import {
  FINE_POINTER,
  magnetic,
  MOTION_OK,
  observeReveals,
} from "@/lib/motion";
import { SplitChars } from "../SplitChars";

interface contactProps {
  name: string;
  link: string;
}

export function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contact = contacts as contactProps[];
  const tl = useTranslations("contact");

  // Linhas da chamada; cada uma continua a contagem de letras da anterior para entrarem em sequência
  const lines = [
    tl("got"),
    tl("a"),
    tl("project"),
    tl("inMind"),
    tl("letsBuild"),
  ];
  const offsets = lines.map(
    (_, i) => lines.slice(0, i).join("").replace(/\s/g, "").length,
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // A chamada sobe letra por letra, linha após linha, e os contatos vêm em seguida (CSS)
      mm.add(MOTION_OK, () => {
        if (pageRef.current) return observeReveals(pageRef.current);
      });

      // Cada link de contato é puxado levemente na direção do cursor
      mm.add(FINE_POINTER, () => {
        const cleanups = gsap.utils
          .toArray<HTMLElement>(".contacts")
          .map((item) => {
            const link = item.querySelector<HTMLElement>(".link-line");
            return link
              ? magnetic(link, { area: item, strength: 0.35, max: 8 })
              : () => {};
          });
        return () => cleanups.forEach((cleanup) => cleanup());
      });
    },
    { scope: pageRef },
  );

  if (contact.length === 0) {
    return (
      <div className="text-xs flex flex-row justify-between items-center mt-2 px-1.5 text-mybeige">
        Error
      </div>
    );
  }

  return (
    <>
      <section
        ref={pageRef}
        id="contact"
        className="pt-40 pb-2 contain-paint transform-gpu max-w-[1900px] mx-2 -mb-10 lg:px-2 2xl:mx-auto"
      >
        {/* Um único título com a frase inteira; as linhas são só visuais */}
        <h2
          aria-label={lines.join(" ")}
          data-reveal="chars"
          style={{ "--char-delay": "20ms" } as CSSProperties}
          className="contactTitle block font-[chillax] text-mybeige font-bold text-right"
        >
          <span className="block lowercase">
            <span className="block overflow-hidden pb-2">
              <span className="textWork block text-[clamp(2.5rem,16vw,4.5rem)] md:text-8xl lg:text-9xl">
                <SplitChars text={lines[0]} offset={offsets[0]} />
              </span>
            </span>

            <span className="block overflow-hidden -mt-3.5">
              <span className="textWork block text-5xl -mb-2.5 md:text-7xl lg:text-8xl">
                <SplitChars text={lines[1]} offset={offsets[1]} />
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="textWork block text-[clamp(2.5rem,16vw,4.5rem)] mb-1 tracking-widest md:text-8xl lg:text-9xl">
                <SplitChars text={lines[2]} offset={offsets[2]} />
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="textWork block text-5xl md:text-7xl lg:text-8xl">
                <SplitChars text={lines[3]} offset={offsets[3]} />
              </span>
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="titleContact block text-[clamp(2.25rem,12vw,4.5rem)] mt-2.5 lowercase md:text-8xl lg:text-9xl">
              <SplitChars text={lines[4]} offset={offsets[4]} />
            </span>
          </span>
        </h2>
        <div
          translate="no"
          data-reveal-stagger
          className="font-[montserrat] text-mywhite text-sm opacity-70 flex flex-col gap-5 mx-2.5 mt-10 md:flex-row"
        >
          {contact.map((item) => (
            <div className="contacts" key={item.name}>
              <div className=" group link-line">
                <a className="" href={item.link}>
                  {item.name}
                </a>
                <span className="inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
                  <svg
                    aria-hidden
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
