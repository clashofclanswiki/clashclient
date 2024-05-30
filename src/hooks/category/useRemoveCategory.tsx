import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorCatch } from '@/api/error'

import { categoryService } from '@/services/category.service'

export function useRemoveCategory() {
  const queryClient = useQueryClient()
  const { mutate: removeCategory, isSuccess } = useMutation({
    mutationFn: (slug: string) => categoryService.remove(slug),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Категория успешно удалено'
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

  return { removeCategory, isSuccess }
}
