import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../configs/custom-instance'
import type { PaginatedResponse } from '../types/base'
import type { Order, CreateOrderRequest } from '../types/order'

const PAGE_SIZE = 10

const fetchOrders = async ({ pageParam = 1 }) => {
  const { data } = await axiosInstance.get<PaginatedResponse<Order>>(
    '/orders',
    {
      params: {
        page: pageParam,
        limit: PAGE_SIZE,
      },
    },
  )

  return data
}


export const useInfiniteOrders = () =>
  useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage
      return page < totalPages ? page + 1 : undefined
    },
  })


export const useCreateOrder = () =>
  useMutation({
    mutationFn: async (payload: CreateOrderRequest) => {
      const { data } = await axiosInstance.post('/orders', payload)
      return data.data
    },
  })
