import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { Initialize } from "@/components/components-home/Initialize";
import { isLocale } from "@/i18n/locales";

const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.Footer),
);
const Contact = dynamic(() =>
  import("@/components/components-home/Contact").then((mod) => mod.Contact),
);
const About = dynamic(() =>
  import("@/components/components-home/About").then((mod) => mod.About),
);
const Work = dynamic(() =>
  import("@/components/components-home/Work").then((mod) => mod.Work),
);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Segmento que não é idioma (ex.: /favicon.ico): mostra a 404 dentro do layout
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // O header fica na página (e não no layout) porque os links dele apontam para as seções daqui
  return (
    <>
      <Header />
      <main>
        <Initialize />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
