"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProjectDrawer, type Project } from "./ProjectDrawer";

// Quantas tags aparecem no card compacto; o resto fica na gaveta
const MAX_CARD_STACK = 4;

export function WorkCase() {
  const tl = useTranslations("");
  const tw = useTranslations("work");
  const [selected, setSelected] = useState<Project | null>(null);

  const projects = tl.raw("workcases") as Project[];

  if (!projects) return <div>Erro ao carregar os dados do projeto.</div>;

  return (
    <>
      <div className="mx-2.5 flex flex-col gap-4 contain-paint transform-gpu md:gap-5">
        {projects.map((project) => {
          const index = String(project.id).padStart(2, "0");
          const visibleStack = project.stack.slice(0, MAX_CARD_STACK);
          const hiddenCount = project.stack.length - visibleStack.length;

          return (
            <article
              key={project.id}
              className="workcase-card group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1b16] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-500 hover:border-white/20 hover:bg-[#211e18] has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-mybeige/60 has-[button:focus-visible]:ring-offset-4 has-[button:focus-visible]:ring-offset-myblack"
            >
              {/* Botão que cobre o card inteiro: mantém o conteúdo como HTML válido e o título como título */}
              <button
                type="button"
                onClick={() => setSelected(project)}
                aria-haspopup="dialog"
                aria-label={`${tw("openProject")}: ${project.title}`}
                className="absolute inset-0 z-10 cursor-pointer rounded-2xl outline-none"
              />

              {/* Linha de destaque no topo e brilho suave no canto, acesos no hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-mybeige/0 via-mybeige/70 to-mybeige/0 transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-mybeige/[0.07] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative flex gap-8 p-5 text-mybeige md:p-7 lg:gap-10">
                {/* Índice grande como âncora visual do card (tablet e desktop) */}
                <span
                  aria-hidden
                  className="hidden w-[4.5rem] shrink-0 font-[chillax] text-6xl leading-[0.8] font-semibold tracking-tight text-mybeige/15 transition-colors duration-500 group-hover:text-mybeige md:block lg:w-24 lg:text-7xl"
                >
                  {index}
                </span>

                <div className="flex flex-1 flex-col gap-5 lg:flex-row lg:items-end lg:gap-12">
                  <div className="flex-1">
                    {/* Linha de metadados; no celular o índice aparece aqui, pequeno */}
                    <div className="flex items-center gap-3 font-[montserrat] text-[11px] tracking-[0.2em] text-mybeige/55 uppercase">
                      <span className="transition-colors duration-500 group-hover:text-mybeige md:hidden">
                        {index}
                      </span>
                      <span
                        aria-hidden
                        className="h-px w-8 bg-mybeige/25 transition-[width,background-color] duration-500 group-hover:w-12 group-hover:bg-mybeige/60 motion-reduce:transition-none"
                      />
                      <span>{project.data}</span>
                    </div>

                    <h3
                      translate="no"
                      className="mt-4 font-[chillax] text-2xl leading-tight font-semibold text-balance md:text-3xl"
                    >
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 max-w-[62ch] font-[montserrat] text-[13px] leading-relaxed tracking-wide text-mybeige/70">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-4 lg:max-w-[46%] lg:shrink-0">
                    {project.stack.length > 0 && (
                      <ul className="flex flex-wrap gap-2 font-[montserrat] lg:justify-end">
                        {visibleStack.map((item) => (
                          <li
                            translate="no"
                            key={item}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] tracking-wider whitespace-nowrap text-mybeige/80 transition-colors duration-500 group-hover:border-white/20"
                          >
                            {item}
                          </li>
                        ))}
                        {hiddenCount > 0 && (
                          <li className="rounded-full px-1 py-1 text-[11px] tracking-wider whitespace-nowrap text-mybeige/55">
                            +{hiddenCount} {tw("more")}
                          </li>
                        )}
                      </ul>
                    )}

                    {/* Indica que o card abre os detalhes */}
                    <span
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-mybeige transition-[background-color,border-color,color] duration-500 group-hover:border-mybeige group-hover:bg-mybeige group-hover:text-myblack"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="-rotate-45 transition-transform duration-500 group-hover:rotate-0 motion-reduce:transition-none"
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
            </article>
          );
        })}
      </div>

      {selected && (
        <ProjectDrawer project={selected} onClosed={() => setSelected(null)} />
      )}
    </>
  );
}
