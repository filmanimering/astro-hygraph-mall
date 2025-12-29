// lib/hygraph.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = import.meta.env.PUBLIC_HYGRAPH_API_URL as string;
const client = new GraphQLClient(endpoint);

// --- Typer ---
export type TextSection = {
  __typename: 'TextSection';
  internalName?: string;
  content: { html: string };
};

export type CTASection = {
  __typename: 'CTASection';
  internalName?: string;
  heading: string;
  text: string;
  buttonLabel: string;
  buttonLink: string;
};

export type Section = TextSection | CTASection;

export type Page = {
  title: string;
  sections: Section[];
};

// --- Typ-guards ---
export function isTextSection(section: Section): section is TextSection {
  return section.__typename === 'TextSection';
}

export function isCTASection(section: Section): section is CTASection {
  return section.__typename === 'CTASection';
}

// --- Funktion för att hämta en Page ---
export async function getPage(slug: string): Promise<{ page: Page }> {
  const query = gql`
    query PageBySlug($slug: String!) {
      page(where: { slug: $slug }) {
        title
        sections {
          __typename
          ... on TextSection {
            internalName
            content { html }
          }
          ... on CTASection {
            internalName
            heading
            text
            buttonLabel
            buttonLink
          }
        }
      }
    }
  `;
  return client.request(query, { slug });
}
