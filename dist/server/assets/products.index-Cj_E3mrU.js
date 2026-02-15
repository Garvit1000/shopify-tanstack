import { jsxs, jsx } from "react/jsx-runtime";
import { P as ProductGrid } from "./product-grid-D7MkHU8w.js";
import { a as Route } from "./router-BkXtiENR.js";
import "@tanstack/react-router";
import "./card-Bp4gXlvg.js";
import "clsx";
import "tailwind-merge";
import "./shopify-DAIn6Zat.js";
import "../server.js";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core";
import "node:async_hooks";
import "@tanstack/router-core/ssr/server";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/react-router/ssr/server";
import "crypto";
function ProductsPage() {
  const {
    products
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold mb-2", children: "All Products" }),
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
        "Browse our complete collection (",
        products.length,
        " products)"
      ] })
    ] }),
    /* @__PURE__ */ jsx(ProductGrid, { products })
  ] });
}
export {
  ProductsPage as component
};
