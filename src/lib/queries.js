// src/lib/queries.js

export const PAGE_QUERY = `
  query GetPage($slug: String!) {
    page(where: {slug: $slug}) {
      title
      seo {
        seoTitle
        seoDescription
        ogImage { url }
        noIndex
      }
      sections { 
        __typename
        ... on SectionHero {
          heroText { html }
          buttonLabel
          buttonUrl
          bgBild { url }
        }
        ... on SectionText {
          content { html }
        }
        ... on SectionImageGrid {
          title
          description 
          numberOfColumns
          images {
            url
            width
            height
            altText
          }
        }
          ... on SectionInfoCardGrid {
              id
              title
              description
              cards {
                ... on InfoCard {
                  id
                  title
                  text
                  poster {  url}
                  buttonLabel
                  buttonLink
                }
              }
        }
        ... on SectionVideo {
          id
          title
          text
          video { url }
          poster { url }
        }
      }
    }
    # Vi kan även passa på att hämta globala inställningar här om vi vill
    globalSettings {
      siteName
      logo {
        url
        width
        height
      }
      contactInfo {
        html
      }
      navigation {
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
      footerText
    }
  }
`;