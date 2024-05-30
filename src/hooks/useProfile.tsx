import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    retry: 0
  })

  return { data, isLoading, isSuccess, isError, refetch }
}
