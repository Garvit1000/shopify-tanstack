import { Suspense } from "react";
import { Metadata } from "next";
import { getAllProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-skeleton";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse all our products",
};

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

async function AllProducts() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          Browse our complete collection ({products.length} products)
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <AllProducts />
      </Suspense>
    </main>
  );
}
