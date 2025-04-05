import { FC, useState, useCallback, useRef, ChangeEventHandler, ChangeEvent } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TDatePickerState } from '@features/TopicList/model/TDatePickerState.ts';
import { TTypeSorted } from '@features/TopicList/model/TTypeSorted.ts';
import { changeDatePickerStates } from '@features/TopicList/model/changeDatePickerStates.ts';
import { TCategoryId } from '@entities/Category';
import { useGetTopicsByCategoryQuery } from '@app/api';
import { List } from './list.tsx';
import { ITopic } from '@entities/Topic';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TopicCreateModal } from '@widgets/TopicCreateModal';
import { Button, Dropdown, DropdownItem, DropdownList, Input } from '@shared/ui';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { getServerErrorMessage } from '@shared/model/get-server-error-message.ts';

const MemoDatePickers = dynamic(async () =>
  import('./date-pickers.tsx').then((el) => el.DatePickers)
);

export const TopicsList: FC<{ categoryId: TCategoryId }> = ({ categoryId }) => {
  const [datePickerState, setDatePickerState] = useState<TDatePickerState>({
    createdAtBefore: null,
    createdAtAfter: null,
    isOpenModalCreatedAtBefore: false,
    isOpenModalCreatedAtAfter: false,
  });
  const [searchContent, setSearchContent] = useState('');
  const [isOpenMoreOptions, setOpenMoreOptions] = useState(false);
  const [isOpenTopicCreateModal, setOpenTopicCreateModal] = useState(false);
  const [showMenuTypeSorted, setShowMenuTypeSorted] = useState(false);
  const menuTypeSortedRef = useRef<HTMLButtonElement | null>(null);
  const [typeSorted, setTypeSorted] = useState<TTypeSorted>('latest');

  const { createdAtAfter, createdAtBefore } = datePickerState;
  const {
    data,
    isLoading,
    isError,
    error: _error,
  } = useGetTopicsByCategoryQuery({
    ...(searchContent ? { search: searchContent } : {}),
    ...(createdAtAfter && createdAtBefore
      ? {
          created_after: createdAtBefore === createdAtAfter ? undefined : String(createdAtAfter),
          created_before: String(createdAtBefore),
        }
      : {}),
    category_id: categoryId,
  });

  const errorMessage = getServerErrorMessage(_error) ?? 'Unknown error';

  const changeCheckedMoreOptions = (checked: boolean) => {
    if (checked) {
      setDatePickerState({
        ...datePickerState,
        createdAtBefore: dayjs().valueOf(),
        createdAtAfter: dayjs()
          .set('date', dayjs().date() - 1)
          .valueOf(),
      });
    } else {
      setDatePickerState({
        ...datePickerState,
        createdAtBefore: null,
        createdAtAfter: null,
      });
    }
    setOpenMoreOptions(checked);
  };

  const handleCloseTopicCreateModal = useCallback(() => {
    setOpenTopicCreateModal(false);
  }, [setOpenTopicCreateModal]);

  const changeDatePickerState = changeDatePickerStates(setDatePickerState, datePickerState);

  return (
    <div>
      <div className="my-2 flex items-center flex-wrap">
        <Input
          isError={isError}
          value={searchContent}
          onChange={(event) => {
            setSearchContent(event.target.value);
          }}
          label={'Title'}
          helperText={isError ? <span>{errorMessage}</span> : undefined}
        />
        <Button
          ref={menuTypeSortedRef}
          aria-controls={showMenuTypeSorted ? 'topic-list-menu-type-sorted' : undefined}
          aria-expanded={showMenuTypeSorted}
          className="w-auto"
          variant="contained"
          // endIcon={showMenuTypeSorted ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          onClick={() => {
            setShowMenuTypeSorted(true);
          }}
        >
          {typeSorted}
        </Button>
        <Dropdown
          open={showMenuTypeSorted}
          anchorEl={menuTypeSortedRef}
          close={() => {
            setShowMenuTypeSorted(false);
          }}
        >
          <DropdownList>
            <DropdownItem onClick={() => setTypeSorted('latest')}>
              <KeyboardArrowUpIcon /> Latest
            </DropdownItem>
            <DropdownItem onClick={() => setTypeSorted('old')}>
              <KeyboardArrowDownIcon /> Old
            </DropdownItem>
          </DropdownList>
        </Dropdown>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <input
            type="checkbox"
            checked={isOpenMoreOptions}
            onChange={() => changeCheckedMoreOptions(!isOpenMoreOptions)}
          />
          {isOpenMoreOptions && (
            <MemoDatePickers
              datePickerState={datePickerState}
              setDatePickerState={setDatePickerState}
              changeDatePickerState={changeDatePickerState}
            />
          )}
        </LocalizationProvider>
        <Button
          className="w-auto ml-auto"
          variant="contained"
          onClick={() => setOpenTopicCreateModal(true)}
        >
          Create Topic
        </Button>
        <TopicCreateModal
          category_id={categoryId}
          open={isOpenTopicCreateModal}
          onClose={handleCloseTopicCreateModal}
        />
      </div>
      {data && <List topics={data as ITopic[]} />}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
