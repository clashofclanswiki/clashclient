import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorCatch } from '@/api/error'

import { fileService } from '@/services/file.service'

export function useCreateFile() {
  const queryClient = useQueryClient()
  const { mutate, isSuccess } = useMutation({
    mutationFn: (data: File[]) => fileService.create(data),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Картинка успешно загружена'
      })
    },

    onSettled: async (_, error: any) => {
      if (error) {
        notifications.show({
          color: 'red',
          title: 'Ошибка',
          message: errorCatch(error)
        })
      } else {
        await queryClient.invalidateQueries({ queryKey: ['files'] })
      }
    }
  })

  return { mutate, isSuccess }
}
