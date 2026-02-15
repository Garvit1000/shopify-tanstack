import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { f as formatPrice } from "./shopify-DAIn6Zat.js";
import { C as Card } from "./card-Bp4gXlvg.js";
import { b as Route } from "./router-BkXtiENR.js";
import "clsx";
import "tailwind-merge";
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
function ProductPage() {
  const {
    product
  } = Route.useLoaderData();
  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);
  const hasDiscount = product.compareAtPriceRange?.minVariantPrice && parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > parseFloat(product.priceRange.minVariantPrice.amount);
  return /* @__PURE__ */ jsx("main", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-8 lg:gap-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-square relative bg-muted rounded-lg overflow-hidden", children: images[0] ? /* @__PURE__ */ jsx("img", { src: images[0].url, alt: images[0].altText || product.title, className: "object-cover w-full h-full" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: "No Image" }) }),
      images.length > 1 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: images.slice(0, 4).map((image, index) => /* @__PURE__ */ jsx("div", { className: "aspect-square relative bg-muted rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsx("img", { src: image.url, alt: image.altText || `${product.title} ${index + 1}`, className: "object-cover w-full h-full", loading: "lazy" }) }, index)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("nav", { className: "text-sm text-muted-foreground mb-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground", children: "Home" }),
        /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsx(Link, { to: "/products", className: "hover:text-foreground", children: "Products" }),
        /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: product.title })
      ] }),
      product.vendor && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground uppercase tracking-wide mb-2", children: product.vendor }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl lg:text-4xl font-bold mb-4", children: product.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-bold text-primary", children: formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode) }),
        hasDiscount && product.compareAtPriceRange && /* @__PURE__ */ jsx("span", { className: "text-lg text-muted-foreground line-through", children: formatPrice(product.compareAtPriceRange.minVariantPrice.amount, product.compareAtPriceRange.minVariantPrice.currencyCode) }),
        hasDiscount && /* @__PURE__ */ jsx("span", { className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-sm font-medium px-2 py-1 rounded", children: "Sale" })
      ] }),
      product.options.length > 0 && product.options[0].name !== "Title" && /* @__PURE__ */ jsx("div", { className: "space-y-4 mb-6", children: product.options.map((option) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium mb-2", children: option.name }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: option.values.map((value) => /* @__PURE__ */ jsx("button", { className: "px-4 py-2 border rounded-md text-sm hover:border-primary hover:bg-primary/5 transition-colors", children: value }, value)) })
      ] }, option.name)) }),
      /* @__PURE__ */ jsx("button", { className: "w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors mb-6", children: "Add to Cart" }),
      product.descriptionHtml ? /* @__PURE__ */ jsxs("div", { className: "prose prose-sm dark:prose-invert max-w-none", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Description" }),
        /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
          __html: product.descriptionHtml
        } })
      ] }) : product.description ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: "Description" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: product.description })
      ] }) : null,
      /* @__PURE__ */ jsxs(Card, { className: "mt-6 p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-3", children: "Product Details" }),
        /* @__PURE__ */ jsxs("dl", { className: "space-y-2 text-sm", children: [
          product.productType && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Type" }),
            /* @__PURE__ */ jsx("dd", { children: product.productType })
          ] }),
          product.vendor && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Vendor" }),
            /* @__PURE__ */ jsx("dd", { children: product.vendor })
          ] }),
          variants.length > 1 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Variants" }),
            /* @__PURE__ */ jsxs("dd", { children: [
              variants.length,
              " options"
            ] })
          ] })
        ] })
      ] }),
      product.tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium mb-2", children: "Tags" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: product.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag)) })
      ] })
    ] })
  ] }) });
}
export {
  ProductPage as component
};
