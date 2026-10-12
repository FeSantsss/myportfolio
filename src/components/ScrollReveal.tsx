"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { MOTION_OK, observeReveals } from "@/lib/motion";

// Aplica as revelações de rolagem (data-reveal) a um trecho renderizado no servidor
export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (ref.current) return observeReveals(ref.current);
      });
    },
    { scope: ref },
  );

  return <div ref={ref}>{children}</div>;
}
