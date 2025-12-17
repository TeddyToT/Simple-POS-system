import type { RouteObject } from 'react-router-dom'
import { ROUTE_PATHS } from '@/constants/path'

const {
  app: { main: MainRoutePaths }
} = ROUTE_PATHS

const mainRoutes: RouteObject = {
  path: MainRoutePaths.path,
  lazy: async () => {
    const { default: Main } = await import('../layout')
    return {
      Component: Main
    }
  },
  children: [
    {
      index: true,
      lazy: async () => {
        const { default: Product } = await import('../views/product/page')
        return {
          Component: Product
        }
      }
    },
    {
      path: MainRoutePaths.product.path,
      lazy: async () => {
        const { default: Product } = await import('../views/product/page')
        return {
          Component: Product
        }
      }
    },
    {
      path: MainRoutePaths.order.path,
      lazy: async () => {
        const { default: Order } = await import('../views/order/page')
        return {
          Component: Order
        }
      }
    }
  ]
}

export default mainRoutes
