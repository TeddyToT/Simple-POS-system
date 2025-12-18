import type { Product } from "@/api/types/product"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { formatVND } from '@/utils/formatVND'
interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}


const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group py-2 h-20 md:h-28">
      <CardContent className="p-0 h-full">
        <div className="p-2 flex flex-col h-full justify-between">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-medium text-[10px] md:text-sm text-foreground mb-1 line-clamp-2">{product.name}</h3>
            </div>
            <Button size="icon" className="h-4 w-4 ml-2 cursor-pointer" onClick={() => onAddToCart(product)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-base font-semibold text-foreground">{formatVND(product.price)} VNĐ</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard