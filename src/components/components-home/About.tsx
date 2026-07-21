"use client";

import { ExperienceAbout } from "./ExperienceAbout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experiences.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface IExperience {
  id: string;
  name: string;
  role: string;
  date: string;
}

export function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const experiences = Array.isArray(experienceData)
    ? (experienceData as IExperience[])
    : [];

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
            "-=0.6",
          )
          .from(
            ".experiences",
            {
              autoAlpha: 0,
              y: 25,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.7",
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
            "-=1",
          );
      });
      mm.add("(max-width: 1023px)", () => {
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
            "-=2.4",
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
            "-=2.2",
          )
          .from(".experiences", {
            autoAlpha: 0,
            y: 25,
            duration: 0.8,
            ease: "power3.out",
          })
          .from(".skills", {
            x: -20,
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.04,
          });
      });
    },
    { scope: pageRef },
  );

  if (experiences.length === 0) {
    return (
      <div className="text-xs flex flex-row justify-between items-center mt-2 px-1.5 text-mybeige">
        Experiences not found
      </div>
    );
  }

  return (
    <section
      ref={pageRef}
      id="about"
      className="pt-18 mx-2.5 contain-paint md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20">III - my journey</span>
      <h2
        translate="no"
        className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20"
      >
        <span className="title">About</span>
        <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      </h2>
      <div className="flex flex-col gap-10 text-mybeige font-[montserrat] xl:flex-row xl:justify-between md:text-xl">
        <div className=" max-w-[800px] opacity-70">
          <p className="aboutText">
            I started my development journey in <strong>2025</strong> with a
            strong focus on back-end engineering, studying <strong>Java</strong>
            , <strong>Spring Boot</strong>, <strong>APIs</strong>,
            <strong> databases</strong> and
            <strong> software architecture</strong>.
          </p>
          <br />
          <p className="aboutText">
            Later, an opportunity to work on front-end projects at{" "}
            <strong>Saints Films </strong>
            introduced me to a different side of web development.
          </p>
          <br />
          <p className="aboutText">
            What began with HTML, CSS, and JavaScript quickly evolved into
            building modern applications with <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>,{" "}
            <strong> GSAP</strong>, and <strong>Sanity CMS</strong>.
          </p>
          <br />
          <p className="aboutText">
            My work is driven by simplicity, motion, and{" "}
            <strong>attention to detail</strong>. I enjoy creating{" "}
            <strong>creative and minimalist</strong> digital experiences where
            design and development work together seamlessly.
          </p>
          <br />
          <p className="aboutText">
            Most of my skills have been developed through hands-on{" "}
            <strong>projects</strong>, <strong>freelance work</strong>,
            technical documentation, online courses, and
            <strong> continuous self-learning.</strong>
          </p>
        </div>
        <div className="w-full">
          <span className="subtitles">experience</span>
          <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
          <div className="experiences">
            {experiences.map((exp: IExperience) => (
              <ExperienceAbout
                key={exp.id}
                name={exp.name}
                role={exp.role}
                date={exp.date}
              />
            ))}
          </div>

          <span className="subtitles mt-8">skills</span>
          <div className="lines w-0 h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
          <div className="flex flex-row flex-wrap gap-2.5 mt-4 px-1.5 max-w-[500px]">
            {skillsData.map((skill: string, index: number) => (
              <span
                translate="no"
                key={index}
                className="skills text-xs opacity-40 w-fit h-fit p-1 border-[0.8px] border-mywhite rounded-2xl"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
