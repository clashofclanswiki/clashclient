import { Image, Text, Title } from '@mantine/core'
import Link from 'next/link'

import { IPost } from '@/types/post.types'

import classes from './card-item.module.css'

export function CardItem({ post }: { post: IPost }) {
  const { title, description, slug, image, category } = post

  return (
    <Link href={`/${category.slug}/${slug}`} className={classes.card}>
      <Title order={2}>{title}</Title>
      <Text>{description}</Text>
      <Image
        src={`${process.env.BASE_URL}${image}`}
        width='100%'
        height={333}
        className={classes.image}
        alt={slug}
      />
    </Link>
  )
}
