'use client'

import { Flex } from '@mantine/core'
import { RichTextEditor } from '@mantine/tiptap'
import type { Editor } from '@tiptap/react'

import { RichImage } from '../rich-image/rich-image'

export function RichEditor({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null
  }

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichImage editor={editor} />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup>
          <Flex wrap='wrap' gap='xs'>
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                  .run()
              }
            >
              insertTable
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnBefore().run()}
            >
              addColumnBefore
            </button>
            <button
              onClick={() => editor.chain().focus().addColumnAfter().run()}
            >
              addColumnAfter
            </button>
            <button onClick={() => editor.chain().focus().deleteColumn().run()}>
              deleteColumn
            </button>
            <button onClick={() => editor.chain().focus().addRowBefore().run()}>
              addRowBefore
            </button>
            <button onClick={() => editor.chain().focus().addRowAfter().run()}>
              addRowAfter
            </button>
            <button onClick={() => editor.chain().focus().deleteRow().run()}>
              deleteRow
            </button>
            <button onClick={() => editor.chain().focus().deleteTable().run()}>
              deleteTable
            </button>
            <button onClick={() => editor.chain().focus().mergeCells().run()}>
              mergeCells
            </button>
            <button onClick={() => editor.chain().focus().splitCell().run()}>
              splitCell
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
            >
              toggleHeaderColumn
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderRow().run()}
            >
              toggleHeaderRow
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              toggleHeaderCell
            </button>
            <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>
              mergeOrSplit
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setCellAttribute('colspan', 2).run()
              }
            >
              setCellAttribute
            </button>
            <button onClick={() => editor.chain().focus().fixTables().run()}>
              fixTables
            </button>
            <button onClick={() => editor.chain().focus().goToNextCell().run()}>
              goToNextCell
            </button>
            <button
              onClick={() => editor.chain().focus().goToPreviousCell().run()}
            >
              goToPreviousCell
            </button>
          </Flex>
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  )
}
