import { Fragment, type CSSProperties } from "react";

// Texto quebrado em letras para a entrada letra por letra. Cada palavra é uma máscara
// (clip-path com folga para acentos e descendentes) de onde as letras sobem.
// O React continua dono das letras, então a troca de idioma sem recarregar funciona.
// As letras ficam escondidas de leitores de tela: o título que as usa precisa de
// aria-label com o texto inteiro (buscadores leem as próprias letras, sem duplicar).
// Cada letra leva seu índice em --i (o atraso da entrada no CSS); `offset` continua a
// contagem de uma linha anterior, para frases em várias linhas entrarem em sequência.
export function SplitChars({
  text,
  offset = 0,
}: {
  text: string;
  offset?: number;
}) {
  const words = text.split(" ").map((word, w, all) => ({
    chars: Array.from(word),
    start:
      offset +
      all.slice(0, w).reduce((sum, prev) => sum + Array.from(prev).length, 0),
  }));

  return (
    <span aria-hidden key={text}>
      {words.map(({ chars, start }, w) => (
        <Fragment key={w}>
          {w > 0 && " "}
          <span className="split-word inline-block whitespace-nowrap [clip-path:inset(-0.35em_-0.15em_-0.3em_-0.15em)]">
            {chars.map((char, c) => (
              <span
                key={c}
                className="split-char inline-block"
                style={{ "--i": start + c } as CSSProperties}
              >
                {char}
              </span>
            ))}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
