import { Flex } from '@mantine/core'

import { CardItem } from '@/components/card/card-item'

import { IPost, IPostResponse } from '@/types/post.types'

import styles from './page.module.css'

async function getPost() {
  const res = await fetch('http://localhost:4200/api/post', {
    next: { revalidate: 60 }
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
      <Flex wrap='wrap' gap='md' justify='center'>
        {data.data.map(elem => (
          <CardItem post={elem} key={elem.id} />
        ))}
      </Flex>
    </div>
  )
}
