import { Button, Container, Flex } from '@mantine/core'
import { Metadata } from 'next'
import Link from 'next/link'

import { CardItem } from '@/components/card/card-item'
import { WikiLink } from '@/components/wiki/wiki-link/wiki-link'

import { SITE_NAME } from '@/constants/seo.constants'

import { IPostResponse } from '@/types/post.types'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `${SITE_NAME} - новости, герои и вики статьи`,
  description: `ClashOfClansWiki.ru - ваш главный источник новостей, стратегий и описаний по героям и строениям игры. Присоединяйтесь к сообществу и станьте мастером в Clash of Clans!`
}

async function getPost() {
  const res = await fetch(`${process.env.SERVER_URL}/post?categoryType=news`, {
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
          <Flex w='100%' gap='md'>
            <WikiLink title='Родная деревня | Вики' slug='home-village' />
            <WikiLink title='Деревня строителя | Вики' slug='builder-base' />
          </Flex>

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
