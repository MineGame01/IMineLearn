import './style.css';
import { EditorContent, EditorContentProps } from '@tiptap/react';
import { FC } from 'react';
import { useTopicEditor } from '../lib/use-topic-editor';

interface IProps extends Omit<EditorContentProps, 'editor'> {
  topicEditorOptions?: Parameters<typeof useTopicEditor>[0];
}

export const TopicEditorContent: FC<IProps> = ({ topicEditorOptions, ...props }) => {
  const [topicEditor] = useTopicEditor(topicEditorOptions);

  return <EditorContent {...props} editor={topicEditor} id="topicEditorContent" />;
};
