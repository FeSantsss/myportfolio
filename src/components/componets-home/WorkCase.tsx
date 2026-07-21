import Image from "next/image";
import projectsData from "@/data/works.json";

interface WorkCaseProps {
  id: number;
  imageSrc: string;
  data: string;
  title: string;
  description: string;
  stack: string[];
  url: string;
}

export function WorkCase() {
  const projects = projectsData as WorkCaseProps[];

  if (!projects) return <div>Erro ao carregar os dados do projeto.</div>;

  return (
    <div className="mx-2.5">
      {projects.map((project) => (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`full case of ${project.title}`}
          key={project.id}
        >
          <div className="group/image group/arrow mb-10 rounded-2xl bg-[#1e1b16] border-[rgba(255,251,244,0.08)] flex flex-col flex-1 cursor-pointer xl:flex-row  xl:justify-between border duration-700 hover:bg-[#232018] hover:border-[rgba(255,251,244,0.2)]">
            <div className="mb-8 p-2.5 text-mybeige flex flex-col md:gap-6">
              <span className="block mb-2.5 font-montserrat text-sm opacity-20 duration-500 group-hover/image:opacity-80">
                {`0${project.id}`} -
              </span>
              <span className="font-[montserrat] uppercase opacity-50 md:-mt-3.5 xl:ml-4">
                {project.data}
              </span>
              <h3
                translate="no"
                className="font-[chillax] text-3xl my-2.5 font-semibold md:text-5xl xl:ml-4"
              >
                {project.title}
              </h3>
              <p className="font-[montserrat] text-xs mb-9 max-w-[500px] md:text-sm xl:ml-4">
                {project.description}
              </p>
              {project.stack && project.stack.length > 0 && (
                <div className="font-[montserrat] text-xs flex gap-2.5 flex-row flex-wrap md:text-sm xl:ml-4">
                  {project.stack.map((item, index) => (
                    <span
                      translate="no"
                      key={index}
                      className="border-[1px] border-mybeige opacity-80 rounded-2xl p-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="relative overflow-hidden h-64 md:h-80 xl:h-auto xl:w-1/2 rounded-2xl rounded-t-none rounded-tl-none xl:rounded-2xl xl:rounded-l-none xl:rounded-bl-none">
              {project.imageSrc && (
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  loading="lazy"
                  className="rounded-2xl rounded-t-none saturate-0 rounded-tl-none will-change-transform object-cover duration-700 group-hover/image:scale-105 xl:rounded-2xl xl:rounded-l-none xl:rounded-bl-none"
                />
              )}
              <div className="flex items-center justify-center  bg-[rgba(245,245,245,0.07)] border border-[rgba(255,255,255,0.87)] w-11 h-11 rounded-full will-change-transform absolute right-4 bottom-4 duration-1000 group-hover/arrow:scale-110 group-hover/arrow:bg-white">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="-rotate-45 duration-500 group-hover/arrow:rotate-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8H14M14 8L8 2M14 8L8 14"
                    stroke="#1a1712"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
