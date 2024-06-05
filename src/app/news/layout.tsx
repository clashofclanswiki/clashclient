import { Box, Container, rem } from '@mantine/core'

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
