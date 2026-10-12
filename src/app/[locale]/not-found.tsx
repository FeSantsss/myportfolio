import { NotFoundView } from "@/components/NotFoundView";

// 404 localizada: caminhos desconhecidos dentro de um idioma (via [...rest]) e segmentos que não são idioma.
// O Next não lê metadata de not-found.tsx, por isso o título da aba é definido no próprio componente.
export default function NotFound() {
  return (
    <main>
      <NotFoundView />
    </main>
  );
}
