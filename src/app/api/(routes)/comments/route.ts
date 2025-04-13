import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { getClient } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { CommentSchema, IComment, TTopicId } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery
  extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count' | 'return_ids_only'> {
  topic_id: TTopicId | null;
}

const handlerGet = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const searchParams = request.nextUrl.searchParams;

    const { getFilterQueryParams } = new FiltersDataResponse();

    const queryParams: IRequestQuery = {
      topic_id: searchParams.get('topic_id'),
      ...getFilterQueryParams(searchParams),
    };

    const { topic_id, return_ids_only, limit_count, offset_count } = queryParams;

    if (!topic_id || topic_id.length < 24) {
      return NextResponse.json({ message: 'Query param topic_id is required!' }, { status: 400 });
    }

    const commentsCollection = client.db('db').collection<IComment>('comments');

    const commentsFind = commentsCollection.find(
      { topic_id },
      {
        limit: limit_count,
        skip: offset_count,
      }
    );

    if (return_ids_only) {
      return NextResponse.json<string[]>(
        await commentsFind.map((comment) => comment._id).toArray()
      );
    }

    return NextResponse.json<IComment[]>(await commentsFind.toArray());
  } finally {
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handlerGet);

interface IDataRequest {
  topic_id: TTopicId | null;
  content: IComment['content'] | null;
}

const handlerPost = await checkAuthAccessToken(async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
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

    await client.db('db').collection<IComment>('comments').insertOne(commentValidate);
    return NextResponse.json(null);
  } finally {
    await client.close();
  }
});

export const POST = await errorCatchingApiHandlerDecorator(handlerPost);
