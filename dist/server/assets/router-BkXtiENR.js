import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, c as createServerFn } from "../server.js";
import crypto from "crypto";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error("DefaultCatchBoundary Error:", error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => router2.invalidate(),
          className: "px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium",
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium",
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium",
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[50vh] flex flex-col items-center justify-center gap-4 p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "404" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground", children: children || "The page you are looking for does not exist." }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors",
        children: "Go Home"
      }
    )
  ] });
}
function Navbar() {
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "flex items-center space-x-2", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold", children: "Store" }) }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center space-x-6", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
          activeProps: { className: "text-sm font-medium text-foreground transition-colors" },
          activeOptions: { exact: true },
          children: "Collections"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/products",
          className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
          activeProps: { className: "text-sm font-medium text-foreground transition-colors" },
          children: "All Products"
        }
      )
    ] })
  ] }) });
}
const appCss = "/assets/app-CuimwpjB.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$5 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "Headless Store",
        description: "Shopify Headless E-commerce Store"
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
      }
    ]
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "font-sans antialiased min-h-screen bg-background", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchAllCollections = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e724719524cbd839cefab90e2518e8ccfae8b02227ffec81ff5cb52f75df5844"));
const fetchAllProducts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("68bbe8711f592ea3daf5fb7ba10796f5300b88aed9d24a71de20c6b0673ca3f5"));
const fetchProductByHandle = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("e9b3dc3a393c18b28ebf9ad287f63e4efca92e306282e43db467dd5d81854334"));
const fetchCollectionProducts = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("ee46203de31f34f06425287f8599ec40142637e74fc1a1e35902ebad99b1ee29"));
const $$splitComponentImporter$3 = () => import("./index-ScyFWz1x.js");
const Route$4 = createFileRoute("/")({
  loader: async () => {
    const collections = await fetchAllCollections();
    return {
      collections
    };
  },
  head: () => ({
    meta: [...seo({
      title: "Headless Store | Home",
      description: "Discover our curated collections. Quality meets style in every product."
    })]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./products.index-Cj_E3mrU.js");
const Route$3 = createFileRoute("/products/")({
  loader: async () => {
    const products = await fetchAllProducts();
    return {
      products
    };
  },
  head: () => ({
    meta: [...seo({
      title: "All Products",
      description: "Browse all our products"
    })]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitNotFoundComponentImporter$1 = () => import("./products._handle-CxPrbxik.js");
const $$splitComponentImporter$1 = () => import("./products._handle-eSJD-JbU.js");
const Route$2 = createFileRoute("/products/$handle")({
  loader: async ({
    params: {
      handle
    }
  }) => {
    const product = await fetchProductByHandle({
      data: handle
    });
    if (!product) {
      throw notFound();
    }
    return {
      product
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [...seo({
      title: loaderData.product.title,
      description: loaderData.product.description,
      image: loaderData.product.featuredImage?.url
    })] : []
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
const $$splitNotFoundComponentImporter = () => import("./collections._handle-Qz87cipg.js");
const $$splitComponentImporter = () => import("./collections._handle-Ck5awEJl.js");
const Route$1 = createFileRoute("/collections/$handle")({
  loader: async ({
    params: {
      handle
    }
  }) => {
    const {
      collection,
      products
    } = await fetchCollectionProducts({
      data: handle
    });
    if (!collection) {
      throw notFound();
    }
    return {
      collection,
      products
    };
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [...seo({
      title: loaderData.collection.title,
      description: loaderData.collection.description || "Browse our collection"
    })] : []
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;
async function verifyShopifyWebhook(body, hmacHeader) {
  if (!hmacHeader || !SHOPIFY_WEBHOOK_SECRET) {
    return false;
  }
  const generatedHash = crypto.createHmac("sha256", SHOPIFY_WEBHOOK_SECRET).update(body, "utf8").digest("base64");
  return crypto.timingSafeEqual(
    Buffer.from(generatedHash),
    Buffer.from(hmacHeader)
  );
}
const Route = createFileRoute("/api/webhooks/shopify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.text();
          const hmacHeader = request.headers.get("x-shopify-hmac-sha256");
          const topic = request.headers.get("x-shopify-topic");
          const isValid = await verifyShopifyWebhook(body, hmacHeader);
          if (!isValid) {
            console.error("Invalid Shopify webhook signature");
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
              status: 401,
              headers: { "Content-Type": "application/json" }
            });
          }
          console.log(`Received Shopify webhook: ${topic}`);
          const payload = JSON.parse(body);
          switch (topic) {
            case "products/create":
            case "products/update":
            case "products/delete":
              console.log("Product updated:", payload.handle);
              break;
            case "collections/create":
            case "collections/update":
            case "collections/delete":
              console.log("Collection updated:", payload.handle);
              break;
            case "inventory_levels/update":
              console.log("Inventory updated:", payload);
              break;
            default:
              console.log(`Unhandled webhook topic: ${topic}`);
          }
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (error) {
          console.error("Webhook error:", error);
          return new Response(
            JSON.stringify({ error: "Internal server error" }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" }
            }
          );
        }
      }
    }
  }
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const ProductsIndexRoute = Route$3.update({
  id: "/products/",
  path: "/products/",
  getParentRoute: () => Route$5
});
const ProductsHandleRoute = Route$2.update({
  id: "/products/$handle",
  path: "/products/$handle",
  getParentRoute: () => Route$5
});
const CollectionsHandleRoute = Route$1.update({
  id: "/collections/$handle",
  path: "/collections/$handle",
  getParentRoute: () => Route$5
});
const ApiWebhooksShopifyRoute = Route.update({
  id: "/api/webhooks/shopify",
  path: "/api/webhooks/shopify",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  CollectionsHandleRoute,
  ProductsHandleRoute,
  ProductsIndexRoute,
  ApiWebhooksShopifyRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  NotFound as N,
  Route$4 as R,
  Route$3 as a,
  Route$2 as b,
  Route$1 as c,
  router as r
};
