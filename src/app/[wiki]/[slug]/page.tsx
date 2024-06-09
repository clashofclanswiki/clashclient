import { WikiFullPost } from '@/components/wiki/wiki-full-post/wiki-full-post'

import { INDEX_PAGE } from '@/constants/seo.constants'

import { IPost } from '@/types/post.types'
import { RouteParams } from '@/types/root.types'

export async function generateMetadata({ params }: RouteParams) {
  const { slug } = params

  const data: IPost = await getPostFull(slug)

  return {
    title: `${data.title} | ${data.category.title}`,
    description: data.description,
    ...INDEX_PAGE
  }
}

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

  return <WikiFullPost post={data} />
}
