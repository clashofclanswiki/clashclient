import { Box, Image, Text, Title } from '@mantine/core'

import { RenderContent } from '@/components/render-content/render-content'

import { IPost } from '@/types/post.types'

import classes from './wiki-full-post.module.css'

export function WikiFullPost({ post }: { post: IPost }) {
  const { title, description, slug, image, content, category } = post

  return (
    <div className={classes.post}>
      <Title>{title}</Title>
      <Text fw={700}>{category.title}</Text>
      <Text fw={600}>{description}</Text>
      <Box>
        <Image
          src={`${process.env.IMAGE_URL}${image}`}
          width='100%'
          height={220}
          className={classes.image}
          alt={slug}
        />
      </Box>
      <RenderContent content={content || ''} />
    </div>
  )
}
