import { Title } from '@mantine/core'
import Link from 'next/link'

import classes from './wiki-link.module.css'

export function WikiLink({ title, slug }: { title: string; slug: string }) {
  return (
    <Link href={`/${slug}`} className={classes.card}>
      <Title className={classes.title} order={3}>
        {title}
      </Title>
    </Link>
  )
}
