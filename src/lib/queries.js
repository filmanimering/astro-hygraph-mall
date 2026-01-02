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
          heroText
          heroTitel      
          buttonLabel
          buttonUrl
          bgBild { 
            url 
            width   # Tillagt för Hero
            height  # Tillagt för Hero
          }
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
                poster { 
                  url
                  width   # Tillagt för Cards
                  height  # Tillagt för Cards
                }
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
          videoUrlLink  # Extern länk till video
          poster { 
            url
            width   # Tillagt för Video-poster
            height  # Tillagt för Video-poster
          }
        }
      }
    }
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