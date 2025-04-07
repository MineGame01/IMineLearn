import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { client } from '@app/api/db';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { CommentSchema, IComment, TTopicId } from '@entities/Topic';
import { FindOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery
  extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count' | 'return_ids_only'> {
  topic_id: TTopicId | null;
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { defaultOptions, getFilterQueryParams } = new FiltersDataResponse();

  const queryParams: IRequestQuery = {
    topic_id: searchParams.get('topic_id'),
    ...getFilterQueryParams(searchParams),
  };

  const { topic_id, return_ids_only, limit_count, offset_count } = queryParams;

  if (!topic_id || topic_id.length < 24) {
    return NextResponse.json({ message: 'Query param topic_id is required!' }, { status: 400 });
  }

  const defaultFindOptions: FindOptions = {
    limit: limit_count ?? defaultOptions.limit_count,
    skip: offset_count ?? defaultOptions.offset_count,
  };

  const commentsCollection = client.db('db').collection<IComment>('comments');

  const commentsFind = commentsCollection.find({ topic_id }, defaultFindOptions);

  if (return_ids_only) {
    return NextResponse.json<string[]>(await commentsFind.map((comment) => comment._id).toArray());
  }

  return NextResponse.json<IComment[]>(await commentsFind.toArray());
};

interface IDataRequest {
  topic_id: TTopicId | null;
  content: IComment['content'] | null;
}

export const POST = await checkAuthAccessToken(async (request: NextRequest) => {
  const body = await request.json();
  const authUser = request.auth;

  if (!authUser) {
    return;
  }

  const { topic_id, content } = body as IDataRequest;
  const { _id } = authUser;

  const {
    error: errorCommentValidate,
    warning: warningCommentValidate,
    value: commentValidate,
  } = CommentSchema.validate({ content, user_id: _id, topic_id });

  if (errorCommentValidate || warningCommentValidate) {
    return NextResponse.json(
      { message: errorCommentValidate?.message ?? warningCommentValidate?.message },
      { status: 400 }
    );
  }

  await client
    .db('db')
    .collection<IComment>('comments')
    .insertOne(commentValidate as IComment);
  return NextResponse.json(null);
});
