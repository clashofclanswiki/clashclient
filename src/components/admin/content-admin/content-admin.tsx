'use client'

import { ActionIcon, Flex, Group, Table, Text, rem } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { ICategory } from '@/types/category.types'
import { IPost } from '@/types/post.types'

import { useRemoveCategory } from '@/hooks/category/useRemoveCategory'
import { useRemovePost } from '@/hooks/post/useRemovePost'

type Type = 'news' | 'category'

export function ContentAdmin({
  data,
  type
}: {
  data?: IPost[] | ICategory[]
  type: Type
}) {
  const { push } = useRouter()

  const { removeCategory } = useRemoveCategory()

  const { removePost } = useRemovePost()

  const rows = data?.map(item => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap='sm'>
          <Link href={`/${item.slug}`}>
            <Text fz='sm' fw={500}>
              {item.title}
            </Text>
          </Link>
        </Group>
      </Table.Td>

      <Table.Td>{item.description}</Table.Td>

      {/* <Table.Td>
        <Flex align='center'>
          {item?.countOpened && <Text fz='sm'>{item.countOpened}</Text>}
        </Flex>
      </Table.Td> */}

      <Table.Td>
        <Group gap={0} justify='flex-end'>
          <ActionIcon
            variant='subtle'
            color='gray'
            onClick={() => push(`${type}/${item.slug}`)}
          >
            <IconPencil
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            variant='subtle'
            color='red'
            onClick={() =>
              type === 'category'
                ? removeCategory(item.slug)
                : removePost(item.slug)
            }
          >
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing='sm'>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Заголовок</Table.Th>
            <Table.Th>Категория / Тип</Table.Th>
            {/* {type === 'news' && <Table.Th>Просмотры</Table.Th>} */}
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  )
}
