import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { IComment, TCommentId } from '@entities/Topic';
import { IServerErrorResponse, ResponseParamIsRequiredError } from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();

    const comment_id = request.nextUrl.searchParams.get('comment_id');

    if (!comment_id) {
      throw new ResponseParamIsRequiredError(true, 'comment_id');
    }

    const comment = (await prisma.comments.findFirst({ where: { id: comment_id } })) as IComment;

    return NextResponse.json<IComment>(comment);
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);

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
      throw new ResponseParamIsRequiredError(false, 'comment_id');
    }

    const comment = (await prisma.comments.findFirst({ where: { id: comment_id } })) as IComment;

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

export const DELETE = withErrorHandlerRequest(checkAuthAccessToken(handlerDelete));
