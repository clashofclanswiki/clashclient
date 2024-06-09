import { Metadata } from 'next'

import { AddNewsAdmin } from '@/components/admin/add-news-admin/add-news-admin'

export const metadata: Metadata = {
  title: 'Админ добавить новость'
}

export default function AddNews() {
  return <AddNewsAdmin />
}
