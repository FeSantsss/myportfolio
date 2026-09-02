"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollChildren {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollChildren) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Copiamos o ref para uma variável local: o valor lido no cleanup
    // precisa ser o mesmo lido na montagem, não o que `lenisRef.current`
    // tiver no momento do unmount.
    const lenisInstance = lenisRef.current;

    // avisamos o ScrollTrigger pra recalcular a cada scroll do Lenis.
    // Isso garante leitura 1:1 da posição real, sem lag de 1 frame.
    function onScroll() {
      ScrollTrigger.update();
    }

    // O GSAP ticker se torna a ÚNICA fonte de tempo do app.
    // Isso elimina qualquer dessincronia entre dois loops de RAF concorrentes.
    function update(time: number) {
      lenisInstance?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    lenisInstance?.lenis?.on("scroll", onScroll);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
      lenisInstance?.lenis?.off("scroll", onScroll);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
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
