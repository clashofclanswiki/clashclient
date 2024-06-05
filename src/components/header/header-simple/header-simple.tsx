'use client'

import {
  Avatar,
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
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
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

  const currentPath = usePathname()

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

  const isActive = (path: string) => {
    return currentPath === path
  }

  const links = [
    { link: '/news', label: 'Новости' }
    // { link: '/pricing', label: 'Pricing' },
    // { link: '/learn', label: 'Learn' },
    // { link: '/community', label: 'Community' }
  ]

  const items = links.map(link => (
    <Link
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={isActive(link.link) || undefined}
      onClick={event => {
        setActive(link.link)
      }}
    >
      {link.label}
    </Link>
  ))

  const image =
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png'

  return (
    <div className={classes.header}>
      <Container size='xl'>
        <div className={classes.inner}>
          <div className={classes.logo}>
            <Link
              href={'/'}
              style={{
                display: 'flex'
              }}
            >
              <Image
                width={60}
                height={60}
                src='/logo.png'
                alt='logo'
                priority
              />
            </Link>
          </div>

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
                      onClick={() => push(`${PROFILE_PAGES.MAIN}`)}
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
        </div>
      </Container>
    </div>
  )
}
