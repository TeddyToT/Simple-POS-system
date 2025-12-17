export interface OrderItem {
  productId: number
  productName: string
  unitPrice: number
  quantity: number
  lineTotal: number
}

export interface Order {
  orderId: string
  items: OrderItem[]
  totalAmount: number
  createdAt: string
}
