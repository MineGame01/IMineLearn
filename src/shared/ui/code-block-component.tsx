/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import './code-block-component.css';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewProps } from '@tiptap/react';
import React, { FC } from 'react';

export const CodeBlockComponent: FC<ReactNodeViewProps> = ({ updateAttributes, extension }) => (
  <NodeViewWrapper className="code-block">
    <select
      contentEditable={false}
      onChange={(event) => {
        updateAttributes({ language: event.target.value });
      }}
    >
      <option value="null">auto</option>
      <option disabled>—</option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
