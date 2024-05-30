import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorCatch } from '@/api/error'

import { postService } from '@/services/post.service'

export function useRemovePost() {
  const queryClient = useQueryClient()
  const { mutate: removePost, isSuccess } = useMutation({
    mutationFn: (slug: string) => postService.remove(slug),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Пост успешно удалено'
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
        await queryClient.invalidateQueries({ queryKey: ['posts'] })
      }
    }
  })

  return { removePost, isSuccess }
}
