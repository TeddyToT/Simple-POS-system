import type { ApiResponse, PaginatedResponse } from "./base"

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

export interface CreateOrderRequest {
  items: {
    productId: number
    quantity: number
  }[]
}

export type CreateOrderResponse = ApiResponse<Order>

export type OrdersResponse = PaginatedResponse<Order>
