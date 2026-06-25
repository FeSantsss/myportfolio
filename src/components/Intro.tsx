"use client";

import { useState, useEffect } from "react";

export function Intro() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Bloqueia o scroll do body assim que o componente entra na tela
    document.body.style.overflow = "hidden";

    // 1. Tempo que a tela fica ativa exibindo o conteúdo
    const timerShow = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // 2. Tempo para remover o componente (tempo do timerShow + tempo da animação CSS)
    const timerRemove = setTimeout(() => {
      setVisible(false);
      // Libera o scroll assim que a animação de sumiço termina
      document.body.style.overflow = "";
    }, 3300);

    // Cleanup: Garante que o scroll seja liberado se o usuário sair da página antes do fim
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timerShow);
      clearTimeout(timerRemove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro ${fadeOut ? "fadeOut" : ""}`}>
      <div className="introCenter">
        <div className="introDot" />
        <div className="introName" translate="no">
          Felipy Santos
        </div>
        <div className="introLine" />
        <div className="introSub">Minimalist developer</div>
      </div>
    </div>
  );
}
