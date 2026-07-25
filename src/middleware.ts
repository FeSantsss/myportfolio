import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "pt"],
  defaultLocale: "pt",
});

export const config = {
  // Ignora pastas internas do Next.js e arquivos estáticos
  matcher: ["/", "/(pt|en)/:path*"],
};
