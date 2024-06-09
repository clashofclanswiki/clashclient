import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Админ статистика',
  ...NO_INDEX_PAGE
}

export default function AdminPage() {
  return <>Admin stats</>
}
