"use client";

import { ExperienceAbout } from "./ExperienceAbout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import skillsData from "@/data/skills.json";
import { useTranslations } from "next-intl";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IExperience {
  id: string;
  image: string;
  name: string;
  role: string;
  date: string;
}

export function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const tl = useTranslations("about");
  // Cargos e datas vêm das mensagens para acompanhar o idioma do site
  const experiences = tl.raw("experiences") as IExperience[];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });

        tl.from(".title", {
          x: -30,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
        })
          .to(
            ".lines",
            {
              width: "100%",
              duration: 0.9,
              ease: "power3.inOut",
              stagger: 0.35,
            },
            "-=0.5",
          )
          .from(
            ".subtitles",
            {
              x: -25,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.15,
            },
            "-=1",
          )
          .from(
            ".experiences",
            {
              autoAlpha: 0,
              y: 25,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=1.3",
          )
          .from(
            ".aboutText",
            {
              y: 30,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.15,
            },
            "-=1.2",
          )
          .from(
            ".skills",
            {
              x: -20,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.04,
            },
            "-=1.4",
          )
          .from(
            ".cvCard",
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.6",
          );
      });
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        tl.from(".title", {
          x: -30,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
        })
          .to(
            ".lines",
            {
              width: "100%",
              duration: 0.4,
              ease: "power3.inOut",
              stagger: 1,
            },
            "-=0.2",
          )
          .from(
            ".subtitles",
            {
              x: -25,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.15,
            },
            "-=2.5",
          )
          .from(
            ".aboutText",
            {
              y: 30,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.3,
            },
            "-=2.4",
          )
          .from(
            ".experiences",
            {
              autoAlpha: 0,
              y: 25,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=1",
          )
          .from(
            ".skills",
            {
              x: -20,
              autoAlpha: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.04,
            },
            "-=0.8",
          )
          .from(
            ".cvCard",
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.4",
          );
      });
    },
    { scope: pageRef },
  );

  return (
    <section
      ref={pageRef}
      id="about"
      className="pt-18 mx-2.5 contain-paint md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20">{tl("journey")}</span>
      <h2
        translate="no"
        className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20"
      >
        <span className="title">{tl("title")}</span>
        <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      </h2>
      <div className="flex flex-col gap-10 text-mybeige font-[montserrat] xl:flex-row xl:justify-between md:text-xl">
        <div className=" max-w-[800px] opacity-60 leading-6 md:leading-7 lg:leading-8 tracking-wide">
          <p className="aboutText">
            {tl.rich("description1", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <br />
          <p className="aboutText">
            {tl.rich("description2", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <br />
          <p className="aboutText">
            {tl.rich("description3", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <br />
          <p className="aboutText">
            {tl.rich("description4", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
          <br />
          <p className="aboutText">
            {tl.rich("description5", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>
        <div className="w-full">
          <span className="subtitles">{tl("experienceTitle")}</span>
          <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
          <div className="experiences mt-4">
            {experiences.map((exp: IExperience) => (
              <ExperienceAbout
                key={exp.id}
                image={exp.image}
                name={exp.name}
                role={exp.role}
                date={exp.date}
              />
            ))}
          </div>

          <span className="subtitles mt-8">{tl("skillsTitle")}</span>
          <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
          <div className="flex flex-row flex-wrap gap-2.5 mt-4 px-1.5 max-w-[500px]">
            {skillsData.map((skill: string, index: number) => (
              <span
                translate="no"
                key={index}
                className="skills text-xs tracking-widest opacity-40 w-fit h-fit p-1 border-[0.8px] border-mywhite rounded-2xl"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Currículo: o arquivo vem das mensagens, então acompanha o idioma do site */}
          <span className="subtitles mt-8">cv</span>
          <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
          <div className="cvCard mt-4 flex max-w-[500px] flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#1e1b16] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mybeige"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 3v5h5M9 13h6M9 17h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="leading-tight">
                <p translate="no" className="text-sm text-mybeige">
                  Felipy Santos — CV
                </p>
                <p className="mt-1 text-[11px] tracking-wider text-mybeige/55">
                  {tl("cv.meta")}
                  {tl.has("cv.note") && <> · {tl("cv.note")}</>}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={tl("cv.file")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tl("cv.viewLabel")}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-xs tracking-wider text-mybeige outline-none transition-colors duration-300 hover:border-white/40 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-mybeige/60 sm:flex-none"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {tl("cv.view")}
              </a>
              <a
                href={tl("cv.file")}
                download="felipy-santos-cv.pdf"
                aria-label={tl("cv.downloadLabel")}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-mybeige px-4 text-xs font-medium tracking-wider text-myblack outline-none transition-colors duration-300 hover:bg-mywhite focus-visible:ring-2 focus-visible:ring-mybeige/60 focus-visible:ring-offset-2 focus-visible:ring-offset-myblack sm:flex-none"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {tl("cv.download")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
