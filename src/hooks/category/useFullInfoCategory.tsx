import { useQuery } from '@tanstack/react-query'

import { categoryService } from '@/services/category.service'

export function useFullInfoCategory(slug: string) {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['categoryFullInfo', slug],
    queryFn: () => categoryService.getFullInfoCategory(slug)
  })

  return { data, isLoading, isSuccess, isError }
}
