import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { LocaleProvider } from "@/components/LocaleProvider";
import {
  getMessages,
  getTimeZone,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { htmlLang, isLocale, type Locale } from "@/i18n/locales";

const SITE_URL = "https://felipysantsss.vercel.app";

const seoCopy = {
  en: {
    title: "Felipy Santos — Software Engineer",
    description:
      "Software Engineer building fast, scalable web applications with Next.js, React, TypeScript and Spring Boot. Full-stack, detail-obsessed, and available for international opportunities.",
    ogDescription:
      "Next.js · React · TypeScript · Spring Boot. I engineer clean, performant, scalable software — from backend architecture to polished, animated interfaces.",
    twitterDescription:
      "Software Engineer working across React, TypeScript, Java & Spring Boot. Clean code, intentional design, scalable systems.",
    jobTitle: "Software Engineer",
    personDescription:
      "Software Engineer specializing in full-stack web development with Next.js, React, TypeScript, Java and Spring Boot. Available for international opportunities.",
    keywords: [
      "software engineer",
      "full-stack software engineer",
      "full-stack developer",
      "React developer",
      "Next.js developer",
      "TypeScript",
      "Spring Boot",
      "Java developer",
      "backend engineer",
      "frontend engineer",
      "web developer portfolio",
      "remote software engineer",
      "Brazil software engineer",
      "Felipy Santos",
    ],
  },
  pt: {
    title: "Felipy Santos — Engenheiro de Software",
    description:
      "Engenheiro de Software que constrói aplicações web rápidas, escaláveis e centradas no cliente com Next.js, React, TypeScript e Spring Boot. Full-stack, obcecado pelo detalhe e disponível para oportunidades internacionais.",
    ogDescription:
      "Next.js · React · TypeScript · Spring Boot. Desenvolvo software limpo, eficiente e escalável — da arquitetura de backend a interfaces cuidadas e animadas.",
    twitterDescription:
      "Engenheiro de Software a trabalhar com React, TypeScript, Java e Spring Boot. Código limpo, design intencional, sistemas escaláveis.",
    jobTitle: "Engenheiro de Software",
    personDescription:
      "Engenheiro de Software especializado em desenvolvimento web full-stack com Next.js, React, TypeScript, Java e Spring Boot. Disponível para oportunidades internacionais.",
    keywords: [
      "engenheiro de software",
      "programador full-stack",
      "programador React",
      "programador Next.js",
      "TypeScript",
      "Spring Boot",
      "programador Java",
      "engenheiro backend",
      "engenheiro frontend",
      "portefólio programador",
      "programador remoto",
      "engenheiro de software Brasil",
      "Felipy Santos",
    ],
  },
  es: {
    title: "Felipy Santos — Ingeniero de Software",
    description:
      "Ingeniero de Software que desarrolla aplicaciones web rápidas, escalables y centradas en el cliente con Next.js, React, TypeScript y Spring Boot. Full-stack, obsesionado con el detalle y disponible para oportunidades internacionales.",
    ogDescription:
      "Next.js · React · TypeScript · Spring Boot. Desarrollo software limpio, eficiente y escalable: desde la arquitectura backend hasta interfaces pulidas y animadas.",
    twitterDescription:
      "Ingeniero de Software que trabaja con React, TypeScript, Java y Spring Boot. Código limpio, diseño intencional, sistemas escalables.",
    jobTitle: "Ingeniero de Software",
    personDescription:
      "Ingeniero de Software especializado en desarrollo web full-stack con Next.js, React, TypeScript, Java y Spring Boot. Disponible para oportunidades internacionales.",
    keywords: [
      "ingeniero de software",
      "desarrollador full-stack",
      "desarrollador React",
      "desarrollador Next.js",
      "TypeScript",
      "Spring Boot",
      "desarrollador Java",
      "ingeniero backend",
      "ingeniero frontend",
      "portfolio desarrollador",
      "desarrollador remoto",
      "ingeniero de software Brasil",
      "Felipy Santos",
    ],
  },
} as const;

const ogLocales = { pt: "pt_PT", en: "en_US", es: "es_ES" } as const;

// Imagem de compartilhamento única, em inglês, para todos os idiomas
const shareImage = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Felipy Santos — Software Engineer. Fast, scalable web applications with Next.js and Spring Boot.",
};

