import { useQuery } from '@tanstack/react-query'

import { fileService } from '@/services/file.service'

export function useAllFiles() {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['files'],
    queryFn: () => fileService.getAllFiles()
  })

  return { data, isLoading, isSuccess, isError }
}
