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
          buttonStyle 
          heroLayout
          bgBild { 
            url 
            width
            height
          }
        }
        ... on SectionText {
          id
          textLayout
          content { 
            html 
          }
          image { 
            url 
          }
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
          id
          numberOfColumns  
          textVideoGrid
          titleVideoGrid
          videos {
            title 
            videoUrl
            description {
              html
            }
            thumbnail {
              url
            }
          }
        }  
        ... on SectionInfoCardGrid {
            id
            title
            description  
            infoCardLayout
            buttonStyle           
            cards {
              ... on InfoCard {
                id
                title
                text
                poster { 
                  url
                  width
                  height
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