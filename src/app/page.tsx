import { Button, Container, Flex } from '@mantine/core'
import Link from 'next/link'

import { CardItem } from '@/components/card/card-item'

import { IPostResponse } from '@/types/post.types'

import styles from './page.module.css'

async function getPost() {
  const res = await fetch(`${process.env.SERVER_URL}/post`, {
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data: IPostResponse = await getPost()

  return (
    <div className={styles.main}>
      <Container size='sm' w='100%'>
        <Flex gap='md' direction='column' align='center'>
          {data.data.map(elem => (
            <CardItem post={elem} key={elem.id} />
          ))}
          <Button variant='default'>
            <Link href='/news'>Все новости</Link>
          </Button>
        </Flex>
      </Container>
    </div>
  )
}
