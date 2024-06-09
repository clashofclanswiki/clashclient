import { Box, Flex } from '@mantine/core'
import { Metadata } from 'next'

import { Sidebar } from '@/components/sidebar/sidebar'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
  title: 'Админка',
  ...NO_INDEX_PAGE
}

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Flex h='100%' gap='md'>
      <Sidebar />
      <Box flex={1}>{children}</Box>
    </Flex>
  )
}
