"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProjectDrawer, type Project } from "./ProjectDrawer";

// Quantas tags aparecem na caixa; o resto fica na gaveta
const MAX_CARD_STACK = 4;

// Classes estáticas para o Tailwind gerar cada largura do grid de 6 colunas
const SPAN_CLASS: Record<number, string> = {
  6: "lg:col-span-6",
  3: "lg:col-span-3",
  2: "lg:col-span-2",
};

// Padrão do desktop: uma linha com 2 caixas grandes, depois uma com 3 menores, e repete.
// Numa linha incompleta, as caixas dividem a largura igualmente para não sobrar buraco.
function getLayout(index: number, total: number) {
  const cycleStart = Math.floor(index / 5) * 5;
  const isLarge = index - cycleStart < 2;
  const rowStart = isLarge ? cycleStart : cycleStart + 2;
  const rowSize = Math.min(isLarge ? 2 : 3, total - rowStart);

  return { isLarge, span: 6 / rowSize };
}

export function WorkCase() {
  const tl = useTranslations("");
  const tw = useTranslations("work");
  const [selected, setSelected] = useState<Project | null>(null);

  const projects = tl.raw("workcases") as Project[];

  if (!projects) return <div>Erro ao carregar os dados do projeto.</div>;

  return (
    <>
      <div className="mx-2.5 grid grid-cols-1 gap-4 contain-paint transform-gpu md:grid-cols-2 md:gap-5 lg:grid-cols-6">
        {projects.map((project, i) => {
          const index = String(project.id).padStart(2, "0");
          const visibleStack = project.stack.slice(0, MAX_CARD_STACK);
          const hiddenCount = project.stack.length - visibleStack.length;
          const { isLarge, span } = getLayout(i, projects.length);
          // No tablet (2 colunas), a última caixa de uma lista ímpar ocupa a linha inteira
          const isLastOdd = i === projects.length - 1 && projects.length % 2 === 1;

          return (
            <article
              key={project.id}
              className={`workcase-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1e1b16] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-500 hover:border-white/20 hover:bg-[#211e18] has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-mybeige/60 has-[button:focus-visible]:ring-offset-4 has-[button:focus-visible]:ring-offset-myblack min-h-[320px] md:min-h-[360px] ${
                isLarge ? "lg:min-h-[420px]" : "lg:min-h-[360px]"
              } ${isLastOdd ? "md:col-span-2" : ""} ${SPAN_CLASS[span]}`}
            >
              {/* Botão que cobre a caixa inteira: mantém o conteúdo como HTML válido e o título como título */}
              <button
                type="button"
                onClick={() => setSelected(project)}
                aria-haspopup="dialog"
                aria-label={`${tw("openProject")}: ${project.title}`}
                className="absolute inset-0 z-10 cursor-pointer rounded-2xl outline-none"
              />

              {/* Número grande, propositalmente cortado na borda esquerda */}
              <span
                aria-hidden
                className={`pointer-events-none absolute top-5 -left-[0.1em] font-[chillax] leading-[0.8] font-semibold tracking-tight text-mybeige/10 transition-colors duration-700 select-none group-hover:text-mybeige/90 motion-reduce:transition-none text-[7.5rem] ${
                  isLarge ? "lg:text-[11rem]" : "lg:text-[9rem]"
                }`}
              >
                {index}
              </span>

              {/* Linha de destaque no topo e brilho suave no canto, acesos no hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-mybeige/0 via-mybeige/70 to-mybeige/0 transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mybeige/[0.07] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              {/* Conteúdo alinhado embaixo, deixando o topo para o número */}
              <div className="relative mt-auto flex flex-col gap-6 p-6 pt-36 text-mybeige md:p-7 md:pt-40">
                <div>
                  <div className="flex items-center gap-3 font-[montserrat] text-[11px] tracking-[0.2em] text-mybeige/55 uppercase">
                    <span
                      aria-hidden
                      className="h-px w-8 bg-mybeige/25 transition-[width,background-color] duration-500 group-hover:w-12 group-hover:bg-mybeige/60 motion-reduce:transition-none"
                    />
                    <span>{project.data}</span>
                  </div>

                  <h3
                    translate="no"
                    className={`mt-4 font-[chillax] text-2xl leading-tight font-semibold text-balance ${
                      isLarge ? "lg:text-4xl" : "lg:text-2xl"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 max-w-[62ch] font-[montserrat] text-[13px] leading-relaxed tracking-wide text-mybeige/70">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-end justify-between gap-4">
                  {project.stack.length > 0 && (
                    <ul className="flex flex-wrap gap-2 font-[montserrat]">
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

                  {/* Indica que a caixa abre os detalhes */}
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
