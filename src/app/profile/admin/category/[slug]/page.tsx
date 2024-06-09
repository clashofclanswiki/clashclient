'use client'

import { useParams } from 'next/navigation'

import { AddCategoryAdmin } from '@/components/admin/add-category-admin/add-category-admin'

import { useFullInfoCategory } from '@/hooks/category/useFullInfoCategory'

export default function EditCategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  const { categoryOne } = useFullInfoCategory(slug)

  return (
    <>
      <AddCategoryAdmin category={categoryOne} oldSlug={slug} />
    </>
  )
}
