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

// Variant types for PDP
export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: SelectedOption[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

// Full product detail type for PDP
export interface ProductDetail {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  priceRange: PriceRange;
  compareAtPriceRange: {
    minVariantPrice: Money;
  } | null;
  featuredImage: ShopifyImage | null;
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ProductVariant;
    }[];
  };
  options: ProductOption[];
}

// GraphQL Response Types
export interface CollectionByHandleResponse {
  collection: Collection | null;
}

export interface ProductByHandleResponse {
  product: ProductDetail | null;
}

export interface ShopifyResponse<T> {
  data: T;
  errors?: {
    message: string;
    locations: { line: number; column: number }[];
  }[];
}
