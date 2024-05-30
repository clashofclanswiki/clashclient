import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IPostDate } from '@/types/post.types'

import { errorCatch } from '@/api/error'

import { postService } from '@/services/post.service'

export function useUpdatePost() {
  const queryClient = useQueryClient()
  const { mutate: updatePost, isSuccess } = useMutation({
    mutationFn: ({ data, oldSlug }: { data: IPostDate; oldSlug: string }) =>
      postService.update(data, oldSlug),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Пост успешно обновлена'
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

  return { updatePost, isSuccess }
}
