import type { MetadataRoute } from "next";

const SITE_URL = "https://felipysantsss.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          pt: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          pt: SITE_URL,
          en: `${SITE_URL}/en`,
        },
      },
    },
  ];
}
