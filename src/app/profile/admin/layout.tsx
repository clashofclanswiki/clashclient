import { Box, Flex } from '@mantine/core'

import { NavAdmin } from '@/components/admin/nav-admin/nav-admin'
import { Sidebar } from '@/components/sidebar/sidebar'

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
