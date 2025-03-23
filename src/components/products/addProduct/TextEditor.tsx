"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import TextStyle from "@tiptap/extension-text-style"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { common, createLowlight } from "lowlight"
const lowlight = createLowlight(common)
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Code,
  Quote,
  Undo,
  Redo,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

interface TextEditorProps {
  content: string
  onChange: (content: string) => void
}

const TextEditor = ({ content, onChange }: TextEditorProps) => {
  const [textStyle, setTextStyle] = useState("Normal text")

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextStyle,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content:
      content ||
      `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run()

    if (editor.isActive("heading", { level })) {
      setTextStyle(`Heading ${level}`)
    } else {
      setTextStyle("Normal text")
    }
  }

  const toggleParagraph = () => {
    editor.chain().focus().setParagraph().run()
    setTextStyle("Normal text")
  }

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-300 bg-white">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-1 rounded hover:bg-gray-100"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-1 rounded hover:bg-gray-100"
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>

        <div className="relative">
          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
            {textStyle} <ChevronDown className="w-4 h-4" />
          </button>
          {/* Dropdown menu would go here */}
        </div>

        <div className="relative">
          <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
            <List className="w-5 h-5" /> <ChevronDown className="w-4 h-4" />
          </button>
          {/* Dropdown menu would go here */}
        </div>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
          title="Bold"
        >
          <Bold className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
          title="Italic"
        >
          <Italic className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
          title="Underline"
        >
          <UnderlineIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("strike") ? "bg-gray-200" : ""}`}
          title="Strikethrough"
        >
          <Strikethrough className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
          title="Bullet List"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
          title="Numbered List"
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            const url = window.prompt("URL")
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("link") ? "bg-gray-200" : ""}`}
          title="Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            const url = window.prompt("Image URL")
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
          className="p-1 rounded hover:bg-gray-100"
          title="Image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("codeBlock") ? "bg-gray-200" : ""}`}
          title="Code Block"
        >
          <Code className="w-5 h-5" />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1 rounded hover:bg-gray-100 ${editor.isActive("blockquote") ? "bg-gray-200" : ""}`}
          title="Quote"
        >
          <Quote className="w-5 h-5" />
        </button>
      </div>

      <EditorContent editor={editor} className="p-4 min-h-[200px] prose max-w-none focus:outline-none" />
    </div>
  )
}

export default TextEditor;