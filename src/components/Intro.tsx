"use client";

import { useState, useEffect } from "react";

export function Intro() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Tempo que a tela fica ativa (ex: 2 segundos)
    const timerShow = setTimeout(() => {
      setFadeOut(true); // Ativa a animação de sumiço
    }, 2000);

    // 2. Tempo para deletar o componente da tela após a animação acabar (mais 500ms)
    const timerRemove = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timerShow);
      clearTimeout(timerRemove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`intro ${fadeOut ? ` ${fadeOut}` : ""}`}>
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
