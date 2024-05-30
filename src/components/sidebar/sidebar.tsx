'use client'

import { IconBellRinging, IconLogout, IconReceipt2 } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useProfile } from '@/hooks/useProfile'

import classes from './sidebar.module.css'

export function Sidebar() {
  const currentPath = usePathname()

  const tabs = [
    { link: '/profile', label: 'Мой профиль', icon: IconBellRinging }
  ]
  const { data, isSuccess } = useProfile()

  const isActive = (path: string) => {
    return currentPath === path
  }

  if (isSuccess && data?.user.isAdmin) {
    tabs.push({ link: '/profile/admin', label: 'Админка', icon: IconReceipt2 })
  }

  const links = tabs.map(item => (
    <Link
      className={classes.link}
      data-active={isActive(item.link) || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href='#'
          className={classes.link}
          onClick={event => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  )
}
