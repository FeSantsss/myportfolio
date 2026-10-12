"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollChildren {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollChildren) {
  // Avisamos o ScrollTrigger pra recalcular a cada scroll do Lenis.
  // Isso garante leitura 1:1 da posição real, sem lag de 1 frame.
  // O hook só registra o callback quando a instância já existe; ler
  // `ref.current.lenis` num useEffect de montagem pegava `undefined`.
  const lenis = useLenis(ScrollTrigger.update);

  // Um laço só: o Lenis roda no ticker do GSAP, antes das animações. Assim cada
  // quadro rola, lê a posição e só depois escreve estilos, sem recálculo de
  // layout forçado no meio do quadro (com dois laços de rAF, o scrollTo do
  // Lenis vinha depois das escritas do GSAP e forçava layout a cada quadro).
  useEffect(() => {
    if (!lenis) return;
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update, false, true);
    return () => gsap.ticker.remove(update);
  }, [lenis]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
    // As fontes mudam a altura dos textos: recalcula os gatilhos quando terminam de carregar
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <ReactLenis
      root
      options={{
        // Dirigido pelo gsap.ticker (acima). A roda "travava" antes porque o
        // raf era chamado numa instância ainda indefinida, lida do ref no
        // useEffect de montagem; agora a instância vem do useLenis.
        autoRaf: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 1,
        syncTouch: false,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
