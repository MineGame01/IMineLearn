import { getClient } from '@app/api/db';
import { ITopic, TopicSchema, TTopicId } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { ICategory } from '@entities/Category';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';

interface IRequestQuery {
  topic_id: TTopicId | null;
}

const handlerGet = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const searchParams = request.nextUrl.searchParams;

    const queryParams: IRequestQuery = {
      topic_id: searchParams.get('topic_id'),
    };

    const { topic_id } = queryParams;

    if (!topic_id || topic_id.length < 24) {
      return NextResponse.json({ message: 'Topic id not found!' }, { status: 400 });
    }

    const topicsCollection = client.db('db').collection<ITopic>('topics');

    const topic = await topicsCollection.findOne({ _id: topic_id });

    if (!topic) {
      return NextResponse.json({ message: 'Topic not found!' }, { status: 404 });
    }

    return NextResponse.json<ITopic>(topic);
  } finally {
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handlerGet);

interface IDataRequest extends Pick<ITopic, 'category_id' | 'content' | 'title'> {}

const handlerPost = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const body = await request.json();
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { category_id, content, title } = body as IDataRequest;

    const { _id } = authUser;

    const categoriesCollection = client.db('db').collection<ICategory>('categories');
    const category = await categoriesCollection.findOne({ _id: category_id });

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found! Please checked category_id' },
        { status: 404 }
      );
    }

    const {
      value: newTopic,
      error,
      warning,
    } = TopicSchema.validate({ category_id, title, content, user_id: _id });

    if (error || warning) {
      return NextResponse.json({ message: error?.message ?? warning?.message }, { status: 400 });
    }

    const topicsCollection = client.db('db').collection<ITopic>('topics');

    const insertedTopic = await topicsCollection.insertOne(newTopic);

    const idNewTopic = insertedTopic.insertedId;

    return NextResponse.json<TTopicId>(idNewTopic);
  } finally {
    await client.close();
  }
};

export const POST = await errorCatchingApiHandlerDecorator(await checkAuthAccessToken(handlerPost));

interface IDataRequest {
  topic_id: TTopicId | null;
}

const handlerDelete = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const data = await request.json();
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { topic_id } = data as IDataRequest;
    const { is_admin } = authUser;

    if (!is_admin) {
      return NextResponse.json(
        { message: 'You have no right of administration!' },
        { status: 401 }
      );
    }

    if (!topic_id) {
      return NextResponse.json({ message: 'topic_id param is required!' }, { status: 400 });
    }

    const db = client.db('db');
    const topicsCollection = db.collection<ITopic>('topics');

    const topic = await topicsCollection.findOne({ _id: topic_id });

    if (!topic) {
      return NextResponse.json({ message: 'Topic not found!' }, { status: 404 });
    }

    await topicsCollection.deleteOne({ _id: topic_id });

    return NextResponse.json(null);
  } finally {
    await client.close();
  }
};

export const DELETE = await errorCatchingApiHandlerDecorator(
  await checkAuthAccessToken(handlerDelete)
);
