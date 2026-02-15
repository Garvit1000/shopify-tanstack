import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { fetchProductByHandle } from "~/lib/shopify.server";
import { formatPrice } from "~/lib/shopify";
import { Card } from "~/components/ui/card";
import { NotFound } from "~/components/NotFound";
import { seo } from "~/utils/seo";

export const Route = createFileRoute("/products/$handle")({
  loader: async ({ params: { handle } }) => {
    const product = await fetchProductByHandle({ data: handle });
    if (!product) {
      throw notFound();
    }
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          ...seo({
            title: loaderData.product.title,
            description: loaderData.product.description,
            image: loaderData.product.featuredImage?.url,
          }),
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => <NotFound>Product not found</NotFound>,
});

function ProductPage() {
  const { product } = Route.useLoaderData();

  const images = product.images.edges.map((edge) => edge.node);
  const variants = product.variants.edges.map((edge) => edge.node);
  const hasDiscount =
    product.compareAtPriceRange?.minVariantPrice &&
    parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
      parseFloat(product.priceRange.minVariantPrice.amount);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
            {images[0] ? (
              <img
                src={images[0].url}
                alt={images[0].altText || product.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square relative bg-muted rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer"
                >
                  <img
                    src={image.url}
                    alt={image.altText || `${product.title} ${index + 1}`}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-foreground">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>

          {/* Vendor */}
          {product.vendor && (
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
              {product.vendor}
            </p>
          )}

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.title}</h1>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode
              )}
            </span>
            {hasDiscount && product.compareAtPriceRange && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(
                  product.compareAtPriceRange.minVariantPrice.amount,
                  product.compareAtPriceRange.minVariantPrice.currencyCode
                )}
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 text-sm font-medium px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>

          {/* Product Options */}
          {product.options.length > 0 && product.options[0].name !== "Title" && (
            <div className="space-y-4 mb-6">
              {product.options.map((option) => (
                <div key={option.name}>
                  <label className="block text-sm font-medium mb-2">
                    {option.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => (
                      <button
                        key={value}
                        className="px-4 py-2 border rounded-md text-sm hover:border-primary hover:bg-primary/5 transition-colors"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors mb-6">
            Add to Cart
          </button>

          {/* Description */}
          {product.descriptionHtml ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <div
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </div>
          ) : product.description ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          ) : null}

          {/* Product Details */}
          <Card className="mt-6 p-4">
            <h3 className="font-semibold mb-3">Product Details</h3>
            <dl className="space-y-2 text-sm">
              {product.productType && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd>{product.productType}</dd>
                </div>
              )}
              {product.vendor && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Vendor</dt>
                  <dd>{product.vendor}</dd>
                </div>
              )}
              {variants.length > 1 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Variants</dt>
                  <dd>{variants.length} options</dd>
                </div>
              )}
            </dl>
          </Card>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
