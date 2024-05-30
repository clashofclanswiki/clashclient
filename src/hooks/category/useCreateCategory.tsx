import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ICategoryDate } from '@/types/category.types'

import { errorCatch } from '@/api/error'

import { categoryService } from '@/services/category.service'

export function useCreateCategory() {
  const queryClient = useQueryClient()
  const { mutate, isSuccess } = useMutation({
    mutationFn: (data: ICategoryDate) => categoryService.create(data),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Категория успешно создана'
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
        await queryClient.invalidateQueries({ queryKey: ['category'] })
      }
    }
  })

  return { mutate, isSuccess }
}
