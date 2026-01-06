import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
// Ändra importen så den matchar namnet i din hygraph.js-fil
import { hygraphFetch } from "../lib/hygraph";

export async function GET(context) {
  // Skapa din query
  const query = `
    query GetRssPosts {
      blogPosts(orderBy: createdAt_DESC) {
        title
        slug
        seoDescription
        createdAt
      }
    }
  `;

  // Använd din hygraphFetch-funktion istället för .request()
  const data = await hygraphFetch(query);
  const blogPosts = data.blogPosts;

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blogPosts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.createdAt),
      description: post.seoDescription,
      link: `/blog/${post.slug}/`,
    })),
  });
}
