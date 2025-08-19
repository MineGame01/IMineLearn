import { memo } from 'react';
import { Modal } from '@shared/ui';
import dynamic from 'next/dynamic';
import { TReportTargetId, TReportTargetType } from '@entities/Report/index.ts';

const LazyContentModal = dynamic(
  async () => import('./content-modal.tsx').then((el) => el.ContentModal),
  {
    loading: () => <div></div>,
  }
);

export const ReportModal = memo<{
  target_type: TReportTargetType;
  target_id: TReportTargetId;
  close: () => void;
  open: boolean;
}>(({ target_type, target_id, close, open }) => {
  return (
    <Modal open={open} onClose={close}>
      <LazyContentModal target_type={target_type} target_id={target_id} close={close} />
    </Modal>
  );
});
