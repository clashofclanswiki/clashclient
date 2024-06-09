import { Box, Flex } from '@mantine/core'
import { Metadata } from 'next'

import { NavAdmin } from '@/components/admin/nav-admin/nav-admin'

export const metadata: Metadata = {
  title: 'Админ'
}

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Flex h='100%' gap='md' direction='column'>
      <NavAdmin />
      <Box flex={1}>{children}</Box>
    </Flex>
  )
}
