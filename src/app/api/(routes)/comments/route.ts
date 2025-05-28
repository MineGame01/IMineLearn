import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/_model/filters-data-response';
import { IComment, TTopicId } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { ResponseParamIsRequiredError } from '@shared/model';

interface IRequestQuery
  extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count' | 'return_ids_only'> {
  topic_id: TTopicId | null;
}

const handlerGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const searchParams = request.nextUrl.searchParams;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { getFilterQueryParams } = new FiltersDataResponse();

    const queryParams: IRequestQuery = {
      topic_id: searchParams.get('topic_id'),
      ...getFilterQueryParams(searchParams),
    };

    const { topic_id, return_ids_only, limit_count, offset_count } = queryParams;

    if (!topic_id) {
      throw new ResponseParamIsRequiredError(true, 'topic_id');
    }

    await prisma.topics.findFirst({ where: { id: topic_id } });

    const find_options = {
      where: { topic_id },
      take: limit_count,
      skip: offset_count,
    };

    if (return_ids_only) {
      return NextResponse.json<string[]>(
        (await prisma.comments.findMany(find_options)).map((comment) => comment.id)
      );
    }

    return NextResponse.json<IComment[]>(await prisma.comments.findMany(find_options));
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);

interface IDataRequest {
  topic_id: TTopicId;
  content: IComment['content'];
}

const handlerPost = checkAuthAccessToken(async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const body = (await request.json()) as IDataRequest;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { topic_id, content } = body;
    const { id: auth_user_id } = authUser;

    await prisma.comments.create({ data: { topic_id, content, user_id: auth_user_id } });
    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
});

export const POST = withErrorHandlerRequest(handlerPost);
