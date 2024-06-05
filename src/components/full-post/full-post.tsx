import { Image, Text, Title } from '@mantine/core'

import { IPost } from '@/types/post.types'

import { RenderContent } from '../render-content/render-content'

import classes from './full-post.module.css'

export function FullPost({ post }: { post: IPost }) {
  const { title, description, slug, image, content } = post

  return (
    <div className={classes.post}>
      <Title>{title}</Title>
      <Text fw={600}>{description}</Text>
      <Image
        src={`${process.env.IMAGE_URL}${image}`}
        width='100%'
        height={333}
        className={classes.image}
        alt={slug}
      />
      <RenderContent content={content || ''} />
    </div>
  )
}
