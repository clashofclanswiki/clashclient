import { Flex } from '@mantine/core'
import { Metadata } from 'next'

import { CardItem } from '@/components/card/card-item'
import { CategoryInfo } from '@/components/category-info/category-info'

import { INDEX_PAGE, SITE_NAME } from '@/constants/seo.constants'

import { ICategoryOne } from '@/types/category.types'

export const metadata: Metadata = {
  title: `Новости Clash of Clans`,
  description: `На ${SITE_NAME} вы найдете все свежие новости о Clash of Clans. От обновлений до стратегий – всё, что нужно знать игрокам, на одной странице.`,
  ...INDEX_PAGE
}

async function getCategory() {
  const res = await fetch(`${process.env.SERVER_URL}/category/news`, {
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function NewsPage() {
  const data: ICategoryOne = await getCategory()

  return (
    <Flex gap='md' direction='column' align='center'>
      <CategoryInfo
        title={data?.data?.title}
        description={data?.data?.description}
      />
      {data.posts.data.map(elem => (
        <CardItem post={elem} key={elem.id} />
      ))}
    </Flex>
  )
}
