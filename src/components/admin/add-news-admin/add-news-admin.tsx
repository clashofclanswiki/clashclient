'use client'

import {
  Button,
  Flex,
  Select,
  TextInput,
  Textarea,
  Title,
  rem
} from '@mantine/core'
import { Link } from '@mantine/tiptap'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import SubScript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

import { RichEditor } from '@/components/rich-editor/rich-editor'
import { UploadModal } from '@/components/upload-modal/upload-modal'

import { IPost } from '@/types/post.types'

import { useAllCategory } from '@/hooks/category/useAllCategory'
import { useCreatePost } from '@/hooks/post/useCreatePost'
import { useUpdatePost } from '@/hooks/post/useUpdatePost'

import { generateSlug } from '@/utils/slugify'

export function AddNewsAdmin({
  post,
  oldSlug
}: {
  post?: IPost
  oldSlug?: string
}) {
  const [title, setTitle] = useState<string>('')
  const [slug, setSlug] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('' as string)
  const [content, setContent] = useState<string>('')
  const [category, setCategory] = useState<string | null>('')

  const { createPost } = useCreatePost()
  const { updatePost } = useUpdatePost()

  const take = 10
  const skip = 0

  const { data } = useAllCategory(skip, take)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content
  })

  useEffect(() => {
    if (
      oldSlug &&
      post?.title &&
      post?.slug &&
      post?.description &&
      post?.content &&
      post?.image &&
      post?.categoryId
    ) {
      setTitle(post.title)
      setSlug(post.slug)
      setDescription(post.description)
      setContent(post.content)
      setImage(post.image)
      setContent(post.content)
      setCategory(post.categoryId)
      if (editor) {
        editor.commands.setContent(post.content)
      }
    }
  }, [post, oldSlug, editor])

  const categoryList = data?.data.map(elem => ({
    value: elem.id,
    label: elem.title
  }))

  const handleSubmit = () => {
    const content = editor?.getHTML()

    if (content && category) {
      const data = {
        title: title,
        description: description,
        slug: slug,
        content: content,
        image: image,
        category: category
      }

      if (slug && oldSlug) {
        updatePost({ data, oldSlug })
      } else {
        createPost(data)
      }
    }
  }

  return (
    <Flex justify='center' gap='md' direction='column' align='center'>
      <Title order={3}>Добавить новость</Title>

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

      <UploadModal />

      <TextInput
        maw={rem(400)}
        w='100%'
        placeholder='Главная картинка'
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Select
        data={categoryList || []}
        value={category}
        onChange={setCategory}
      />

      <RichEditor editor={editor} />

      <Button onClick={handleSubmit}>Сохранить</Button>
    </Flex>
  )
}
