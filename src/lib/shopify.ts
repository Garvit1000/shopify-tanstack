import {
  Collection,
  CollectionByHandleResponse,
  CollectionNode,
  Product,
  ProductByHandleResponse,
  ProductDetail,
  ShopifyResponse,
  SimpleCollection,
  SimpleProduct,
} from "./types";

function getShopifyConfig() {
  const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !storefrontAccessToken) {
    throw new Error(
      "Missing Shopify env vars: VITE_SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN"
    );
  }

  return {
    endpoint: `https://${domain}/api/2024-01/graphql.json`,
    storefrontAccessToken,
  };
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const { endpoint, storefrontAccessToken } = getShopifyConfig();

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

const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      productType
      tags
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
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
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
 * Fetch a single product by its handle
 */
export async function getProductByHandle(handle: string): Promise<ProductDetail | null> {
  const data = await shopifyFetch<ProductByHandleResponse>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );

  return data.product;
}

/**
 * Get all product handles for static generation
 */
export async function getAllProductHandles(): Promise<string[]> {
  const products = await getAllProducts(100);
  return products.map((p) => p.handle);
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
