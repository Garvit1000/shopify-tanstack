import { createFileRoute, notFound } from "@tanstack/react-router";
import { fetchCollectionProducts } from "~/lib/shopify.server";
import { ProductGrid } from "~/components/product-grid";
import { NotFound } from "~/components/NotFound";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/collections/$handle")({
  loader: async ({ params: { handle } }) => {
    const { collection, products } = await fetchCollectionProducts({ data: handle });
    if (!collection) {
      throw notFound();
    }
    return { collection, products };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          ...seo({
            title: loaderData.collection.title,
            description: loaderData.collection.description || "Browse our collection",
          }),
        ]
      : [],
  }),
  component: CollectionPage,
  notFoundComponent: () => <NotFound>Collection not found</NotFound>,
});

function CollectionPage() {
  const { collection, products } = Route.useLoaderData();

  return (
    <main className="container mx-auto px-4 py-8">
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
    </main>
  );
}
