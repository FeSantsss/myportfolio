import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Header } from "@/components/Header";

const chillax = localFont({
  src: [
    {
      path: "./fonts/Chillax-Variable.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});

const montserrat = localFont({
  src: [
    {
      path: "./fonts/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Felipy Santos — Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, TypeScript & Spring Boot. Crafting clean, performant interfaces and scalable backends. Available for international opportunities.",
  keywords: [
    "full-stack developer",
    "frontend developer",
    "React developer",
    "TypeScript",
    "Spring Boot",
    "Java developer",
    "minimalist developer",
    "portfolio",
    "Brazil developer",
    "remote developer",
    "UI developer",
    "web developer",
    "Felipy Santos",
  ],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
  metadataBase: new URL("https://felipysantos-snowy.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Felipy Santos — Full-Stack Developer",
    description:
      "React · TypeScript · Spring Boot. Clean code, intentional design, scalable solutions. Available for international work.",
    siteName: "Felipy Santos",
    url: "https://felipysantos-snowy.vercel.app",
    images: [
      {
        url: "https://felipysantos-snowy.vercel.app/icon.png",
        width: 1200,
        height: 630,
        alt: "Felipy Santos — Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felipy Santos — Full-Stack Developer",
    description:
      "React · TypeScript · Spring Boot. Clean code, intentional design. Open to international opportunities.",
    images: ["https://felipysantos-snowy.vercel.app/icon.png"],
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
  authors: [
    { name: "Felipy Santos", url: "https://felipysantos-snowy.vercel.app" },
  ],
  creator: "Felipy Santos",
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <main>
          <Header />
          {children}
        </main>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Felipy Santos",
              url: "https://felipysantos-snowy.vercel.app",
              jobTitle: "Full-Stack Developer",
              description:
                "Full-Stack Developer specializing in React, TypeScript and Spring Boot. Available for international opportunities.",
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
