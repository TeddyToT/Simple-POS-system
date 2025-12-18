import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/api/types/product'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items
        const existing = items.find((i) => i.id === product.id)

        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }]
          })
        }
      },

      updateQuantity: (id, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((i) => i.id !== id)
              : get().items.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                )
        }),

      removeItem: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id)
        }),

      clear: () => set({ items: [] })
    }),
    {
      name: 'pos-cart', //localStorage
      version: 1
    }
  )
)
