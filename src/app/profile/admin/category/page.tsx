'use client'

import { Flex, Pagination, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'

import { ContentAdmin } from '@/components/admin/content-admin/content-admin'

import { useAllCategory } from '@/hooks/category/useAllCategory'

export default function CategoryPage() {
  const [value, setValue] = useState('' as string)
  const [page, setPage] = useState(1)
  const take = 10
  const skip = (page - 1) * take

  const { data } = useAllCategory(skip, take, value)

  useEffect(() => {
    setPage(1)
  }, [value])

  return (
    <>
      <TextInput
        placeholder='Поиск'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <ContentAdmin data={data?.data} type='category' />
      <Flex justify='center' mt='xl'>
        <Pagination
          total={(data && Math.ceil(data?.total / take)) || 1}
          siblings={3}
          value={page}
          onChange={setPage}
        />
      </Flex>
    </>
  )
}
