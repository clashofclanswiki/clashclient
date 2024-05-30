import { Box } from '@mantine/core'
import { Link } from '@mantine/tiptap'
import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export function RenderContent({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextAlign,
      Image,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      Blockquote,
      TextAlign.configure({ types: ['heading', 'paragraph'] })
    ],
    content,
    editable: false
  })

  return (
    <Box mt={16}>
      <EditorContent editor={editor} />
    </Box>
  )
}
