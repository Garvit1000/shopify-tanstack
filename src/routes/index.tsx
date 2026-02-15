import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { fetchAllCollections } from "~/lib/shopify.server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/")({
  loader: async () => {
    const collections = await fetchAllCollections();
    return { collections };
  },
  head: () => ({
    meta: [
      ...seo({
        title: "Headless Store | Home",
        description: "Discover our curated collections. Quality meets style in every product.",
      }),
    ],
  }),
  component: Home,
});

function Home() {
  const { collections } = Route.useLoaderData();

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collections. Quality meets style in every product.
        </p>
      </section>

      {/* Collections Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Our Collections</h2>
        {collections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No collections found.</p>
            <Link
              to="/products"
              className="text-primary hover:underline mt-2 inline-block"
            >
              View all products →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to="/collections/$handle"
                params={{ handle: collection.handle }}
                className="group"
              >
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 relative overflow-hidden">
                    {collection.image ? (
                      <img
                        src={collection.image.url}
                        alt={collection.image.altText || collection.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl">🛍️</span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {collection.title}
                    </CardTitle>
                    {collection.description && (
                      <CardDescription className="line-clamp-2">
                        {collection.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <span className="text-sm font-medium text-primary">
                      Browse Collection →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* View All Products Link */}
      <section className="text-center mt-12">
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          View All Products
        </Link>
      </section>
    </main>
  );
}
