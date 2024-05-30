'use client'

import { Button, Flex, TextInput, Textarea, Title, rem } from '@mantine/core'
import { useEffect, useState } from 'react'

import { ICategory } from '@/types/category.types'

import { useCreateCategory } from '@/hooks/category/useCreateCategory'
import { useUpdateCategory } from '@/hooks/category/useUpdateCategory'

import { generateSlug } from '@/utils/slugify'

export function AddCategoryAdmin({
  category,
  oldSlug
}: {
  category?: ICategory
  oldSlug?: string
}) {
  const [title, setTitle] = useState<string>(category?.title || '')
  const [slug, setSlug] = useState<string>(category?.slug || '')
  const [description, setDescription] = useState<string>(
    category?.description || ''
  )
  const [type, setType] = useState<string>(category?.type || '')

  useEffect(() => {
    if (
      oldSlug &&
      category?.title &&
      category?.slug &&
      category?.description &&
      category?.type
    ) {
      setTitle(category.title)
      setSlug(category.slug)
      setDescription(category.description)
      setType(category.type)
    }
  }, [category, oldSlug])

  const { mutate } = useCreateCategory()
  const { updateCategory } = useUpdateCategory()

  const handleSubmit = () => {
    const data = {
      title: title,
      description: description,
      slug: slug,
      type: type
    }

    if (slug && oldSlug) {
      updateCategory({ data, oldSlug })
    } else {
      mutate(data)
    }
  }

  return (
    <Flex justify='center' gap='md' direction='column' align='center'>
      <Title order={3}>
        {slug ? 'Редактировать категорию' : 'Добавить категорию'}
      </Title>

      <TextInput
        maw={rem(400)}
        w='100%'
        placeholder='Заголовок'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Flex maw={rem(400)} w='100%' direction='column' gap='md'>
        <TextInput
          placeholder='Slug'
          value={slug}
          onChange={e => setSlug(e.target.value)}
        />
        <Button onClick={() => setSlug(generateSlug(title))}>
          Сгенерировать
        </Button>
      </Flex>

      <Textarea
        maw={rem(400)}
        w='100%'
        placeholder='Описание'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextInput
        maw={rem(400)}
        w='100%'
        placeholder='Тип'
        value={type}
        onChange={e => setType(e.target.value)}
      />

      <Button onClick={handleSubmit}>Сохранить</Button>
    </Flex>
  )
}
