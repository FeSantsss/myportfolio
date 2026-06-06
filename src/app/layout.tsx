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
  title: "Felipy Santos - Minimalist Developer",
  description:
    "Felipy Santos - Minimalist Full-stack Developer crafting clean, efficient solutions. Open to opportunities.",
  keywords: ["developer", "full-stack", "minimalist", "portfolio"],
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Felipy Santos | Minimalist Developer",
    description:
      "Minimalist Full-stack Developer. Clean code, efficient solutions. Open to work.",
    siteName: "Felipy Santos",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Felipy Santos - Minimalist Developer",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  authors: [{ name: "Felipy Santos" }],
  creator: "Felipy Santos",
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
      </body>
    </html>
  );
}
