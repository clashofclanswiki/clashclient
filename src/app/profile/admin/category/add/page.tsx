import { Metadata } from 'next'

import { AddCategoryAdmin } from '@/components/admin/add-category-admin/add-category-admin'

export const metadata: Metadata = {
  title: 'Админ добавить категорию'
}

export default function AddCategoryPage() {
  return (
    <>
      <AddCategoryAdmin />
    </>
  )
}
