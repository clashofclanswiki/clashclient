import { Metadata } from 'next'

import { AddNewsAdmin } from '@/components/admin/add-news-admin/add-news-admin'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Админ добавить новость',
  ...NO_INDEX_PAGE
}

export default function AddNews() {
  return <AddNewsAdmin />
}
