'use client'

import { Burger, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useState } from 'react'

import classes from './HeaderSimple.module.css'
import { MENU } from './menu.data'

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false)
  const [active, setActive] = useState(MENU[0].link)

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
    <header className={classes.header}>
      <Container
        size='lg'
        className={classes.inner}
      >
        LOGO
        <Group
          gap={5}
          visibleFrom='xs'
        >
          {items}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom='xs'
          size='sm'
        />
      </Container>
    </header>
  )
}
