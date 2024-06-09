import { Flex } from '@mantine/core'
import { Metadata } from 'next'

import { CategoryInfo } from '@/components/category-info/category-info'
import { WikiCategory } from '@/components/wiki/wiki-category/wiki-category'

import { SITE_NAME } from '@/constants/seo.constants'

import { ICategoryResponse } from '@/types/category.types'

export const metadata: Metadata = {
  title: `Деревня строителя | Вики`,
  description: `Исследуйте деревню строителя в Clash of Clans на ${SITE_NAME}. Защита, ресурсы, армия и лучшие стратегии для успешной игры. Сделайте свою деревню непобедимой!`
}

async function getCategory() {
  const res = await fetch(
    `${process.env.SERVER_URL}/category?type=builder-base`,
    {
      cache: 'no-cache'
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function BuilderVillage() {
  const data: ICategoryResponse = await getCategory()

  return (
    <Flex gap='md' direction='column' align='center'>
      <CategoryInfo
        title='Деревня строителя | Вики'
        description='ClashOfClansWiki.ru представляет вики по деревне строителя в Clash of Clans. Узнайте всё о защите, ресурсах, армии и тактиках для вашей деревни.'
      />

      {data.data.map(elem => (
        <WikiCategory category={elem} key={elem.slug} />
      ))}
    </Flex>
  )
}
