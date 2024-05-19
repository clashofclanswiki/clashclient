import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import React from 'react'

import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.css'
import { Providers } from './providers'

const zen = Noto_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-zen',
  style: ['normal']
})

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Best one for planning from RED GROUP [htmllessons.ru]'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <head>
        <ColorSchemeScript defaultColorScheme='dark' />
      </head>
      <body className={zen.className}>
        <MantineProvider defaultColorScheme='dark'>
          <Notifications position='top-center' zIndex={1000} />
          <Providers>
            <Header />
            <main className='main'>
              <Container size='lg' pt='md' pb='md' h='100%'>
                {children}
              </Container>
            </main>
            <Footer />
          </Providers>
        </MantineProvider>
      </body>
    </html>
  )
}
