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
    storefrontAccessToken
  };
}
async function shopifyFetch(query, variables) {
  const { endpoint, storefrontAccessToken } = getShopifyConfig();
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken
    },
    body: JSON.stringify({ query, variables })
  });
  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }
  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  return json.data;
}
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
async function getCollectionProducts(handle, first = 50) {
  const data = await shopifyFetch(
    GET_COLLECTION_PRODUCTS,
    { handle, first }
  );
  if (!data.collection) {
    return { collection: null, products: [] };
  }
  const products = data.collection.products.edges.map(
    ({ node }) => ({
      id: node.id,
      title: node.title,
      handle: node.handle,
      description: node.description,
      price: node.priceRange.minVariantPrice.amount,
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
      image: node.featuredImage || node.images.edges[0]?.node || null
    })
  );
  return { collection: data.collection, products };
}
async function getAllProducts(first = 50) {
  const data = await shopifyFetch(
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
    image: node.featuredImage || node.images.edges[0]?.node || null
  }));
}
async function getAllCollections(first = 20) {
  const data = await shopifyFetch(
    GET_ALL_COLLECTIONS,
    { first }
  );
  return data.collections.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    description: node.description,
    image: node.image
  }));
}
async function getProductByHandle(handle) {
  const data = await shopifyFetch(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
  return data.product;
}
function formatPrice(amount, currencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode
  }).format(parseFloat(amount));
}
export {
  getAllProducts as a,
  getProductByHandle as b,
  getCollectionProducts as c,
  formatPrice as f,
  getAllCollections as g
};
