'use client'

import { Card, Image, Text } from '@mantine/core'
import Link from 'next/link'

import { IPost } from '@/types/post.types'

export function CardItem({ post }: { post: IPost }) {
  const { title, description, slug, image } = post

  return (
    <Card
      shadow='sm'
      padding='md'
      withBorder
      maw={340}
      w='100%'
      component={Link}
      radius='md'
      href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    >
      <Card.Section>
        <Image src={image} h={160} alt='No way!' />
      </Card.Section>

      <Text fw={500} size='lg' mt='md'>
        {title}
      </Text>

      <Text mt='xs' c='dimmed' size='sm'>
        {description}
      </Text>
    </Card>
  )
}
