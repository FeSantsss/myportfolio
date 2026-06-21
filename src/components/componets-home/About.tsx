import { ExperienceAbout } from "./ExperienceAbout";
import skillsData from "@/data/skills.json"; // Import direto

export async function About() {
  return (
    <section
      id="about"
      className="pt-18 mx-2.5 md:mx-13 md:pt-30 lg:px-2 2xl:max-w-[1900px] 2xl:mx-auto 2xl:px-20 2xl:pt-22"
    >
      <span className="subtitles -mb-15 xl:-mb-20">III - my journey</span>
      <h2 className="font-['chillax'] mt-16 mb-15 font-bold text-mybeige text-6xl md:mt-18 md:text-7xl lg:mt-23 lg:text-8xl lg:mb-20">
        About
        <div className="w-full h-[.5px] mt-3 opacity-20 bg-mybeige"></div>
      </h2>
      <div className="flex flex-col gap-10 text-mybeige font-[montserrat] xl:flex-row xl:justify-between">
        <div className="max-w-[800px] opacity-70">
          <p>
            I started my development journey in <strong>2025</strong> with a
            strong focus on back-end engineering, studying <strong>Java</strong>
            ,<strong> Spring Boot</strong>, <strong> APIs</strong>,
            <strong> databases</strong>, and
            <strong> software architecture</strong>.
          </p>
          <br />
          <p>
            Later, an opportunity to work on front-end projects at{" "}
            <strong>Saints Films </strong>
            introduced me to a different side of web development.
          </p>
          <br />
          <p>
            What began with HTML, CSS, and JavaScript quickly evolved into
            building modern applications with <strong>Next.js</strong>,{" "}
            <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>,
            <strong> Framer Motion</strong>, and <strong>Sanity CMS</strong>.
          </p>
          <br />
          <p>
            My work is driven by simplicity, motion, and{" "}
            <strong>attention to detail</strong>. I enjoy creating{" "}
            <strong>creative and minimalist</strong> digital experiences where
            design and development work together seamlessly.
          </p>
          <br />
          <p>
            Most of my skills have been developed through hands-on{" "}
            <strong>projects</strong>,<strong> freelance work</strong>,
            technical documentation, online courses, and
            <strong> continuous self-learning.</strong>
          </p>
        </div>
        <div className="w-full">
          <span className="subtitles">experience</span>
          <ExperienceAbout
            title="saintsfilms"
            role="developer/designer freelancer"
            data="2025 - 2026/jun"
          />
          <span className="subtitles mt-8">skills</span>

          <div className="flex flex-row flex-wrap gap-2.5 mt-4 px-1.5 max-w-[500px]">
            {skillsData.map((skill: string, index: number) => (
              <span
                translate="no"
                key={index}
                className="text-xs opacity-50 w-fit h-fit p-1 border-[0.5px] border-mywhite rounded-2xl"
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
