import { FC, Fragment, useRef, useState } from 'react';
import { Button, Input } from '@shared/ui';
import { useSendReportMutation } from '@app/api';
import { MAX_REPORT_CONTENT_LENGTH, TReportTargetId, TReportTargetType } from '@entities/Report';

type TTypeReason =
  | 'spam'
  | 'abuse'
  | 'inappropriate-content'
  | 'misinformation'
  | 'rules-violation';

const defaultReasonsReport: { [key in TTypeReason]: string } = {
  spam: 'Spam or Advertising',
  abuse: 'Abuse',
  'inappropriate-content': 'Inappropriate Content',
  misinformation: 'Misinformation',
  'rules-violation': 'Rules Violation',
};

export const ReportForm: FC<{
  close: () => void;
  target_type: TReportTargetType;
  target_id: TReportTargetId;
}> = ({ close, target_type, target_id }) => {
  const [reasonReport, setReasonReport] = useState<TTypeReason | null | 'other'>(null);
  const [otherReasonReport, setOtherReasonReport] = useState('');
  const [error, setError] = useState<string | null>(null);
  const idErrorTimeout = useRef<NodeJS.Timeout | null>(null);

  const [sendReport, { isLoading }] = useSendReportMutation();

  const isError = Boolean(error);

  const handleClickSubmitReport = async () => {
    if (idErrorTimeout.current) {
      clearTimeout(idErrorTimeout.current);
    }
    if (reasonReport) {
      try {
        await sendReport({
          reason: reasonReport,
          content: defaultReasonsReport[reasonReport] ?? otherReasonReport,
          target_type,
          target_id,
        }).unwrap();
        close();
      } catch (error) {
        if ('data' in error) {
          if ('message' in error.data) {
            setError(error.data.message);
          }
        }
        idErrorTimeout.current = setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  return (
    <Fragment>
      <div className="font-bold text-[1.2rem]">Why Are You Reporting This?</div>
      <form className="my-3">
        <div>
          {Object.keys(defaultReasonsReport).map((reason) => {
            const controlerId = 'controler-' + reason;

            return (
              <div key={reason}>
                <input
                  type="radio"
                  id={controlerId}
                  checked={reason === reasonReport}
                  onChange={() => setReasonReport(reason as TTypeReason)}
                />
                <label className="ml-2" htmlFor={controlerId}>
                  {defaultReasonsReport[reason]}
                </label>
              </div>
            );
          })}
          <div className="mt-2">
            <input
              type="radio"
              id="controler-other"
              checked={reasonReport === 'other'}
              onChange={() => setReasonReport('other')}
            />
            <label className="ml-2" htmlFor="controler-other">
              Other
            </label>
          </div>
        </div>

        {reasonReport === 'other' && (
          <Input
            inputAttr={{
              required: true,
              autoFocus: true,
              value: otherReasonReport,
              onChange: (event) => {
                const value = event.currentTarget.value;
                if (value.length <= MAX_REPORT_CONTENT_LENGTH) {
                  setOtherReasonReport(value);
                }
              },
            }}
            isError={isError}
            helperText={<span>Max length: {MAX_REPORT_CONTENT_LENGTH}</span>}
          />
        )}
        {isError && <div className="text-center text-red-500 mt-1">{error}</div>}
        {isLoading && <div>Loading...</div>}
      </form>
      <div className="flex gap-2">
        <Button
          disabled={isLoading}
          onClick={() => {
            close();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={reasonReport === null || isLoading}
          onClick={handleClickSubmitReport}
          variant={'contained'}
        >
          Send
        </Button>
      </div>
    </Fragment>
  );
};
