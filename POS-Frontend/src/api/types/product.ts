import type { PaginatedResponse } from "./base";

export interface Product {
  id: number
  name: string
  price: number
}

export type ProductsResponse = PaginatedResponse<Product>;