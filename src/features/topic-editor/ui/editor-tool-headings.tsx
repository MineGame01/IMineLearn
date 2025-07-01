import { Dropdown, DropdownItem, DropdownList, Heading } from '@shared/ui';
import { Editor } from '@tiptap/react';
import { FC, Fragment, useId, useRef, useState } from 'react';
import { ButtonToolEditor } from './button-tool-editor';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

export const EditorToolHeadings: FC<{ editor: Editor | null }> = ({ editor }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const DROPDOWN_HEADINGS_ID = useId();

  return (
    <Fragment>
      <ButtonToolEditor
        onClick={() => {
          setShowDropdown(true);
        }}
        title="Toogle heading"
        ref={buttonRef}
        aria-expanded={showDropdown}
        aria-controls={DROPDOWN_HEADINGS_ID}
      >
        <Heading />
      </ButtonToolEditor>
      <Dropdown
        id={DROPDOWN_HEADINGS_ID}
        anchorEl={buttonRef}
        open={showDropdown}
        close={() => {
          setShowDropdown(false);
        }}
      >
        <DropdownList>
          {Array(6)
            .fill(1)
            .map((_unused, index) => {
              const heading_level = index + 1;

              const handleClickHeading = () => {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading_level as Level })
                  .run();
              };

              return (
                <DropdownItem
                  key={index}
                  onClick={handleClickHeading}
                  active={editor?.isActive('heading', { level: heading_level })}
                  leftIcon={<strong>H{heading_level}</strong>}
                >
                  Heading {heading_level}
                </DropdownItem>
              );
            })}
        </DropdownList>
      </Dropdown>
    </Fragment>
  );
};
