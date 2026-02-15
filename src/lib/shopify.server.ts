import { createServerFn } from "@tanstack/react-start";
import {
  getAllCollections as _getAllCollections,
  getAllProducts as _getAllProducts,
  getProductByHandle as _getProductByHandle,
  getCollectionProducts as _getCollectionProducts,
} from "./shopify";

/**
 * Server functions ensure Shopify API calls always run on the server,
 * where process.env is available. Without this, TanStack Router loaders
 * would re-run on the client after hydration, where process.env is empty.
 */

export const fetchAllCollections = createServerFn({
  method: "GET",
}).handler(async () => {
  return _getAllCollections();
});

export const fetchAllProducts = createServerFn({
  method: "GET",
}).handler(async () => {
  return _getAllProducts();
});

export const fetchProductByHandle = createServerFn({
  method: "GET",
}).handler(async ({ data: handle }: { data: string }) => {
  return _getProductByHandle(handle);
});

export const fetchCollectionProducts = createServerFn({
  method: "GET",
}).handler(async ({ data: handle }: { data: string }) => {
  return _getCollectionProducts(handle);
});
