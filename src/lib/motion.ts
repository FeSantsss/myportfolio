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
 * Chama `onEnter` uma vez para cada elemento quando o topo dele passa de 88% da tela,
 * ou quando ele já está todo visível (o que cobre o fim da página, onde nada chega a 88%).
 * Os elementos que entram juntos chegam no mesmo lote, na ordem do documento.
 * O IntersectionObserver trabalha fora da rolagem: nada roda a cada quadro.
 */
export function onceInView(
  targets: Element[],
  onEnter: (entered: Element[]) => void,
) {
  const observer = new IntersectionObserver(
    (entries) => {
      const entered = entries
        .filter(
          (entry) =>
            entry.isIntersecting &&
            (entry.boundingClientRect.top <= window.innerHeight * 0.88 ||
              entry.intersectionRatio >= 0.99),
        )
        .map((entry) => entry.target);
      if (!entered.length) return;
      entered.forEach((el) => observer.unobserve(el));
      onEnter(entered);
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );
  targets.forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}

/**
 * Revela, quando entram na tela, os elementos do escopo marcados com:
 * - data-reveal="up": sobe e aparece
 * - data-reveal="mask": sobe por trás do pai (o pai precisa de overflow-hidden)
 * - data-reveal="line": a linha se desenha (data-origin="center" para abrir do meio)
 * - data-reveal="chars": as letras de um <SplitChars> sobem uma a uma
 * - data-reveal-stagger no pai: os filhos entram em sequência ("pop" para tags)
 * Aqui só se troca uma classe; as transições estão em globals.css.
 * Chame dentro de gsap.matchMedia().add(MOTION_OK, ...) e devolva a limpeza.
 */
export function observeReveals(scope: HTMLElement) {
  const elements = Array.from(
    scope.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]"),
  );
  if (!elements.length) return () => {};

  // Índice de cada filho, usado no atraso em sequência
  elements.forEach((el) => {
    if (!el.hasAttribute("data-reveal-stagger")) return;
    Array.from(el.children).forEach((child, i) =>
      (child as HTMLElement).style.setProperty("--reveal-i", String(i)),
    );
  });

  // A máscara desloca o próprio elemento; observa o pai, que fica parado
  const watched = new Map<Element, HTMLElement>();
  elements.forEach((el) =>
    watched.set(
      el.dataset.reveal === "mask" && el.parentElement ? el.parentElement : el,
      el,
    ),
  );

  const stop = onceInView([...watched.keys()], (entered) =>
    entered.forEach((el) => watched.get(el)?.classList.add("is-revealed")),
  );
  scope.dataset.revealScope = "ready";

  return () => {
    stop();
    // Se o movimento reduzido for ligado com a página aberta, tudo volta a aparecer
    delete scope.dataset.revealScope;
  };
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
