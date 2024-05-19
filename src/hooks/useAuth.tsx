import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { IAuthForm } from '@/types/auth.types'

import { PROFILE_PAGES } from '@/config/pages-url.config'

import classes from '../app/auth/auth.module.css'

import { useProfile } from './useProfile'
import { authService } from '@/services/auth.service'

export function useAuth(isLoginForm?: boolean) {
  const { push } = useRouter()

  const { refetch } = useProfile()

  const { mutate } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: IAuthForm) =>
      authService.main(isLoginForm ? 'login' : 'register', data),
    onSuccess() {
      notifications.show({
        radius: 'md',
        classNames: classes,
        title: 'Успех',
        message: 'Вы успешно прошли авторизацию'
      })
      //   form.reset()
      refetch()
      push(PROFILE_PAGES.MAIN)
    },
    onError() {
      notifications.show({
        color: 'red',
        title: 'Ошибка',
        message: 'Вы ввели неверную почту или пароль!',
        classNames: classes
      })
    }
  })

  return { mutate }
}
