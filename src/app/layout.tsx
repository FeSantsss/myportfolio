import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Felipy Santos | Minimalist Developer",
  description:
    "Felipy Santos - Minimalist Full-stack Developer crafting clean, efficient solutions. Open to opportunities.",
  keywords: ["developer", "full-stack", "minimalist", "portfolio"],
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
  },
  openGraph: {
    title: "Felipy Santos | Minimalist Developer",
    description:
      "Minimalist Full-stack Developer. Clean code, efficient solutions. Open to work.",
    siteName: "Felipy Santos",
    images: [
      {
        url: "/icon.jpg",
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
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
