import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { client } from '@app/api/db';
import { FiltersDataResponse, IFilterQueryParams } from '@app/api/filters-data-response';
import { IReaction, ReactionSchema, TReactionType } from '@entities/Reaction';
import { ITopic, TTopicId } from '@entities/Topic';
import { FindOptions } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface IRequestQuery extends Pick<IFilterQueryParams, 'limit_count' | 'offset_count'> {
  topic_id: TTopicId | null;
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const { getFilterQueryParams } = new FiltersDataResponse();

  const queryParams: IRequestQuery = {
    topic_id: searchParams.get('topic_id'),
    ...getFilterQueryParams(searchParams),
  };

  const { topic_id, limit_count, offset_count } = queryParams;

  if (!topic_id) {
    return NextResponse.json({ message: 'Query param topic_id is required!' }, { status: 400 });
  }

  try {
    const db = client.db('db');

    const topic = await db.collection<ITopic>('topics').findOne({ _id: topic_id });

    if (!topic) {
      return NextResponse.json({ message: 'Topic not found!' }, { status: 404 });
    }

    const reactionCollection = db.collection<IReaction>('reactions');
    const defaultFindOptions: FindOptions = {
      limit: limit_count,
      skip: offset_count,
    };

    return NextResponse.json(
      await reactionCollection.find({ topic_id }, defaultFindOptions).toArray()
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message });
    } else {
      throw error;
    }
  }
};

interface IDataRequest {
  topic_id: TTopicId;
  type_reaction: TReactionType;
}

export const POST = await checkAuthAccessToken(async (request: NextRequest) => {
  const data = await request.json();
  const authUser = request.auth;

  if (!authUser) {
    return;
  }

  const { topic_id, type_reaction } = data as IDataRequest;
  const { _id: user_id } = authUser;

  const {
    error,
    warning,
    value: reaction,
  } = ReactionSchema.validate({ topic_id, type_reaction, user_id });

  if (error || warning) {
    return NextResponse.json({ message: error?.message ?? warning?.message }, { status: 400 });
  }

  try {
    const reactionCollection = client.db('db').collection<IReaction>('reactions');

    if (await reactionCollection.findOne({ topic_id, user_id, type_reaction })) {
      await reactionCollection.deleteOne({ topic_id, user_id, type_reaction });
      return NextResponse.json(null);
    }

    await reactionCollection.insertOne(reaction);
    return NextResponse.json(null);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      throw error;
    }
  }
});
