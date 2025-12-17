import { useInfiniteQuery } from '@tanstack/react-query'
import { axiosInstance } from '../configs/custom-instance'
import type { PaginatedResponse } from '../types/base'
import type { Product } from '../types/product'

const PAGE_SIZE = 10

const fetchProducts = async ({ pageParam = 1 }) => {
  const { data } = await axiosInstance.get<PaginatedResponse<Product>>(
    '/products',
    {
      params: {
        page: pageParam,
        limit: PAGE_SIZE,
      },
    },
  )

  return data
}

export const useInfiniteProducts = () =>
  useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage
      return page < totalPages ? page + 1 : undefined
    },
  })
