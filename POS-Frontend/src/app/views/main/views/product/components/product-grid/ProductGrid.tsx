import type { Product } from "@/api/types/product"
import {ProductCard} from "./components"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
  fetchNextPage?: () => void
  hasNextPage?: boolean
  isFetching?: boolean
}

const ProductGrid = ({ products, onAddToCart, fetchNextPage, hasNextPage, isFetching }: ProductGridProps) => {
  if (products.length === 0) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Không có sản phẩm nào</div>
  }

  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
    {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
          className="cursor-pointer w-1/2 text-xs md:text-base"
            variant="outline"
            onClick={fetchNextPage}
            disabled={isFetching}
          >
            {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isFetching ? 'Đang tải...' : 'Tải thêm'}
          </Button>
        </div>
      )}
    </>
  )
}

export default ProductGrid