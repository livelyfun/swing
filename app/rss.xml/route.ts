import { NextResponse } from "next/server";
import { getBaseUrl } from "@/lib/seo";
import { contentStore } from "@/lib/content-store";
import { getSiteSettings } from "@/lib/settings";

export async function GET() {
  const baseUrl = getBaseUrl();
  const settings = await getSiteSettings("es");
  const posts = contentStore.getPosts().filter((p) => p.status === "PUBLISHED");

  const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return c;
      }
    });
  };

  const itemsXml = posts
    .map((post) => {
      const title = escapeXml(post.title.es || post.title.ca);
      const description = escapeXml(post.excerpt.es || post.excerpt.ca);
      const link = `${baseUrl}/es/blog/${post.slug.es || post.slug.ca}`;
      const pubDate = new Date(post.publishedAt).toUTCString();

      return `
    <item>
      <title>${title}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${description}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(settings.email || "info@swingforndepa.cat")} (${escapeXml(settings.businessName)})</author>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(settings.businessName)} — Blog d'Obrador</title>
    <link>${baseUrl}/es/blog</link>
    <description>${escapeXml(settings.description || "Actualitat, tradició fornera i novetats de temporada a Badalona")}</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=14400",
    },
  });
}
