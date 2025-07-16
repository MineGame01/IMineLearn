/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { TTopicId } from '@entities/Topic';
import { IReport, TReportId } from '@entities/Report';
import { IReaction } from '@entities/Reaction';

/**
 * Quickly define the desired endpoint properties
 *
 * @typeParam R - Request response type
 * @typeParam B - Payload type
 * */
interface createEndpoint<R, B> {
  dataResponse: R;
  bodyRequest: B;
}

export interface IForumApi {
  endpoints: {
    addReaction: createEndpoint<null, Pick<IReaction, 'topic_id' | 'type_reaction'>>;
    getReactions: createEndpoint<IReaction[], { topic_id: TTopicId }>;
    sendReport: createEndpoint<
      null,
      Pick<IReport, 'content' | 'reason' | 'target_id' | 'target_type'>
    >;
    getReports: createEndpoint<IReport[], { report_id?: TReportId } | void>;
    deleteReport: createEndpoint<null, { report_id: TReportId }>;
  };
}
