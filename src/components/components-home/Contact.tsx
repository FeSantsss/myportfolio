"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import contacts from "@/data/contacts.json";
import { useTranslations } from "next-intl";
import { DURATION, EASE, MOTION_OK, STAGGER } from "@/lib/motion";
import { SplitChars } from "../SplitChars";

interface contactProps {
  name: string;
  link: string;
}

export function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contact = contacts as contactProps[];
  const tl = useTranslations("contact");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // A chamada sobe letra por letra, linha após linha, e os contatos vêm em seguida
        gsap
          .timeline({
            defaults: { ease: EASE.reveal },
            scrollTrigger: {
              trigger: ".contactTitle",
              start: "clamp(top 75%)",
              once: true,
            },
          })
          .from(".contactTitle .split-char", {
            yPercent: 120,
            opacity: 0,
            duration: DURATION.slow,
            stagger: STAGGER.char * 0.8,
          })
          .from(
            ".contacts",
            {
              opacity: 0,
              y: 20,
              duration: DURATION.base,
              stagger: STAGGER.base,
            },
            "-=0.7",
          );
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
          aria-label={`${tl("got")} ${tl("a")} ${tl("project")} ${tl("inMind")} ${tl("letsBuild")}`}
          className="contactTitle block font-[chillax] text-mybeige font-bold text-right"
        >
          <span className="block lowercase">
            <span className="block overflow-hidden pb-2">
              <span className="textWork block text-[clamp(2.5rem,16vw,4.5rem)] md:text-8xl lg:text-9xl">
                <SplitChars text={tl("got")} />
              </span>
            </span>

            <span className="block overflow-hidden -mt-3.5">
              <span className="textWork block text-5xl -mb-2.5 md:text-7xl lg:text-8xl">
                <SplitChars text={tl("a")} />
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="textWork block text-[clamp(2.5rem,16vw,4.5rem)] mb-1 tracking-widest md:text-8xl lg:text-9xl">
                <SplitChars text={tl("project")} />
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="textWork block text-5xl md:text-7xl lg:text-8xl">
                <SplitChars text={tl("inMind")} />
              </span>
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="titleContact block text-[clamp(2.25rem,12vw,4.5rem)] mt-2.5 lowercase md:text-8xl lg:text-9xl">
              <SplitChars text={tl("letsBuild")} />
            </span>
          </span>
        </h2>
        <div
          translate="no"
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
