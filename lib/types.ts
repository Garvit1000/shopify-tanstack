// Shopify Storefront API Types

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface PriceRange {
  minVariantPrice: Money;
  maxVariantPrice: Money;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  priceRange: PriceRange;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  featuredImage: ShopifyImage | null;
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string;
  products: {
    edges: {
      node: Product;
    }[];
  };
}

export interface CollectionNode {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
}

// Simplified product type for component usage
export interface SimpleProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: string;
  currencyCode: string;
  image: ShopifyImage | null;
}

// Simplified collection type for component usage
export interface SimpleCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
}

// GraphQL Response Types
export interface CollectionByHandleResponse {
  collection: Collection | null;
}

export interface ShopifyResponse<T> {
  data: T;
  errors?: {
    message: string;
    locations: { line: number; column: number }[];
  }[];
}
