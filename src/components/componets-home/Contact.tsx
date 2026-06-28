"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();
      const TimelineCreatorMedia = (timeline: gsap.core.Timeline) => {
        timeline
          .from(".textWork", {
            opacity: 0,
            yPercent: 100,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.4,
          })
          .from(".titleContact", {
            opacity: 0,
            yPercent: 100,
            duration: 0.9,
            ease: "power4.out",
          })
          .from(
            ".contacts",
            {
              opacity: 0,
              x: -25,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.5,
            },
            "-=0.4",
          );
      };

      mm.add("(max-width: 1023px)", () => {
        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 20%",
            end: "bottom 90%",
          },
        });

        TimelineCreatorMedia(tlMobile);
      });

      mm.add("(min-width: 1024px)", () => {
        const tlDesktop = gsap.timeline({
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 20%",
            end: "bottom 90%",
            scrub: 2,
          },
        });

        TimelineCreatorMedia(tlDesktop);
      });
    },
    { scope: pageRef },
  );

  return (
    <section
      ref={pageRef}
      id="contact"
      className="pt-40 max-w-[1900px] mx-2 -mb-10 lg:px-2 2xl:mx-auto"
    >
      <div className="font-[chillax] text-mybeige font-bold text-right">
        <div className="lowercase">
          <div className="block overflow-hidden">
            <p className="textWork text-7xl md:text-8xl lg:text-9xl">got</p>
          </div>

          <div className="block overflow-hidden">
            <p className="textWork text-5xl -mb-2.5 md:text-7xl lg:text-8xl">
              a
            </p>
          </div>
          <div className="block overflow-hidden">
            <p className="textWork text-7xl mb-1 tracking-widest md:text-8xl lg:text-9xl">
              project
            </p>
          </div>
          <div className="block overflow-hidden">
            <p className="textWork text-5xl md:text-7xl lg:text-8xl">
              {" "}
              in mind?
            </p>
          </div>
        </div>
        <div className="block overflow-hidden">
          <h3 className="titleContact text-7xl mt-2.5 lowercase md:text-8xl lg:text-9xl">
            let's build together!
          </h3>
        </div>
      </div>
      <div
        translate="no"
        className="font-[montserrat] text-mywhite text-sm opacity-70 flex flex-col gap-5 mx-2.5 mt-10 md:flex-row"
      >
        <div className="contacts">
          <div className=" group link-line">
            <a className="" href="mailto:hello@felipysantsss.dev">
              hello@felipysantsss.dev
            </a>
            <span className="inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
              <svg
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
        <div className="contacts">
          <div className=" group link-line">
            <a
              className=""
              href="https://www.instagram.com/felipysantsss/"
              target="_blank"
            >
              instagram
            </a>
            <span className=" inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
              <svg
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
        <div className="contacts">
          <div className="group link-line">
            <a
              className=""
              href="https://www.linkedin.com/in/felipysantsss"
              target="_blank"
            >
              linkedIn
            </a>
            <span className=" inline-block transition-transform duration-500 ease-out ml-1 -rotate-45 translate-x-0 translate-y-0 group-hover:rotate-0">
              <svg
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
      </div>
    </section>
  );
}
