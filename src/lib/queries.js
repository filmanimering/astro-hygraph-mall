// src/lib/queries.js

export const PAGE_QUERY = `
  query GetPage($slug: String!) {
    page(where: {slug: $slug}) {
      title
      sections {
        __typename
        ... on SectionHero {
          heroText { markdown }
          buttonLabel
          buttonUrl
          bgBild { url }
        }
        ... on SectionText {
          content { markdown }
        }
        ... on SectionImageGrid {
          title
          description
          numberOfColumns
          images {
            url
            width
            height
          }
        }
         ... on SectionInfoCardGrid {
              id
              beskrivning
              buttonLabel
              buttonLink
              poster {
                url
              }
              title
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
    globalSettings(where: {id: "din-id"}) {
      siteName
      footerText
    }
  }
`;