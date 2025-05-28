/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  IComment,
  ITopic,
  TCommentId,
  TTopicContent,
  TTopicId,
  TTopicTitle,
} from '@entities/Topic';
import { ICategory, TCategoryId } from '@entities/categories-list';
import { IAuthUser, TUserBio, TUserEmail, TUserId, TUserUserName } from '@entities/User';
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

interface ILoginCredentials {
  access_token: string;
  refresh_token: string;
  user_id: TUserId;
}

export interface IForumApi {
  endpoints: {
    getUser: createEndpoint<IAuthUser, { user_id?: TUserId; username?: TUserUserName }>;
    addReaction: createEndpoint<null, Pick<IReaction, 'topic_id' | 'type_reaction'>>;
    getReactions: createEndpoint<IReaction[], { topic_id: TTopicId }>;
    getTopics: createEndpoint<
      ITopic[] | TTopicId[],
      {
        user_id?: TUserId;
        search?: string;
        created_after?: string;
        created_before?: string;
        category_id?: TCategoryId;
        limit_count?: number;
        offset_count?: number;
        return_ids_only?: boolean;
      }
    >;
    getTopicById: createEndpoint<ITopic, TTopicId>;
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
    createTopic: createEndpoint<
      TTopicId,
      {
        category_id: TCategoryId;
        title: TTopicTitle;
        content: TTopicContent;
      }
    >;
    deleteTopic: createEndpoint<null, { topic_id: TTopicId }>;
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
    login: createEndpoint<ILoginCredentials, { email: TUserEmail; password: string }>;
    registration: createEndpoint<
      ILoginCredentials,
      { username: TUserUserName; email: TUserEmail; password: string }
    >;
    refreshAccessToken: createEndpoint<
      Pick<ILoginCredentials, 'access_token' | 'user_id'>,
      Pick<ILoginCredentials, 'refresh_token'>
    >;
    getConsoleParam: createEndpoint<string | number | boolean, { field: string }>;
    createCategory: createEndpoint<null, Pick<ICategory, 'name'> & { image_base64: string | null }>;
    deleteCategory: createEndpoint<null, { category_id: TCategoryId }>;
    deleteComment: createEndpoint<null, TCommentId>;
    updateUser: createEndpoint<
      { username: TUserUserName; bio: TUserBio },
      { username?: TUserUserName; bio?: TUserBio }
    >;
  };
}
