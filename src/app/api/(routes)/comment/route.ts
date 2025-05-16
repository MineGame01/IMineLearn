import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { IComment, TCommentId } from '@entities/Topic';
import { IServerErrorResponse } from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';

interface IQueryParams {
  comment_id: TCommentId | undefined;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();

    const comment_id = request.nextUrl.searchParams.get('comment_id') as IQueryParams['comment_id'];

    if (!comment_id) {
      return NextResponse.json<IServerErrorResponse>(
        { message: "Query param 'comment_id' is required!" },
        { status: 400 }
      );
    }

    const comment = await prisma.comments.findFirst({ where: { id: comment_id } });

    if (!comment) {
      return NextResponse.json<IServerErrorResponse>(
        { message: 'Comment not found!' },
        { status: 404 }
      );
    }

    return NextResponse.json<IComment>(comment);
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = errorCatchingApiHandlerDecorator(handlerGet);

interface IDataRequest {
  comment_id: TCommentId | null;
}

const handlerDelete = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { is_admin, id: auth_user_id } = authUser;

    const body = (await request.json()) as IDataRequest;

    const { comment_id } = body;

    if (!comment_id) {
      return NextResponse.json<IServerErrorResponse>(
        { message: "Param 'comment_id' is required!" },
        { status: 400 }
      );
    }

    const comment = await prisma.comments.findFirst({ where: { id: comment_id } });

    if (!comment) {
      return NextResponse.json<IServerErrorResponse>(
        { message: 'Comment not found!' },
        { status: 404 }
      );
    }

    if (comment.user_id === auth_user_id || is_admin) {
      await prisma.comments.delete({ where: { id: comment_id } });
    } else {
      return NextResponse.json<IServerErrorResponse>(
        { message: "You can't delete a comment that isn't yours." },
        { status: 403 }
      );
    }

    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = errorCatchingApiHandlerDecorator(checkAuthAccessToken(handlerDelete));
