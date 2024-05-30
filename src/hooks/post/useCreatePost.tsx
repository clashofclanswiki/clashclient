import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IPostDate } from '@/types/post.types'

import { errorCatch } from '@/api/error'

import { postService } from '@/services/post.service'

export function useCreatePost() {
  const queryClient = useQueryClient()
  const { mutate: createPost, isSuccess } = useMutation({
    mutationFn: (data: IPostDate) => postService.create(data),

    onSuccess: () => {
      notifications.show({
        color: 'green',
        title: 'Успех',
        message: 'Пост успешно создан'
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
        await queryClient.invalidateQueries({ queryKey: ['persons'] })
      }
    }
  })

  return { createPost, isSuccess }
}
