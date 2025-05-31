import { extendedProducts } from "@/lib/data"
import ProductCard from "../ProductCard/ProductCard"

interface ProductRecommendationsProps {
  currentProductId: string
}

export function ProductRecommendations({ currentProductId }: ProductRecommendationsProps) {
  // Get products from the same category as the current product
  const currentProduct = extendedProducts.find((p) => p.id === currentProductId)

  if (!currentProduct) return null

  const relatedProducts = extendedProducts
    .filter(
      (p) =>
        p.id !== currentProductId &&
        p.industries.some((ind) => currentProduct.industries.includes(ind)),
    )
    .slice(0, 3);

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

