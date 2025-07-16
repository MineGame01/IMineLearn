import './style.css';
import { Editor, EditorContent, EditorContentProps } from '@tiptap/react';
import { FC } from 'react';
import { EditorToolHeadings } from './editor-tool-headings';
import { EditorToolAddedImage } from './editor-tool-added-image';
import { useTopicEditor } from '../lib/use-topic-editor';
import { ButtonToolEditor } from './button-tool-editor';

interface IProps extends EditorContentProps {
  editor: Editor | null;
  editorTools: ReturnType<typeof useTopicEditor>[1];
}

export const TopicEditor: FC<IProps> = ({ editor, editorTools, ...props }) => {
  return (
    <div>
      <div className="bg-background flex border-2 border-border rounded-t-border-default">
        {editorTools.map((tool, index) => {
          const { title, active, command, icon: Icon } = tool;

          return (
            <ButtonToolEditor key={index} active={active} title={title} onClick={command}>
              {Icon ? <Icon /> : title}
            </ButtonToolEditor>
          );
        })}
        <EditorToolHeadings editor={editor} />
        <EditorToolAddedImage editor={editor} />
      </div>
      <EditorContent {...props} editor={editor} id="topicEditor" />
    </div>
  );
};
