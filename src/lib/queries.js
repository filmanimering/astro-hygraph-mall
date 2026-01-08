// src/lib/queries.js

/**
 * Fragment för Globala inställningar.
 * Detta gör att vi slipper repetera samma fält i varje query.
 */
const GLOBAL_SETTINGS_FRAGMENT = /* GraphQL */ `
  globalSettings {
    siteName
    logo {
      url
      width
      height
    }
    siteFavicon {
      url
      width
      height
    }
    navigation {
      ... on Navigation {
        label
        url
      }
    }
     navigationRight {
      ... on Navigation {
        label
        url
      }
    }
    seo {
      seoTitle
      seoDescription
      ogImage {
        url
      }
    }
  }
`;

// 1. Query för vanliga landningssidor (Home, Om oss, etc.)
export const PAGE_QUERY = /* GraphQL */ `
  query GetPage($slug: String!) {
    page(where: { slug: $slug }) {
      title
      seo {
        seoTitle
        seoDescription
        ogImage { url }        
      }
      sections {
        __typename
        ... on SectionHero {
          heroText
          heroTitel
          buttonLabel
          buttonUrl
          buttonStyle
          buttonLabel2
          buttonUrl2
          buttonStyle2
          heroLayout
          videoUploadedUrl { url }
          videoPoster { url }
          bgBild { url width height }
        }
        ... on SectionText {
          id
          textLayout
          buttonTitleTextSection
          buttonLinkTextSection
          content { html }
          image { url }
          imageCards {
            imageCardBild { 
              url 
              width
              height
            }
            imageCardTitle
            imageCardText
          }
        }
        ... on SectionImageGrid {
          title
          description
          numberOfColumns
          images { url width height altText }
        }
        ... on SectionVideoGrid {
          id
          numberOfColumns
          textVideoGrid
          titleVideoGrid
          videoStyle
          videos { 
            title 
            videoUploadedUrl { url } 
            videoText 
            thumbnail { url } }
        }
        ... on SectionInfoCardGrid {
          id
          title
          description
          infoCardLayout
          cardColor { hex }
          buttonStyle
          cards {
            ... on InfoCard {
              id title text buttonLabel buttonLink
              poster { url width height }
            }
          }
        }
      }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
  }
`;

// 2. Query för blogg-listan
export const BLOG_LIST_QUERY = /* GraphQL */ `
  query GetBlogData {
    blogPosts(orderBy: publishedDate_DESC) {
      title
      slug
      blogCategory { 
        displayName 
        slug
      }
      publishedDate
      excerpt
      coverImage {
        url
      }
    }
    # Hämta alla tillgängliga bloggkategorier till menyn
    blogCategories {
      displayName
      slug
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
  }
`;

// 3. Query för enskilda blogginlägg
export const SINGLE_POST_QUERY = /* GraphQL */ `
  query GetSinglePost($slug: String!) {
    blogPost(where: { slug: $slug }) {
      title
      excerpt
      blogCategory { 
        displayName
        slug
      }
      coverImage {
        url
      }
      publishedDate
      content { html }
      seo {
        seoTitle
        seoDescription
        ogImage { url }        
      }
    }
    allPosts: blogPosts(first: 4, orderBy: publishedDate_DESC) {
      title
      excerpt
      slug
      publishedDate
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
  }
`;

export const CATEGORY_POSTS_QUERY = /* GraphQL */ `
  query GetCategoryPosts($slug: String!) {
    blogPosts(
      where: { blogCategory: { slug: $slug } }
      orderBy: publishedDate_DESC
    ) {
      title
      slug
      publishedDate
      coverImage {
        url
      }
      excerpt
      blogCategory {
        displayName
        slug
      }
    }
    # Hämta alla tillgängliga bloggkategorier till menyn
    blogCategories {
      displayName
      slug
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
  }
`;

// 4. Ren query för endast globala inställningar (vid behov)
export const SETTINGS_QUERY = /* GraphQL */ `
  query GetSettings {
    ${GLOBAL_SETTINGS_FRAGMENT}
  }
`;
