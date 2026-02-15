import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { C as Card, d as CardContent, e as CardFooter } from "./card-Bp4gXlvg.js";
import { f as formatPrice } from "./shopify-DAIn6Zat.js";
function ProductCard({ product }) {
  return /* @__PURE__ */ jsx(Link, { to: "/products/$handle", params: { handle: product.handle }, children: /* @__PURE__ */ jsxs(Card, { className: "overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full", children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-square relative bg-muted overflow-hidden", children: product.image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: product.image.url,
        alt: product.image.altText || product.title,
        className: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-300",
        loading: "lazy"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: "No Image" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "pt-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors", children: product.title }),
      product.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: product.description })
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx("p", { className: "text-lg font-bold text-primary", children: formatPrice(product.price, product.currencyCode) }) })
  ] }) });
}
function ProductGrid({ products }) {
  if (products.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-12", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-lg", children: "No products found in this collection." }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: products.map((product) => /* @__PURE__ */ jsx(ProductCard, { product }, product.id)) });
}
export {
  ProductGrid as P
};
