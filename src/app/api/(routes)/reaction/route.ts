import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/_model/filters-data-response';
import { TTopicId } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { TReactionType } from '@entities/Reaction';

interface IRequestQuery extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count'> {
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

    const { topic_id, limit_count, offset_count } = queryParams;

    if (!topic_id) {
      return NextResponse.json({ message: 'Query param topic_id is required!' }, { status: 400 });
    }

    const topic = await prisma.topics.findFirst({ where: { id: topic_id } });

    if (!topic) {
      return NextResponse.json({ message: 'Topic not found!' }, { status: 404 });
    }

    const find_options = {
      take: limit_count,
      skip: offset_count,
    };

    return NextResponse.json(
      await prisma.reactions.findMany({ where: { topic_id }, ...find_options })
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handlerGet);

interface IDataRequestPost {
  topic_id: TTopicId | null;
  type_reaction: TReactionType | null;
}

const handlerPost = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const data = (await request.json()) as IDataRequestPost;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { topic_id, type_reaction } = data;
    const { id: user_id } = authUser;

    if (!topic_id || !type_reaction) {
      return NextResponse.json(
        { message: `Param '${!topic_id ? 'topic_id' : 'type_reaction'}' is required!` },
        { status: 400 }
      );
    }

    if (type_reaction !== 'like') {
      return NextResponse.json({ message: "Accessible reaction 'like'" });
    }

    const reaction = await prisma.reactions.findFirst({
      where: { topic_id, type_reaction, user_id },
    });

    if (!reaction) {
      await prisma.reactions.create({ data: { topic_id, type_reaction, user_id } });
    } else {
      await prisma.reactions.delete({ where: { id: reaction.id } });
    }

    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(checkAuthAccessToken(handlerPost));
