import { useEffect } from 'react'
import { useQueryClient, type InfiniteData } from '@tanstack/react-query'

// App
import { getSocket } from '@/configs/socket-client'
import type { Order } from '@/api/types/order'
import type { PaginatedResponse } from '@/api/types/base'

/**
 * React Query cache shape:
 * InfiniteData<PaginatedResponse<Order>>
 */
type OrdersInfiniteData = InfiniteData<PaginatedResponse<Order>>

export const useOrderSocket = (): void => {
  const queryClient = useQueryClient()

  useEffect(() => {

    const client = getSocket()

    const handleOrderCreated = (order: Order) => {
      queryClient.setQueryData<OrdersInfiniteData>(
        ['orders'],
        (oldData) => {
          if (!oldData) return oldData

          const [firstPage, ...restPages] = oldData.pages

          if (!firstPage) return oldData

          return {
            pageParams: oldData.pageParams,
            pages: [
              {
                ...firstPage,
                data: [order, ...firstPage.data],
                total: firstPage.total + 1
              },
              ...restPages
            ]
          }
        }
      )
    }

    client.on('OrderCreated', handleOrderCreated)

    return () => {
      client.off('OrderCreated', handleOrderCreated)
    }
  }, [queryClient])
}
