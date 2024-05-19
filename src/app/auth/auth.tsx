'use client'

import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

import { IAuthForm } from '@/types/auth.types'

import { useAuth } from '@/hooks/useAuth'

import classes from './auth.module.css'

export function Auth() {
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Невалидный Email'),
      password: value => (value.length >= 5 ? null : 'Минимум 5 символов!')
    }
  })

  const [isLoginForm, setIsLoginForm] = useState(false)

  const { mutate } = useAuth(isLoginForm)

  const handleSubmit = (values: IAuthForm) => {
    mutate(values)
  }

  return (
    <Container size={420} my={40}>
      <Title ta='center' className={classes.title}>
        Вход
      </Title>
      <Text c='dimmed' size='sm' ta='center' mt={5}>
        Если нет акаунта, пройдите{' '}
        <Anchor size='sm' component='button'>
          регистрацию
        </Anchor>
      </Text>

      <Paper withBorder shadow='md' p={30} mt={30} radius='md'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Email'
            name='email'
            placeholder='you@gmail.com'
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label='Пароль'
            name='password'
            placeholder='Ваш пароль'
            mt='md'
            {...form.getInputProps('password')}
          />
          <Group justify='center' mt='md'>
            <Button type='submit' onClick={() => setIsLoginForm(true)}>
              Вход
            </Button>
            <Button type='submit' onClick={() => setIsLoginForm(false)}>
              Регистрация
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  )
}
