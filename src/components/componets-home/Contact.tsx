"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import contacts from "@/data/contacts.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface contactProps {
  name: string;
  link: string;
}

export function Contact() {
  const pageRef = useRef<HTMLDivElement>(null);
  const contact = contacts as contactProps[];

  if (!contacts) {
    return <div>Erro ao carregar os dados do projeto.</div>;
  }

  if (!contacts) return null;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 20%",
          end: "bottom 90%",
        },
      });

      tl.from(".textWork", {
        opacity: 0,
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
      })
        .from(
          ".titleContact",
          {
            opacity: 0,
            yPercent: 100,
            duration: 1.3,
            ease: "expo.out",
          },
          "-=0.6",
        )
        .from(
          ".contacts",
          {
            opacity: 0,
            x: -30,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.5",
        );
    },
    { scope: pageRef },
  );

  return (
    <>
      <section
        ref={pageRef}
        id="contact"
        className="pt-40 max-w-[1900px] mx-2 -mb-10 lg:px-2 2xl:mx-auto"
      >
        <div className="font-[chillax] text-mybeige font-bold text-right">
          <div className="lowercase">
            <div className="block overflow-hidden pb-2">
              <p className="textWork text-7xl md:text-8xl lg:text-9xl">got</p>
            </div>

            <div className="block overflow-hidden -mt-3.5">
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
          <div className="block overflow-hidden pb-2">
            <h3 className="titleContact text-7xl mt-2.5 lowercase md:text-8xl lg:text-9xl">
              let's build together!
            </h3>
          </div>
        </div>
        <div
          translate="no"
          className="font-[montserrat] text-mywhite text-sm opacity-70 flex flex-col gap-5 mx-2.5 mt-10 md:flex-row"
        >
          {contact.map((item, index) => (
            <div className="contacts" key={index}>
              <div className=" group link-line">
                <a className="" href={item.link}>
                  {item.name}
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
          ))}
        </div>
      </section>
    </>
  );
}
