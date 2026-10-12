import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Ritmo único do site: entradas desaceleram ao chegar, linhas se desenham, saídas aceleram
export const EASE = {
  reveal: "expo.out",
  draw: "power3.inOut",
  exit: "power3.in",
} as const;

export const DURATION = { quick: 0.5, base: 0.9, slow: 1.2 } as const;
export const STAGGER = { char: 0.03, tight: 0.05, base: 0.08 } as const;

// Com movimento reduzido nada disso roda e o conteúdo já aparece no lugar
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
// Efeitos que seguem o mouse ficam de fora no toque
export const FINE_POINTER =
  "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

// Revela quando o topo do elemento entra nos últimos 12% da tela. O clamp() garante o
// disparo de quem fica tão no fim da página que nunca chegaria a essa altura (ex.: rodapé)
export const START = "clamp(top 88%)";

// O hero avisa quando a abertura termina, para o header entrar junto com ele
const HERO_READY_EVENT = "felipy:hero-ready";

export function announceHeroReady() {
  window.dispatchEvent(new Event(HERO_READY_EVENT));
}

export function onHeroReady(callback: () => void) {
  window.addEventListener(HERO_READY_EVENT, callback, { once: true });
  return () => window.removeEventListener(HERO_READY_EVENT, callback);
}

/**
 * Revela, quando entram na tela, os elementos do escopo marcados com:
 * - data-reveal="up": sobe e aparece
 * - data-reveal="mask": sobe por trás do pai (o pai precisa de overflow-hidden)
 * - data-reveal="line": a linha se desenha (data-origin="center" para abrir do meio)
 * - data-reveal="chars": as letras de um <SplitChars> sobem uma a uma
 * - data-reveal-stagger no pai: os filhos entram em sequência ("pop" para tags)
 * Chame dentro de gsap.matchMedia().add(MOTION_OK, ...).
 */
export function revealOnScroll(scope: Element) {
  const all = (selector: string) =>
    Array.from(scope.querySelectorAll<HTMLElement>(selector));
  const once = (trigger: Element) => ({ trigger, start: START, once: true });

  // Opacidade (e não autoAlpha) para o conteúdo continuar acessível a leitores de tela
  all('[data-reveal="up"]').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 32,
      duration: DURATION.base,
      ease: EASE.reveal,
      scrollTrigger: once(el),
    });
  });

  all('[data-reveal="mask"]').forEach((el) => {
    gsap.from(el, {
      yPercent: 110,
      duration: DURATION.slow,
      ease: EASE.reveal,
      scrollTrigger: once(el.parentElement ?? el),
    });
  });

  all('[data-reveal="line"]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: el.dataset.origin === "center" ? "50% 50%" : "0% 50%",
      duration: DURATION.slow,
      ease: EASE.draw,
      scrollTrigger: once(el),
    });
  });

  all('[data-reveal="chars"]').forEach((el) => {
    gsap.from(el.querySelectorAll(".split-char"), {
      yPercent: 120,
      opacity: 0,
      duration: DURATION.slow,
      ease: EASE.reveal,
      stagger: STAGGER.char,
      scrollTrigger: once(el),
    });
  });

  all("[data-reveal-stagger]").forEach((group) => {
    const pop = group.dataset.revealStagger === "pop";
    gsap.from(group.children, {
      opacity: 0,
      y: pop ? 12 : 24,
      scale: pop ? 0.9 : 1,
      duration: pop ? DURATION.quick : DURATION.base,
      ease: pop ? "back.out(1.6)" : EASE.reveal,
      stagger: pop ? STAGGER.char : STAGGER.base,
      scrollTrigger: once(group),
    });
  });
}

/**
 * Puxa o alvo levemente na direção do cursor enquanto ele passa sobre a área.
 * Chame dentro de gsap.matchMedia().add(FINE_POINTER, ...) e devolva a limpeza.
 */
export function magnetic(
  target: HTMLElement,
  {
    area = target,
    strength = 0.3,
    max = 12,
  }: { area?: HTMLElement; strength?: number; max?: number } = {},
) {
  const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "power3.out" });
  const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "power3.out" });
  const clamp = gsap.utils.clamp(-max, max);

  const onMove = (event: PointerEvent) => {
    const box = target.getBoundingClientRect();
    xTo(clamp((event.clientX - (box.left + box.width / 2)) * strength));
    yTo(clamp((event.clientY - (box.top + box.height / 2)) * strength));
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  area.addEventListener("pointermove", onMove);
  area.addEventListener("pointerleave", onLeave);
  return () => {
    area.removeEventListener("pointermove", onMove);
    area.removeEventListener("pointerleave", onLeave);
  };
}
