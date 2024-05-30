import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import '@mantine/tiptap/styles.css'
import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'

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

const theme = createTheme({
  // primaryColor: 'dark',
  components: {
    // Button: {
    //   defaultProps: {
    //     color: 'violet.5',
    //     radius: rem(8)
    //   }
    // },

    TextInput: {
      defaultProps: {
        style: {
          height: '48px'
        }
      }
    }
  }
})

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
        <NextTopLoader
          color='#2299DD'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing='ease'
          speed={200}
          shadow='0 0 10px #2299DD,0 0 5px #2299DD'
        />
        <MantineProvider theme={theme} defaultColorScheme='dark'>
          <ModalsProvider>
            <Notifications position='top-center' zIndex={1000} />
            <Providers>
              <Header />
              <main className='main'>
                {/* <Container size='lg' pt='md' pb='md' h='100%'>
                  {children}
                </Container> */}
                {children}
              </main>
            </Providers>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
