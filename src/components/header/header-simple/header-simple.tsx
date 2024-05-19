'use client'

import {
  Avatar,
  Box,
  Burger,
  Button,
  Container,
  Group,
  Menu,
  Skeleton,
  UnstyledButton,
  rem
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconLogout, IconUserCircle } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import cx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PROFILE_PAGES } from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

import classes from './header-simple.module.css'
import { MENU } from './menu.data'
import { authService } from '@/services/auth.service'

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(MENU[0].link)

  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const [isProfileVisible, setIsProfileVisible] = useState(false)

  const { push } = useRouter()

  const { data, isLoading, isError, isSuccess } = useProfile()

  useEffect(() => {
    if (isSuccess) {
      setIsProfileVisible(true)
    }
    if (isError) {
      setIsProfileVisible(false)
    }
  }, [isSuccess, isError])

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      setIsProfileVisible(false)
      push('/auth')
    }
  })

  const image =
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'

  const items = MENU.map(link => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={event => {
        event.preventDefault()
        setActive(link.link)
      }}
    >
      {link.label}
    </a>
  ))

  return (
    <div className={classes.header}>
      <Container size='lg' className={classes.inner}>
        <Box w={174.13}>
          <Link href={'/'}>LOGO</Link>
        </Box>
        <Group gap={5} visibleFrom='xs'>
          {items}
        </Group>

        <Group w={174.13} h={40}>
          <Skeleton
            visible={isLoading && !isError}
            w='100%'
            h='100%'
            style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            {isProfileVisible && (
              <Menu
                width={193}
                position='bottom-end'
                transitionProps={{ transition: 'pop-top-right' }}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                withinPortal
              >
                <Menu.Target>
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened
                    })}
                  >
                    <Group gap={7}>
                      <Avatar
                        src={image}
                        alt={data?.user.email}
                        radius='xl'
                        size={20}
                      />
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconUserCircle
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={() => push(PROFILE_PAGES.MAIN)}
                  >
                    Мой профиль
                  </Menu.Item>

                  <Menu.Item
                    leftSection={
                      <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                      />
                    }
                    onClick={() => mutate()}
                  >
                    Выход
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}

            {isError && (
              <Group>
                <Button onClick={() => push('/auth')}>
                  Вход / Регистрация
                </Button>
              </Group>
            )}
          </Skeleton>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' />
      </Container>
    </div>
  )
}
