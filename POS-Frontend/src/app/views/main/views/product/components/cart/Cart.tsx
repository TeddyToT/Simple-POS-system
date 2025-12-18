import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/hooks/cart.store'
import { formatVND } from '@/utils/formatVND'
import { toast } from 'sonner'
import type { Product } from '@/api/types/product'
interface CartProps {
  onCheckout: () => void
  isLoading?: boolean
}

const Cart = ({ onCheckout, isLoading }: CartProps) => {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clear)

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleClearCart = () => {
    if (items.length === 0) {
      toast.error('Giỏ hàng đang trống')
      return
    }
    clearCart()
    toast.success('Đã xóa tất cả sản phẩm trong giỏ hàng')
  }

  const handleRemoveCartItem = (product: Product) => {
    removeItem(product.id)
    toast.success(`Đã xóa sản phẩm ${product.name} khỏi giỏ hàng`)
  }

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="px-4 py-3 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
            <h2 className="text-base md:text-xl font-semibold">
              Giỏ hàng
            </h2>
          </div>

          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearCart}
              className="text-destructive text-xs md:text-sm"
            >
              Xóa
            </Button>
          )}
        </div>

        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          {items.length} sản phẩm
        </p>
      </div>

      {/* Items */}
      <ScrollArea className="flex-1 px-4 py-3 md:p-6 max-h-44 md:max-h-80">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground text-sm">
              Giỏ hàng trống
            </p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3"
              >
                {/* Info */}
                <div className="sm:flex-1 flex flex-col w-1/2">
                  <h3 className="text-xs font-medium line-clamp-2 lg:text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold">
                    {formatVND(item.price)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 md:gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-4 w-4 lg:h-8 lg:w-8"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-1 w-1" />
                  </Button>

                  <Input
                    type="number"
                    max={100}
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    onBlur={(e) => {
                    const value = Math.max(1, Math.min(100, Number(e.target.value)))
                    updateQuantity(item.id, value)
                    }}
                    className="
                    focus-visible:ring-[1px]
                    w-8 lg:w-12 h-6 lg:h-8 text-center text-xs p-0
                    [appearance:textfield]
                    [&::-webkit-outer-spin-button]:appearance-none
                    [&::-webkit-inner-spin-button]:appearance-none"
                  />

                  <Button
                    size="icon"
                    variant="outline"
                    className="h-4 w-4 lg:h-8 lg:w-8"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus size={1} className="h-1 w-1" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 lg:h-8 lg:w-8 text-destructive hidden md:block"
                    onClick={() => handleRemoveCartItem(item)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Summary */}
      {items.length > 0 && (
        <div className="border-t border-border p-6 space-y-3">
            <Separator />
            <div className="flex gap-1 justify-between text-sm md:text-lg font-bold">
              <p className='w-1/3'>Tổng</p>
              <p className='w-2/3 break-all text-right'>{formatVND(total)} VNĐ</p>
            </div>
          <Button size="lg" className="w-full cursor-pointer" onClick={onCheckout} disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Thanh toán'}
          </Button>
        </div>
      )}
    </div>
  )
}
export default Cart