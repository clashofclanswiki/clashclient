import { useQuery } from '@tanstack/react-query'

import { categoryService } from '@/services/category.service'

export function useAllCategory(skip: number, take: number, title: string = '') {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['category', skip, take, title],
    queryFn: () => categoryService.getCategorys(skip, take, title)
  })

  return { data, isLoading, isSuccess, isError }
}
