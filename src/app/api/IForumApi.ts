/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { IComment, TCommentId, TTopicContent, TTopicId } from '@entities/Topic';
import { ICategory, TCategoryId } from '@entities/categories-list';
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
    getCommentsByTopicId: createEndpoint<
      IComment[],
      {
        topic_id: TTopicId;
        limit_count?: number;
        offset_count?: number;
        return_ids_only?: boolean;
      }
    >;
    createComment: createEndpoint<
      null,
      {
        topic_id: TTopicId;
        content: TTopicContent;
      }
    >;
    getCommentById: createEndpoint<IComment, TCommentId>;
    sendReport: createEndpoint<
      null,
      Pick<IReport, 'content' | 'reason' | 'target_id' | 'target_type'>
    >;
    getReports: createEndpoint<IReport[], { report_id?: TReportId } | void>;
    deleteReport: createEndpoint<null, { report_id: TReportId }>;
    getCategoryById: createEndpoint<ICategory, TCategoryId>;
    getCategories: createEndpoint<
      ICategory[] | ICategory | string[],
      {
        limit_count?: number;
        offset_count?: number;
        return_ids_only?: boolean;
      } | void
    >;
    getConsoleParam: createEndpoint<string | number | boolean, { field: string }>;
    createCategory: createEndpoint<null, Pick<ICategory, 'name'> & { image_base64: string | null }>;
    deleteCategory: createEndpoint<null, { category_id: TCategoryId }>;
    deleteComment: createEndpoint<null, TCommentId>;
  };
}