// Título e descrição por idioma, para o LocaleProvider atualizar o <head> na troca de idioma
const documentMeta = Object.fromEntries(
  routing.locales.map((l) => [
    l,
    { title: seoCopy[l].title, description: seoCopy[l].description },
  ]),
) as Record<Locale, { title: string; description: string }>;

function resolveLocale(locale: string): Locale {
  return isLocale(locale) ? locale : routing.defaultLocale;
}

// Gera as três versões no build, em vez de renderizar a cada visita
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteLocale = resolveLocale(locale);
  const copy = seoCopy[siteLocale];
  const path = siteLocale === routing.defaultLocale ? "/" : `/${siteLocale}`;
  const ogLocale = ogLocales[siteLocale];

  return {
    title: copy.title,
    description: copy.description,
    keywords: [...copy.keywords],
    icons: {
      icon: [{ url: "/mylogo.svg", type: "image/svg+xml" }],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        "pt-PT": "/",
        "es-ES": "/es",
        "x-default": "/",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      siteName: "Felipy Santos",
      url: path,
      images: [shareImage],
      locale: ogLocale,
      alternateLocale: Object.values(ogLocales).filter((l) => l !== ogLocale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.twitterDescription,
      images: [shareImage],
      creator: "@felipysantsss",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    authors: [{ name: "Felipy Santos", url: SITE_URL }],
    creator: "Felipy Santos",
    category: "technology",
  };
}

// WOFF2 em vez de TTF; a Montserrat foi recortada para o conjunto latino (PT, ES, EN).
// Para outro alfabeto, gere um novo recorte a partir da fonte original do Google Fonts.
const chillax = localFont({
  src: [
    {
      path: "../fonts/Chillax-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
});

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-Variable-Latin.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: siteLocale } = await params;

  // Caminhos com ponto (ex.: /favicon.ico) não passam pelo proxy e chegam aqui como idioma
  if (!isLocale(siteLocale)) notFound();

  // Garante que a renderização estática e o i18n funcionem em sincronia
  setRequestLocale(siteLocale);

  // Carrega as mensagens do dicionário (pt.json / en.json / es.json)
  const messages = await getMessages();
  const timeZone = await getTimeZone();

  const copy = seoCopy[siteLocale];

  return (
    <html
      lang={htmlLang[siteLocale]}
      className={`${chillax.variable} ${montserrat.variable}`}
    >
      <body suppressHydrationWarning>
        <LocaleProvider
          initialLocale={siteLocale}
          initialMessages={messages}
          timeZone={timeZone}
          documentMeta={documentMeta}
        >
          <Header />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </LocaleProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Felipy Santos",
              url: SITE_URL,
              image: "https://felipysantsss.vercel.app/icon.png",
              jobTitle: copy.jobTitle,
              description: copy.personDescription,
              email: "mailto:felipysantos@proton.me",
              knowsAbout: [
                "Software Engineering",
                "Java",
                "Spring",
                "Docker",
                "Next.js",
                "GSAP",
                "TypeScript",
                "Tailwind CSS",
                "Sanity CMS",
                "Responsive Design",
                "Creative Front-End",
              ],
              knowsLanguage: ["pt-BR", "en"],
              address: {
                "@type": "PostalAddress",
                addressRegion: "Pernambuco",
                addressCountry: "BR",
              },
              worksFor: {
                "@type": "Organization",
                name: "Saints Films",
              },
              sameAs: [
                "https://github.com/FeSantsss",
                "https://www.linkedin.com/in/felipysantsss",
                "https://www.instagram.com/felipysantsss/",
                "https://www.behance.net/tercetime/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
