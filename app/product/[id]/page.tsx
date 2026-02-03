import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductReviews } from "@/components/product-reviews";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { OrderNowButton } from "@/components/order-now-button";
import {
  getProductById,
  getProductReviews,
  getRelatedProducts,
} from "@/lib/actions/product-detail";

export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

function formatPrice(value: string) {
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return `৳ ${num.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const [product, reviews, relatedProducts] = await Promise.all([
    getProductById(id),
    getProductReviews(id),
    getProductById(id).then((p) =>
      p ? getRelatedProducts(p.categoryId, id) : []
    ),
  ]);

  if (!product || !product.isActive) {
    notFound();
  }

  const images = product.featuredImage
    ? [product.featuredImage, ...product.images]
    : product.images;

  const discount =
    product.comparePrice && Number(product.comparePrice) > Number(product.price)
      ? Math.round(
          ((Number(product.comparePrice) - Number(product.price)) /
            Number(product.comparePrice)) *
            100
        )
      : null;

  return (
    <main className="min-h-screen bg-background pb-12 pt-8">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${product.category.id}`}
                className="hover:text-foreground"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <ProductImageGallery images={images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <Link
                href={`/shop?category=${product.category.id}`}
                className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
              >
                {product.category.name}
              </Link>
            )}

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {product.name}
              </h1>
              {product.sku && (
                <p className="mt-2 text-sm text-muted-foreground">
                  SKU: {product.sku}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">
                {formatPrice(product.price.toString())}
              </span>
              {product.comparePrice &&
                Number(product.comparePrice) > Number(product.price) && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.comparePrice.toString())}
                    </span>
                    {discount && (
                      <span className="rounded-full bg-destructive px-3 py-1 text-sm font-semibold text-white">
                        {discount}% OFF
                      </span>
                    )}
                  </>
                )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-sm text-green-600 dark:text-green-500">
                  ✓ In stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-sm text-destructive">✗ Out of stock</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Description</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Collections */}
            {product.collections.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Collections</h3>
                <div className="flex flex-wrap gap-2">
                  {product.collections.map((collection) => (
                    <Link
                      key={collection}
                      href={`/shop?collection=${collection}`}
                      className="rounded-full border bg-background px-3 py-1 text-xs font-medium transition hover:bg-muted"
                    >
                      {collection === "NEW_ARRIVAL"
                        ? "New Arrival"
                        : collection === "BEST_SELL"
                          ? "Best Seller"
                          : "Trending"}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 border-t pt-6">
              <div className="flex flex-col gap-3 sm:flex-row">
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price.toString(),
                    featuredImage: product.featuredImage,
                    stock: product.stock,
                    categoryName: product.category?.name,
                  }}
                  className="flex-1"
                />
                <OrderNowButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price.toString(),
                  }}
                  className="flex-1"
                />
              </div>

              <p className="text-center text-xs text-muted-foreground">
                Free shipping on orders over ৳5,000
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
            <ProductReviews reviews={reviews} />
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">You May Also Like</h2>
              {product.category && (
                <Link
                  href={`/shop?category=${product.category.id}`}
                  className="text-sm font-medium transition hover:underline"
                >
                  View all
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition hover:shadow-lg"
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-muted">
                    {relatedProduct.featuredImage ? (
                      <Image
                        src={relatedProduct.featuredImage}
                        alt={relatedProduct.name}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-1 p-3 sm:gap-2 sm:p-4">
                    {relatedProduct.category && (
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
                        {relatedProduct.category.name}
                      </span>
                    )}
                    <h3 className="line-clamp-2 text-sm font-medium leading-tight sm:text-base">
                      {relatedProduct.name}
                    </h3>

                    <div className="mt-auto flex items-baseline gap-1 sm:gap-2">
                      <span className="text-base font-semibold sm:text-lg">
                        {formatPrice(relatedProduct.price.toString())}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
