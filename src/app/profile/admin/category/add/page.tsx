import { Metadata } from 'next'

import { AddCategoryAdmin } from '@/components/admin/add-category-admin/add-category-admin'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Админ добавить категорию',
  ...NO_INDEX_PAGE
}

export default function AddCategoryPage() {
  return (
    <>
      <AddCategoryAdmin />
    </>
  )
}
