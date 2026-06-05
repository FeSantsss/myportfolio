"use client";

import { useState, useEffect } from "react";
import styles from "../assets/intro.module.css";

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
    <div className={`${styles.intro}${fadeOut ? ` ${styles.fadeOut}` : ""}`}>
      <div className={styles.introCenter}>
        <div className={styles.introDot} />
        <div className={styles.introName} translate="no">
          Felipy Santos
        </div>
        <div className={styles.introLine} />
        <div className={styles.introSub}>Minimalist developer</div>
      </div>
    </div>
  );
}
