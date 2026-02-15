import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "../server.js";
import { g as getAllCollections, a as getAllProducts, b as getProductByHandle, c as getCollectionProducts } from "./shopify-DAIn6Zat.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
import "@tanstack/react-router";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchAllCollections_createServerFn_handler = createServerRpc({
  id: "e724719524cbd839cefab90e2518e8ccfae8b02227ffec81ff5cb52f75df5844",
  name: "fetchAllCollections",
  filename: "src/lib/shopify.server.ts"
}, (opts) => fetchAllCollections.__executeServer(opts));
const fetchAllCollections = createServerFn({
  method: "GET"
}).handler(fetchAllCollections_createServerFn_handler, async () => {
  return getAllCollections();
});
const fetchAllProducts_createServerFn_handler = createServerRpc({
  id: "68bbe8711f592ea3daf5fb7ba10796f5300b88aed9d24a71de20c6b0673ca3f5",
  name: "fetchAllProducts",
  filename: "src/lib/shopify.server.ts"
}, (opts) => fetchAllProducts.__executeServer(opts));
const fetchAllProducts = createServerFn({
  method: "GET"
}).handler(fetchAllProducts_createServerFn_handler, async () => {
  return getAllProducts();
});
const fetchProductByHandle_createServerFn_handler = createServerRpc({
  id: "e9b3dc3a393c18b28ebf9ad287f63e4efca92e306282e43db467dd5d81854334",
  name: "fetchProductByHandle",
  filename: "src/lib/shopify.server.ts"
}, (opts) => fetchProductByHandle.__executeServer(opts));
const fetchProductByHandle = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(fetchProductByHandle_createServerFn_handler, async ({
  data
}) => {
  return getProductByHandle(data);
});
const fetchCollectionProducts_createServerFn_handler = createServerRpc({
  id: "ee46203de31f34f06425287f8599ec40142637e74fc1a1e35902ebad99b1ee29",
  name: "fetchCollectionProducts",
  filename: "src/lib/shopify.server.ts"
}, (opts) => fetchCollectionProducts.__executeServer(opts));
const fetchCollectionProducts = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(fetchCollectionProducts_createServerFn_handler, async ({
  data
}) => {
  return getCollectionProducts(data);
});
export {
  fetchAllCollections_createServerFn_handler,
  fetchAllProducts_createServerFn_handler,
  fetchCollectionProducts_createServerFn_handler,
  fetchProductByHandle_createServerFn_handler
};
