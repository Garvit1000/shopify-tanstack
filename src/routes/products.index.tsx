import { createFileRoute } from "@tanstack/react-router";
import { fetchAllProducts } from "~/lib/shopify.server";
import { ProductGrid } from "~/components/product-grid";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/products/")({
  loader: async () => {
    const products = await fetchAllProducts();
    return { products };
  },
  head: () => ({
    meta: [
      ...seo({
        title: "All Products",
        description: "Browse all our products",
      }),
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { products } = Route.useLoaderData();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete collection ({products.length} products)
        </p>
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
