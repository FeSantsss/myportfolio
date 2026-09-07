import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

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

const SITE_URL = "https://felipysantsss.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  // Caminho canônico por idioma: o locale padrão (pt) fica sem prefixo
  // (localePrefix: "as-needed"), os demais levam o prefixo do locale.
  const canonicalPath = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalPath,
      languages: {
        pt: "/",
        en: "/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      siteName: "Felipy Santos",
      url: canonicalPath,
      images: [
        {
          // icon.png tem 500x500px — dimensões reais do arquivo.
          url: `${SITE_URL}/icon.png`,
          width: 500,
          height: 500,
          alt: "Felipy Santos — Full-Stack Developer",
        },
      ],
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      // "summary" é o card correto para uma imagem quadrada (500x500);
      // "summary_large_image" espera ~2:1 e distorceria o preview.
      card: "summary",
      title: t("title"),
      description: t("twitterDescription"),
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
              jobTitle: "Full-Stack Developer",
              description: t("jsonLdDescription"),
              knowsAbout: [
                "Next.js",
                "React",
                "TypeScript",
                "Java",
                "Spring Boot",
              ],
              sameAs: [
                "https://github.com/FeSantsss",
                "https://linkedin.com/in/felipysantsss",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
