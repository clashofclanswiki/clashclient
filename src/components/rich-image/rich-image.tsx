import { Button, Flex, Modal, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPhotoPlus } from '@tabler/icons-react'
import { Editor } from '@tiptap/react'
import { useState } from 'react'

export function RichImage({ editor }: { editor: Editor }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleImageUpload = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      close()
      setImageUrl(null)
    }
  }

  const [opened, { open, close }] = useDisclosure(false)

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value)
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Ссылка на картинку'
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 1
        }}
      >
        <Flex direction='column' justify='center' align='center' gap='md'>
          <TextInput
            w='100%'
            placeholder='Вставьте ссылку на изображение'
            value={imageUrl || ''}
            onChange={handleImageUrlChange}
          />

          <Button onClick={handleImageUpload}>Добавить</Button>
        </Flex>
      </Modal>

      <IconPhotoPlus
        cursor={'pointer'}
        stroke={1}
        onClick={open}
        width={16}
        height={16}
      />
    </>
  )
}
