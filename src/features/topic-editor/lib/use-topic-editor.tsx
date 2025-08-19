import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { CodeBlockComponent } from '@shared/ui/code-block-component';
import ParagraphExtension from '@tiptap/extension-paragraph';
import TextExtension from '@tiptap/extension-text';
import BoldExtension from '@tiptap/extension-bold';
import ItalicExtension from '@tiptap/extension-italic';
import HeadingExtension from '@tiptap/extension-heading';
import StrikeExtension from '@tiptap/extension-strike';
import DocumentExtension from '@tiptap/extension-document';
import DropcursorExtension from '@tiptap/extension-dropcursor';
import ImageExtension from '@tiptap/extension-image';
import { Bold, Code, Italic, Strike } from '@shared/ui';
import { useEditor, ReactNodeViewRenderer, Editor, UseEditorOptions } from '@tiptap/react';
import { common, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import { FC } from 'react';

const lowlight = createLowlight(common);

lowlight.register('css', css);
lowlight.register('html', html);

interface IToolEditor {
  title: string;
  command: () => void;
  icon?: FC;
  active?: boolean;
}

export const useTopicEditor = (options?: UseEditorOptions): [Editor | null, IToolEditor[]] => {
  const editor = useEditor({
    ...options,
    immediatelyRender: false,
    extensions: [
      ...(options?.extensions ?? []),
      ParagraphExtension,
      TextExtension,
      BoldExtension,
      ItalicExtension,
      HeadingExtension,
      StrikeExtension,
      DocumentExtension,
      DropcursorExtension,
      ImageExtension,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
  });

  const editorTools: IToolEditor[] = [
    {
      title: 'Bold',
      command: () => {
        editor?.chain().focus().toggleBold().run();
      },
      icon: Bold,
      active: editor?.isActive('bold'),
    },
    {
      title: 'Italic',
      command: () => {
        editor?.chain().focus().toggleItalic().run();
      },
      icon: Italic,
      active: editor?.isActive('italic'),
    },
    {
      title: 'Strike',
      command: () => {
        editor?.chain().focus().toggleStrike().run();
      },
      icon: Strike,
      active: editor?.isActive('strike'),
    },
    {
      title: 'Code',
      command: () => {
        editor?.chain().focus().toggleCodeBlock().run();
      },
      icon: Code,
      active: editor?.isActive('codeBlock'),
    },
    {
      title: 'Paragraph',
      command: () => {
        editor?.chain().focus().setParagraph().run();
      },
      icon: () => {
        return <span className="font-bold text-[1.5rem] px-1.5">P</span>;
      },
      active: editor?.isActive('paragraph'),
    },
  ];

  return [editor, editorTools];
};
