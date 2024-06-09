import { Metadata } from 'next'

import { Auth } from './auth'

export const metadata: Metadata = {
  title: 'Вход'
}

export default function AuthPage() {
  return <Auth />
}
