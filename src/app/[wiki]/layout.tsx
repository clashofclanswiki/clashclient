import { Box, Container, rem } from '@mantine/core'

export default function WikiLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box flex={1} p={rem(16)}>
      <Container size='lg' w='100%'>
        {children}
      </Container>
    </Box>
  )
}
