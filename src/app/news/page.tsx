import { Flex } from '@mantine/core'

import { CardItem } from '@/components/card/card-item'
import { CategoryInfo } from '@/components/category-info/category-info'

import { ICategoryOne } from '@/types/category.types'

// async function getCategory() {
//   const res = await fetch(`http://localhost:4200/api/category/news`, {
//     next: { revalidate: 3600 }
//   })

//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

//   return res.json()
// }

export default async function NewsPage() {
  // const data: ICategoryOne = await getCategory()

  return (
    <Flex gap='md' direction='column' align='center'>
      {/* <CategoryInfo
        title={data.data.title}
        description={data.data.description}
      />
      {data.posts.data.map(elem => (
        <CardItem post={elem} key={elem.id} />
      ))} */}
      aaa
    </Flex>
  )
}
