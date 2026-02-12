import {
  Collection,
  CollectionByHandleResponse,
  CollectionNode,
  Product,
  ShopifyResponse,
  SimpleCollection,
  SimpleProduct,
} from "./types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-01/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  return json.data;
}

// GraphQL Queries
const GET_ALL_PRODUCTS = `
  query getAllProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

const GET_ALL_COLLECTIONS = `
  query getAllCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const GET_COLLECTION_PRODUCTS = `
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetch products from a collection by its handle
 * @param handle - The collection handle (e.g., "shoes", "shirts")
 * @param first - Number of products to fetch (default: 50)
 */
export async function getCollectionProducts(
  handle: string,
  first: number = 50
): Promise<{ collection: Collection | null; products: SimpleProduct[] }> {
  const data = await shopifyFetch<CollectionByHandleResponse>(
    GET_COLLECTION_PRODUCTS,
    { handle, first }
  );

  if (!data.collection) {
    return { collection: null, products: [] };
  }

  // Transform to simplified product format
  const products: SimpleProduct[] = data.collection.products.edges.map(
    ({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: node.priceRange.minVariantPrice.amount,
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
      image: node.featuredImage || node.images.edges[0]?.node || null,
    })
  );

  return { collection: data.collection, products };
}

/**
 * Fetch all products from the store
 * @param first - Number of products to fetch (default: 50)
 */
export async function getAllProducts(first: number = 50): Promise<SimpleProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: Product }[] } }>(
    GET_ALL_PRODUCTS,
    { first }
  );

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    price: node.priceRange.minVariantPrice.amount,
    currencyCode: node.priceRange.minVariantPrice.currencyCode,
    image: node.featuredImage || node.images.edges[0]?.node || null,
  }));
}

/**
 * Fetch all collections from the store
 * @param first - Number of collections to fetch (default: 20)
 */
export async function getAllCollections(first: number = 20): Promise<SimpleCollection[]> {
  const data = await shopifyFetch<{ collections: { edges: { node: CollectionNode }[] } }>(
    GET_ALL_COLLECTIONS,
    { first }
  );

  return data.collections.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: node.image,
  }));
}

/**
 * Format price with currency
 */
export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}
