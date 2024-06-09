import { Flex } from '@mantine/core'

import { CategoryInfo } from '@/components/category-info/category-info'
import { WikiCard } from '@/components/wiki/wiki-card/wiki-card'

import { ICategoryOne } from '@/types/category.types'
import { RouteWikiParams } from '@/types/root.types'

export async function generateMetadata({ params }: RouteWikiParams) {
  const { wiki } = params

  const data: ICategoryOne = await getCategory(wiki)

  return {
    title: data.data.title,
    description: data.data.description
  }
}

async function getCategory(wiki: string) {
  const res = await fetch(`${process.env.SERVER_URL}/category/${wiki}`, {
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function WikiPage({ params }: RouteWikiParams) {
  const { wiki } = params

  const data: ICategoryOne = await getCategory(wiki)

  return (
    <Flex gap='md' direction='column' align='center'>
      <CategoryInfo title={data.data.title} description={data.data.title} />
      <Flex gap='md' align='center' w='100%'>
        {data.posts.data.map(elem => (
          <WikiCard post={elem} key={elem.id} />
        ))}
      </Flex>
    </Flex>
  )
}
