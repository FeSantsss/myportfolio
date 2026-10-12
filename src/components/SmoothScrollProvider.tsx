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
  useLenis(ScrollTrigger.update);

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
        // `autoRaf: false` (dirigido manualmente pelo gsap.ticker) trava o
        // scroll por wheel nesta versão do Lenis: o preventDefault do
        // wheel acontece, mas a posição de scroll nunca é de fato
        // aplicada. `autoRaf: true` deixa o próprio Lenis rodar seu loop
        // de rAF, que é o caminho testado/suportado pela lib.
        autoRaf: true,
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
