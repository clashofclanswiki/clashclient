import { FullPost } from '@/components/full-post/full-post'

import { IPost } from '@/types/post.types'
import { RouteParams } from '@/types/root.types'

async function getPostFull(slug: string) {
  const res = await fetch(`${process.env.SERVER_URL}/post/${slug}`, {
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function FullPostPage({ params }: RouteParams) {
  const { slug } = params
  const data: IPost = await getPostFull(slug)

  return <FullPost post={data} />
}
