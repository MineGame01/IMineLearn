import { FC, Fragment, useState } from 'react';
import { Button, Input } from '@shared/ui';
import { useSendReportMutation } from '@app/api';
import { MAX_REPORT_CONTENT_LENGTH, TReportTargetId, TReportTargetType } from '@entities/Report';
import { getServerErrorMessage } from '@shared/model';

type TAvailableReason =
  | 'spam'
  | 'abuse'
  | 'inappropriate-content'
  | 'misinformation'
  | 'rules-violation'
  | 'other';

export const ReportForm: FC<{
  close: () => void;
  target_type: TReportTargetType;
  target_id: TReportTargetId;
}> = ({ close, target_type, target_id }) => {
  const [reasonReport, setReasonReport] = useState<TAvailableReason | null | 'other'>(null);
  const [otherReasonReport, setOtherReasonReport] = useState('');

  const reasons_report: Record<TAvailableReason, string> = {
    spam: 'Spam or Advertising',
    abuse: 'Abuse',
    'inappropriate-content': 'Inappropriate Content',
    misinformation: 'Misinformation',
    'rules-violation': 'Rules Violation',
    other: otherReasonReport,
  };

  const [sendReport, { isLoading, error, isError }] = useSendReportMutation();

  const errorMessage = getServerErrorMessage(error);

  const handleClickSubmitReport = () => {
    if (reasonReport) {
      void sendReport({
        reason: reasonReport,
        content: reasons_report[reasonReport],
        target_type,
        target_id,
      })
        .unwrap()
        .then(() => {
          close();
        });
    }
  };

  return (
    <Fragment>
      <div className="font-bold text-[1.2rem]">Why Are You Reporting This?</div>
      <form className="my-3">
        <div>
          {Object.keys(reasons_report).map((reason) => {
            const controlerId = 'controler-' + reason;

            if (reason !== 'other') {
              return (
                <div key={reason}>
                  <input
                    type="radio"
                    id={controlerId}
                    checked={reason === reasonReport}
                    onChange={() => {
                      setReasonReport(reason as TAvailableReason);
                    }}
                  />
                  <label className="ml-2" htmlFor={controlerId}>
                    {reasons_report[reason]}
                  </label>
                </div>
              );
            }
          })}
          <div className="mt-2">
            <input
              type="radio"
              id="controler-other"
              checked={reasonReport === 'other'}
              onChange={() => {
                setReasonReport('other');
              }}
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
        {isError && <div className="text-center text-red-500 mt-1">{errorMessage}</div>}
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
