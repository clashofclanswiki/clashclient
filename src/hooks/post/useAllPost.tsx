import { useQuery } from '@tanstack/react-query'

import { postService } from '@/services/post.service'

export function useAllPost(skip: number, take: number, title: string = '') {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['posts', skip, take, title],
    queryFn: () => postService.getPosts(skip, take, title)
  })

  return { data, isLoading, isSuccess, isError }
}
