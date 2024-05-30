import { Box, Flex } from '@mantine/core'

import { Sidebar } from '@/components/sidebar/sidebar'

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
