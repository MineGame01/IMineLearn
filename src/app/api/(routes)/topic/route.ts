import { client } from '@app/api/db';
import { IComment, ITopic, TopicSchema, TTopicId } from '@entities/Topic';
import { NextRequest, NextResponse } from 'next/server';
import { checkAuthAccessToken } from '@app/api/check-auth-access-token';
import { ICategory } from '@entities/Category';

interface IRequestQuery {
  topic_id: TTopicId | null;
}

export const GET = async (request: NextRequest) => {
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
};

interface IDataRequest extends Pick<ITopic, 'category_id' | 'content' | 'title'> {}

export const POST = await checkAuthAccessToken(async (request) => {
  const body = await request.json();
  const authUser = request.auth;

  if (!authUser) {
    return;
  }

  const { category_id, content, title } = body as IDataRequest;

  const { _id } = authUser;

  const categoriesCollection = client.db('db').collection<ICategory>('categories');
  try {
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

    const insertedTopic = await topicsCollection.insertOne(newTopic as ITopic);

    const idNewTopic = insertedTopic.insertedId;

    const categoryTopicsLength = (
      await topicsCollection.find({ category_id: category._id }).toArray()
    ).length;
    await categoriesCollection.updateOne({ _id: category._id }, [
      {
        $set: {
          topicsCount: categoryTopicsLength,
          lastTopicId: idNewTopic,
          lastActivity: new Date().getTime(),
        },
      },
    ]);

    return NextResponse.json<TTopicId>(idNewTopic);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      throw error;
    }
  }
});

interface IDataRequest {
  topic_id: TTopicId | null;
}

export const DELETE = await checkAuthAccessToken(async (request: NextRequest) => {
  const data = await request.json();
  const authUser = request.auth;

  if (!authUser) {
    return;
  }

  const { topic_id } = data as IDataRequest;
  const { is_admin } = authUser;

  if (!is_admin) {
    return NextResponse.json({ message: 'You have no right of administration!' }, { status: 401 });
  }

  if (!topic_id) {
    return NextResponse.json({ message: 'topic_id param is required!' }, { status: 400 });
  }

  const db = client.db('db');
  const topicsCollection = db.collection<ITopic>('topics');
  const categoriesCollection = db.collection<ICategory>('categories');
  const commentsCollection = db.collection<IComment>('comments');

  const topic = await topicsCollection.findOne({ _id: topic_id });

  if (!topic) {
    return NextResponse.json({ message: 'Topic not found!' }, { status: 404 });
  }

  await topicsCollection.deleteOne({ _id: topic_id });
  await commentsCollection.deleteMany({ topic_id });
  const topicsCount = (await topicsCollection.find({ category_id: topic.category_id }).toArray())
    .length;
  await categoriesCollection.updateOne({ _id: topic.category_id }, { $set: { topicsCount } });

  return NextResponse.json(null);
});
