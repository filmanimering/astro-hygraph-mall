import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
// Importera din Hygraph-klient här
import { hygraph } from "../lib/hygraph";

export async function GET(context) {
  // Hämta inläggen direkt från Hygraph
  const { blogPosts } = await hygraph.request(`
      query GetRssPosts {
        blogPosts(orderBy: createdAt_DESC) {
          title
          slug
          seoDescription
          createdAt
        }
      }
    `);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blogPosts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.createdAt),
      description: post.seoDescription,
      // Länken bygger på din struktur /blog/slug
      link: `/blog/${post.slug}/`,
    })),
  });
}
