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
          image { url }
          layout
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
        ... on SectionVideoGrid {
        numberOfColumns  
        videos {
            title
            videoUrl
            description {
              html
            }
            # Om du vill ha med din thumbnail också
            thumbnail {
              url
            }
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