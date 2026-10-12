import { Fragment } from "react";

// Texto quebrado em letras para a entrada letra por letra. Cada palavra é uma máscara
// (clip-path com folga para acentos e descendentes) de onde as letras sobem.
// O React continua dono das letras, então a troca de idioma sem recarregar funciona.
// As letras ficam escondidas de leitores de tela: o título que as usa precisa de
// aria-label com o texto inteiro (buscadores leem as próprias letras, sem duplicar).
export function SplitChars({ text }: { text: string }) {
  return (
    <span aria-hidden key={text}>
      {text.split(" ").map((word, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="split-word inline-block whitespace-nowrap [clip-path:inset(-0.35em_-0.15em_-0.3em_-0.15em)]">
            {Array.from(word).map((char, c) => (
              <span key={c} className="split-char inline-block">
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
