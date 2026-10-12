import { notFound } from "next/navigation";

// Sem esta rota, um caminho desconhecido (ex.: /en/abc) cairia na 404 padrão do Next,
// fora do layout; assim ele usa a 404 localizada de app/[locale]/not-found.tsx
export default function CatchAll() {
  notFound();
}
