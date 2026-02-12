import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollectionProducts, getAllCollections } from "@/lib/shopify";
import { ProductGrid } from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/product-skeleton";

interface Props {
  params: Promise<{ handle: string }>;
}

// Generate static paths for all collections at build time
export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((collection) => ({
    handle: collection.handle,
  }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const { collection } = await getCollectionProducts(handle);
  
  return {
    title: collection?.title || "Collection",
    description: collection?.description || "Browse our collection",
  };
}

// Revalidate this page every hour (ISR)
export const revalidate = 3600;

async function CollectionProducts({ handle }: { handle: string }) {
  const { products, collection } = await getCollectionProducts(handle);

  if (!collection) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{collection.title}</h1>
        {collection.description && (
          <p className="text-muted-foreground">{collection.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-2">
          {products.length} products
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductGridSkeleton count={6} />}>
        <CollectionProducts handle={handle} />
      </Suspense>
    </main>
  );
}
