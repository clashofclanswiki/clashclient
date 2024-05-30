import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ICategoryDate } from '@/types/category.types'

import { errorCatch } from '@/api/error'

import { categoryService } from '@/services/category.service'

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  const { mutate: updateCategory, isSuccess } = useMutation({
    mutationFn: ({ data, oldSlug }: { data: ICategoryDate; oldSlug: string }) =>
      categoryService.update(data, oldSlug),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Категория успешно обновлена'
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

  return { updateCategory, isSuccess }
}
