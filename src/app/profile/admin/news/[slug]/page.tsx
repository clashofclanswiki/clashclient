'use client'

import { useParams } from 'next/navigation'

import { AddNewsAdmin } from '@/components/admin/add-news-admin/add-news-admin'

import { useFullInfoPost } from '@/hooks/post/useFullInfoPost'

export default function EditPostPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data } = useFullInfoPost(slug)

  return (
    <>
      <AddNewsAdmin post={data} oldSlug={slug} />
    </>
  )
}
