import { Box, Container, rem } from '@mantine/core'
import { Metadata } from 'next'

import { SITE_NAME } from '@/constants/seo.constants'

export default function NewsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box flex={1} p={rem(16)}>
      <Container size='sm' w='100%'>
        {children}
      </Container>
    </Box>
  )
}
