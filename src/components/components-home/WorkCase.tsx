import { useTranslations } from "next-intl";
import Image from "next/image";

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
  const tl = useTranslations("");

  const projects = tl.raw("workcases") as WorkCaseProps[];

  if (!projects) return <div>Erro ao carregar os dados do projeto.</div>;

  return (
    <div className="mx-2.5 flex flex-col gap-6 contain-paint transform-gpu md:gap-8">
      {projects.map((project) => (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`full case of ${project.title}`}
          key={project.id}
          className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-mybeige/60 focus-visible:ring-offset-4 focus-visible:ring-offset-myblack"
        >
          <article className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1b16] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-500 group-hover:border-white/20 group-hover:bg-[#232018] xl:flex-row">
            <div className="flex flex-col justify-between gap-6 p-6 text-mybeige md:p-8 xl:w-1/2">
              <div>
                {/* Índice e período, como uma linha de metadados */}
                <div className="flex items-center gap-3 font-[montserrat] text-[11px] uppercase tracking-[0.2em] text-mybeige/55">
                  <span className="transition-colors duration-500 group-hover:text-mybeige">
                    {String(project.id).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-8 bg-mybeige/25 transition-[width,background-color] duration-500 group-hover:w-12 group-hover:bg-mybeige/60 motion-reduce:transition-none"
                  />
                  <span>{project.data}</span>
                </div>

                <h3
                  translate="no"
                  className="mt-4 font-[chillax] text-3xl font-semibold leading-tight text-balance md:text-4xl xl:text-3xl 2xl:text-4xl"
                >
                  {project.title}
                </h3>

                <p className="mt-4 max-w-[62ch] font-[montserrat] text-[13px] leading-relaxed tracking-wide text-mybeige/75 md:text-sm">
                  {project.description}
                </p>
              </div>

              {project.stack && project.stack.length > 0 && (
                <ul className="flex flex-wrap gap-2 font-[montserrat]">
                  {project.stack.map((item) => (
                    <li
                      translate="no"
                      key={item}
                      className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-wider text-mybeige/80 md:text-xs"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative h-56 overflow-hidden border-t border-white/[0.06] md:h-72 xl:h-auto xl:w-1/2 xl:shrink-0 xl:border-t-0 xl:border-l">
              {project.imageSrc && (
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1280px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover saturate-0 will-change-transform transition-[transform,filter] duration-700 ease-out group-hover:scale-[1.04] group-hover:saturate-100 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              )}
              {/* Leve vinheta para o botão de seta se destacar sobre qualquer capa */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              />
              <div className="absolute right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-black/20 backdrop-blur-md transition-[background-color,border-color,transform] duration-500 group-hover:scale-110 group-hover:border-white group-hover:bg-white motion-reduce:group-hover:scale-100">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="-rotate-45 text-mywhite transition-[transform,color] duration-500 group-hover:rotate-0 group-hover:text-myblack"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M2 8H14M14 8L8 2M14 8L8 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
}
