import { useQuery } from '@tanstack/react-query'

import { postService } from '@/services/post.service'

export function useFullInfoPost(slug: string) {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['postFullInfo', slug],
    queryFn: () => postService.getFullInfo(slug)
  })

  return { data, isLoading, isSuccess, isError }
}
