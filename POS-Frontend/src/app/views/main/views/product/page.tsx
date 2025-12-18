import { useMemo, useState } from "react"
import { ProductGrid, Cart} from "./components"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Product } from "@/api/types/product"
import { useInfiniteProducts } from "@/api/endpoints/product"
import { useCartStore } from "@/hooks/cart.store"
import { useCreateOrder } from "@/api/endpoints/order"
import { toast } from 'sonner'
export interface CartItem extends Product {
  quantity: number
}


const ProductPage = () => {
  const addToCart = useCartStore((s) => s.addItem)
  const clearCart = useCartStore((s) => s.clear)
  const items = useCartStore((s) => s.items)

  const createOrderMutation = useCreateOrder()

  const [searchQuery, setSearchQuery] = useState("")

    const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching
  } = useInfiniteProducts()

  const products = useMemo(() => {
    const list = data?.pages.flatMap((p) => p.data) ?? []
    return list.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [data, searchQuery])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`)
  }
  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Giỏ hàng đang trống')
      return
    }

    try {
      await createOrderMutation.mutateAsync({
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      })

      toast.success('Thanh toán thành công')
      clearCart()
    } catch (error) {
      console.error(error)
      toast.error('Thanh toán thất bại')
    }
    clearCart()
  }


  return (
    <div className="flex h-screen">
      {/* Left Side - Products */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Products Grid */}
        <div className="flex-1 overflow-auto p-6 space-y-3 bg-card/90">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm theo tên sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs md:text-base"
            />
          </div>
          <ProductGrid
          products={products}
          onAddToCart={handleAddToCart}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetching={isFetching}
          />
        </div>
      </div>

      {/* Right Side - Cart */}
      <div className="w-5/12 md:w-1/3 bg-card border-l border-border flex flex-col">
        <Cart
          onCheckout={handleCheckout}
          isLoading={createOrderMutation.isPending}
        />
      </div>
    </div>
  )
}
export default ProductPage