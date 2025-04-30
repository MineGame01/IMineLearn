import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getClient } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { IComment, TCommentId } from '@entities/Topic';
import { IServerErrorResponse } from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';

interface IQueryParams {
  comment_id?: TCommentId;
}

const handlerGet = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();

    const comment_id = request.nextUrl.searchParams.get('comment_id') as IQueryParams['comment_id'];

    if (!comment_id) {
      return NextResponse.json<IServerErrorResponse>(
        { message: "Query param 'comment_id' is required!" },
        { status: 400 }
      );
    }

    const comment = await client
      .db('db')
      .collection<IComment>('comments')
      .findOne({ _id: comment_id });

    if (!comment) {
      return NextResponse.json<IServerErrorResponse>(
        { message: 'Comment not found!' },
        { status: 404 }
      );
    }

    return NextResponse.json<IComment>(comment);
  } finally {
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handlerGet);

interface IDataRequest {
  comment_id?: TCommentId;
}

const handlerDelete = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { is_admin, _id: auth_user_id } = authUser;

    const body = (await request.json()) as IDataRequest;

    const { comment_id } = body;

    if (!comment_id) {
      return NextResponse.json<IServerErrorResponse>(
        { message: "Param 'comment_id' is required!" },
        { status: 400 }
      );
    }

    const commentsCollection = client.db('db').collection<IComment>('comments');

    const comment = await commentsCollection.findOne({ _id: comment_id });

    if (!comment) {
      return NextResponse.json<IServerErrorResponse>(
        { message: 'Comment not found!' },
        { status: 404 }
      );
    }

    if (comment.user_id === auth_user_id || is_admin) {
      await commentsCollection.deleteOne({ _id: comment_id });
    } else {
      return NextResponse.json<IServerErrorResponse>(
        { message: "You can't delete a comment that isn't yours." },
        { status: 400 }
      );
    }

    return NextResponse.json(null);
  } finally {
    await client.close();
  }
};

export const DELETE = await errorCatchingApiHandlerDecorator(
  await checkAuthAccessToken(handlerDelete)
);
