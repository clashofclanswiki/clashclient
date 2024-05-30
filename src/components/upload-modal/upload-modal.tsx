import {
  ActionIcon,
  Button,
  CopyButton,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
  rem
} from '@mantine/core'
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { useDisclosure } from '@mantine/hooks'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useState } from 'react'

import { useAllFiles } from '@/hooks/files/useAllFiles'
import { useCreateFile } from '@/hooks/files/useCreateFile'

export function UploadModal() {
  const [opened, { open, close }] = useDisclosure(false)

  const [active, setActive] = useState<string>('' as string)
  const [value, setValue] = useState<string>('' as string)
  const [files, setFiles] = useState<File[]>([])

  const { data, isLoading } = useAllFiles()

  const { mutate } = useCreateFile()

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Галерея'
        size='70%'
        centered
        radius='md'
      >
        <Flex direction='column' gap='md'>
          <Dropzone
            onDrop={files => mutate(files)}
            onReject={files => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            // {...props}
          >
            <Group
              justify='center'
              gap='xl'
              mih={220}
              style={{ pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: 'var(--mantine-color-blue-6)'
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: 'var(--mantine-color-red-6)'
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: 'var(--mantine-color-dimmed)'
                  }}
                  stroke={1.5}
                />
              </Dropzone.Idle>

              <div>
                <Text size='xl' inline>
                  Drag images here or click to select files
                </Text>
                <Text size='sm' c='dimmed' inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
          <ScrollArea h={350} w='100%'>
            <Flex gap='md' wrap='wrap'>
              {data?.map(elem => (
                <Paper
                  key={elem.url}
                  withBorder={elem.url === active}
                  style={{ cursor: 'pointer' }}
                  h={200}
                  w={200}
                >
                  <Image
                    radius='md'
                    h={200}
                    w={200}
                    onClick={() => setActive(elem.url)}
                    fit='contain'
                    src={`http://localhost:4200${elem.url}`}
                    alt=''
                  />
                </Paper>
              ))}
            </Flex>
          </ScrollArea>

          <Flex align='center' gap='md'>
            <TextInput
              value={active}
              onChange={e => setValue(e.target.value)}
              w='100%'
            />
            <CopyButton value={`http://localhost:4200${active}`} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Copied' : 'Copy'}
                  withArrow
                  position='right'
                >
                  <ActionIcon
                    color={copied ? 'teal' : 'gray'}
                    variant='subtle'
                    onClick={copy}
                  >
                    {copied ? (
                      <IconCheck style={{ width: rem(16) }} />
                    ) : (
                      <IconCopy style={{ width: rem(16) }} />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Flex>
        </Flex>
      </Modal>

      <Button onClick={open}>Добавить изображения</Button>
    </>
  )
}
