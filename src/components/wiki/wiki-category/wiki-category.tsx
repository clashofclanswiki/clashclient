import { Text, Title } from '@mantine/core'
import Link from 'next/link'

import { ICategory } from '@/types/category.types'

import classes from './wiki-category.module.css'

export function WikiCategory({ category }: { category: ICategory }) {
  const { title, slug } = category

  return (
    <Link href={`/${slug}`} className={classes.card}>
      <Title order={2}>{title}</Title>
    </Link>
  )
}
