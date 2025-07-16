import { ITopic, TTopicId } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import {
  convertDatesToTimestamps,
  IServerErrorResponse,
  responseErrors,
  ResponseParamIsRequiredError,
} from '@shared/model';

interface IRequestQuery {
  topic_id: TTopicId | null;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    const queryParams: IRequestQuery = {
      topic_id: searchParams.get('topic_id'),
    };

    const { topic_id } = queryParams;

    if (!topic_id) throw new ResponseParamIsRequiredError(true, 'topic_id');

    const topic = await prisma.topics.findFirst({ where: { id: topic_id } });
    if (!topic) throw new responseErrors.ResponseTopicNotFoundError();

    return NextResponse.json<ITopic>(convertDatesToTimestamps([topic])[0]);
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);

type IDataRequestPost = Pick<ITopic, 'category_id' | 'content' | 'title'>;

const handlerPost = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const body = (await request.json()) as IDataRequestPost;
    const authUser = request.auth;

    if (!authUser) return;

    const { category_id, content, title } = body;

    const { id } = authUser;

    const category = await prisma.categories.findFirst({ where: { id: category_id } });
    if (!category) throw new responseErrors.ResponseCategoryNotFoundError();

    const insertedTopic = await prisma.topics.create({
      data: { user_id: id, category_id, content, title },
    });

    return NextResponse.json<TTopicId>(insertedTopic.id);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(checkAuthAccessToken(handlerPost));

interface IDataRequestDelete {
  topic_id: TTopicId | null;
}

const handlerDelete = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const data = (await request.json()) as IDataRequestDelete;
    const authUser = request.auth;

    if (!authUser) return;

    const { topic_id } = data;
    const { is_admin, id: auth_user_id } = authUser;

    if (!topic_id) throw new ResponseParamIsRequiredError(false, 'topic_id');

    const topic = await prisma.topics.findFirst({ where: { id: topic_id } });
    if (!topic) throw new responseErrors.ResponseTopicNotFoundError();

    if (topic.user_id === auth_user_id || is_admin) {
      await prisma.topics.delete({ where: { id: topic_id, category_id: topic.category_id } });
    } else {
      return NextResponse.json<IServerErrorResponse>(
        { message: "You can't delete a topic that isn't yours." },
        { status: 403 }
      );
    }

    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = withErrorHandlerRequest(checkAuthAccessToken(handlerDelete));
