import { Image, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { IPost } from '@/types/post.types'

import classes from './wiki-card.module.css'

export function WikiCard({ post }: { post: IPost }) {
  const { title, slug, image, category } = post

  return (
    <Link href={`/${category.slug}/${slug}`} className={classes.card}>
      <Title order={3} className={classes.title}>
        {title}
      </Title>

      <Image
        src={`${process.env.IMAGE_URL}${image}`}
        width='100%'
        height={114}
        alt={slug}
      />
    </Link>
  )
}
