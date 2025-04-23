import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getClient } from '@app/api/db';
import { errorCatchingApiHandlerDecorator } from '@app/api/error-catching-api-handler-decorator';
import { CategorySchema, ICategory, TCategoryId, TCategoryImageBase64 } from '@entities/Category';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

interface IRequestQuery {
  category_id: ICategory['_id'] | null;
}

const handlerGet = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const queryParams: IRequestQuery = {
      category_id: request.nextUrl.searchParams.get('category_id'),
    };

    const { category_id } = queryParams;

    if (!category_id) {
      return NextResponse.json(
        { message: 'Query param category_id is required!' },
        { status: 400 }
      );
    }

    const category = await client
      .db('db')
      .collection<ICategory>('categories')
      .findOne({ _id: category_id });

    if (!category) {
      return NextResponse.json({ message: 'Category not found!' }, { status: 404 });
    }

    return NextResponse.json<ICategory>(category);
  } finally {
    await client.close();
  }
};

export const GET = await errorCatchingApiHandlerDecorator(handlerGet);

interface IDataRequest extends Pick<ICategory, 'name'> {
  image_base64: TCategoryImageBase64;
}

const handlePost = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const data = (await request.json()) as IDataRequest;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { is_admin } = authUser;

    if (!is_admin) {
      return NextResponse.json(
        { message: 'You have no right of administration!' },
        { status: 401 }
      );
    }

    const { image_base64, name } = data;

    const defaultImageJpegOptions: sharp.JpegOptions = {
      quality: 75,
    };

    let optimizedImage1200xBase64: string | null = null;
    let optimizedImage415xBase64: string | null = null;

    if (image_base64) {
      const image = image_base64 ? Buffer.from(image_base64, 'base64') : undefined;
      optimizedImage1200xBase64 = await sharp(image)
        .jpeg(defaultImageJpegOptions)
        .toBuffer()
        .then((buffer) => buffer.toString('base64'));

      optimizedImage415xBase64 = await sharp(image)
        .jpeg(defaultImageJpegOptions)
        .toBuffer()
        .then((buffer) => buffer.toString('base64'));
    }

    const {
      value: category,
      error,
      warning,
    } = CategorySchema.validate({
      name,
      image_base64_1200x: optimizedImage1200xBase64,
      image_base64_415x: optimizedImage415xBase64,
    });

    if (error || warning) {
      return NextResponse.json({ message: error?.message ?? warning?.message }, { status: 400 });
    }

    await client.db('db').collection<ICategory>('categories').insertOne(category);

    return NextResponse.json(null);
  } finally {
    await client.close();
  }
};

export const POST = await errorCatchingApiHandlerDecorator(await checkAuthAccessToken(handlePost));

interface IDataRequest {
  category_id: TCategoryId | null;
}

const handleDelete = async (request: NextRequest) => {
  const client = getClient();
  try {
    await client.connect();
    const data = await request.json();
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { is_admin } = authUser;

    if (!is_admin) {
      return NextResponse.json(
        { message: 'You have no right of administration!' },
        { status: 401 }
      );
    }

    const { category_id } = data as IDataRequest;

    const categoriesCollection = client.db('db').collection<ICategory>('categories');
    const deletedCategory = await categoriesCollection.findOneAndDelete({
      _id: category_id ?? ' ',
    });

    if (!deletedCategory) {
      return NextResponse.json({ message: 'Category not found! ' }, { status: 404 });
    }

    return NextResponse.json(null);
  } finally {
    await client.close();
  }
};

export const DELETE = await errorCatchingApiHandlerDecorator(
  await checkAuthAccessToken(handleDelete)
);
