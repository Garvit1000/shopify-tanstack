import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SimpleProduct } from "@/lib/types";
import { formatPrice } from "@/lib/shopify";

interface ProductCardProps {
  product: SimpleProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.handle}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Product Image */}
        <div className="aspect-square relative bg-muted overflow-hidden">
          {product.image ? (
            <Image
              src={product.image.url}
              alt={product.image.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>

        <CardContent className="pt-4">
          {/* Product Title */}
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          {/* Product Description */}
          {product.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </CardContent>

        <CardFooter>
          {/* Product Price */}
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.price, product.currencyCode)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
