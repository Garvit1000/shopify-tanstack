import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-Bp4gXlvg.js";
import { R as Route } from "./router-BkXtiENR.js";
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
function Home() {
  const {
    collections
  } = Route.useLoaderData();
  return /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxs("section", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-6xl font-bold mb-4", children: "Welcome to Our Store" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground max-w-2xl mx-auto", children: "Discover our curated collections. Quality meets style in every product." })
    ] }),
    /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-8 text-center", children: "Our Collections" }),
      collections.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No collections found." }),
        /* @__PURE__ */ jsx(Link, { to: "/products", className: "text-primary hover:underline mt-2 inline-block", children: "View all products →" })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8", children: collections.map((collection) => /* @__PURE__ */ jsx(Link, { to: "/collections/$handle", params: {
        handle: collection.handle
      }, className: "group", children: /* @__PURE__ */ jsxs(Card, { className: "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden", children: collection.image ? /* @__PURE__ */ jsx("img", { src: collection.image.url, alt: collection.image.altText || collection.title, className: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-300", loading: "lazy" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-6xl", children: "🛍️" }) }) }),
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-xl group-hover:text-primary transition-colors", children: collection.title }),
          collection.description && /* @__PURE__ */ jsx(CardDescription, { className: "line-clamp-2", children: collection.description })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-primary", children: "Browse Collection →" }) })
      ] }) }, collection.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "text-center mt-12", children: /* @__PURE__ */ jsx(Link, { to: "/products", className: "inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors", children: "View All Products" }) })
  ] });
}
export {
  Home as component
};
