import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/personalInfo";
import { getLastModified } from "@/lib/server-time";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: siteConfig.url,
      lastModified: await getLastModified(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
