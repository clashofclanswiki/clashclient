'use client'

import { Burger, Center, Container, Group, Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'

import classes from './nav-admin.module.css'

const links = [
  {
    link: '/profile/admin',
    label: 'Новости',
    links: [
      { link: '/profile/admin/news', label: 'Все новости' },
      { link: '/profile/admin/news/add', label: 'Добавить новость' }
    ]
  },
  {
    link: '/profile/admin',
    label: 'Категории',
    links: [
      { link: '/profile/admin/category', label: 'Все категории' },
      { link: '/profile/admin/category/add', label: 'Добавить категорию' }
    ]
  }
]

export function NavAdmin() {
  const [opened, { toggle }] = useDisclosure(false)

  const items = links.map(link => {
    const menuItems = link.links?.map(item => (
      <Menu.Item component={Link} href={item.link} key={item.link}>
        {item.label}
      </Menu.Item>
    ))

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger='hover'
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size='0.9rem' stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      )
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    )
  })

  return (
    <header className={classes.header}>
      <Container size='md'>
        <div className={classes.inner}>
          <Group gap={5} visibleFrom='sm'>
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} size='sm' hiddenFrom='sm' />
        </div>
      </Container>
    </header>
  )
}
