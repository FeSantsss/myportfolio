import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

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
      "Engenheiro de Software que constrói aplicações web rápidas, escaláveis e centradas no cliente com Next.js, React, TypeScript e Spring Boot. Full-stack, obcecado por detalhes e disponível para oportunidades internacionais.",
    ogDescription:
      "Next.js · React · TypeScript · Spring Boot. Desenvolvo software limpo, performático e escalável — da arquitetura de backend a interfaces polidas e animadas.",
    twitterDescription:
      "Engenheiro de Software atuando com React, TypeScript, Java e Spring Boot. Código limpo, design intencional, sistemas escaláveis.",
    jobTitle: "Engenheiro de Software",
    personDescription:
      "Engenheiro de Software especializado em desenvolvimento web full-stack com Next.js, React, TypeScript, Java e Spring Boot. Disponível para oportunidades internacionais.",
    keywords: [
      "engenheiro de software",
      "desenvolvedor full-stack",
      "desenvolvedor React",
      "desenvolvedor Next.js",
      "TypeScript",
      "Spring Boot",
      "desenvolvedor Java",
      "engenheiro backend",
      "engenheiro frontend",
      "portfólio desenvolvedor",
      "desenvolvedor remoto",
      "engenheiro de software Brasil",
      "Felipy Santos",
    ],
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = locale === "en" ? seoCopy.en : seoCopy.pt;
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
  const ogLocale = locale === "en" ? "en_US" : "pt_BR";

  return {
    title: copy.title,
    description: copy.description,
    keywords: [...copy.keywords],
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        pt: "/",
        "x-default": "/",
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      siteName: "Felipy Santos",
      url: path,
      images: [
        {
          url: `${SITE_URL}/icon.png`,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.twitterDescription,
      images: [`${SITE_URL}/icon.png`],
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

const chillax = localFont({
  src: [
    {
      path: "../fonts/Chillax-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
});

const montserrat = localFont({
  src: [
    {
      path: "../fonts/Montserrat-VariableFont_wght.ttf",
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
  const { locale } = await params;

  // Garante que a renderização estática e o i18n funcionem em sincronia
  setRequestLocale(locale);

  // Carrega as mensagens do dicionário (pt.json / en.json)
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "metadata" });

  const copy = locale === "en" ? seoCopy.en : seoCopy.pt;

  return (
    <html
      lang={locale}
      className={`${chillax.variable} ${montserrat.variable}`}
    >
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <main>
            <Header />
            <SmoothScrollProvider>{children}</SmoothScrollProvider>
          </main>
        </NextIntlClientProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Felipy Santos",
              url: SITE_URL,
              image: `${SITE_URL}/icon.png`,
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
