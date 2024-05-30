'use client'

import { useParams } from 'next/navigation'

import { AddCategoryAdmin } from '@/components/admin/add-category-admin/add-category-admin'

import { useFullInfoCategory } from '@/hooks/category/useFullInfoCategory'

export default function EditCategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  const { data } = useFullInfoCategory(slug)

  return (
    <>
      <AddCategoryAdmin category={data} oldSlug={slug} />
    </>
  )
}
