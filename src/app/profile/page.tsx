import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Профиль',
  ...NO_INDEX_PAGE
}

export default function ProfilePage() {
  return <>Profile</>
}
