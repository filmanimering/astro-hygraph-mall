import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { hygraphFetch } from "../lib/hygraph";

export async function GET(context) {
  const query = /* GraphQL */ `
    query GetRssPosts {
      blogPosts(orderBy: createdAt_DESC) {
        title
        slug
        blogCategory {
          displayName
        }
        seo {
          seoDescription
        }
        createdAt
      }
    }
  `;

  const data = await hygraphFetch(query);
  const blogPosts = data.blogPosts;

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: blogPosts.map((post) => ({
      title: post.title,
      categories: post.category ? [post.category.displayName] : [],
      pubDate: new Date(post.createdAt),
      // Vi använder ?. för att säkert läsa seoDescription även om seo är null
      description: post.seo?.seoDescription || "Läs mer på vår hemsida",
      link: `/blog/${post.slug}/`,
    })),
  });
}
