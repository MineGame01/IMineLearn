import { checkAuthAccessToken } from '@app/api/_lib/check-auth-access-token';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { withErrorHandlerRequest } from '@app/api/with-error-handler-request';
import { ICategory, TCategoryId, TCategoryImageBase64 } from '@entities/categories-list';
import { responseErrors, ResponseParamIsRequiredError } from '@shared/model';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

interface IRequestQuery {
  category_id: TCategoryId | null;
}

const handleGet = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const queryParams: IRequestQuery = {
      category_id: request.nextUrl.searchParams.get('category_id'),
    };

    const { category_id } = queryParams;

    if (!category_id) {
      throw new ResponseParamIsRequiredError(true, 'category_id');
    }

    const category = await prisma.categories.findFirst({
      where: { id: category_id },
    });
    if (!category) throw new responseErrors.ResponseCategoryNotFoundError();

    return NextResponse.json<ICategory>({
      ...category,
      lastActivity: category.lastActivity
        ? new Date(category.lastActivity).getTime()
        : category.lastActivity,
    });
  } finally {
    await prisma.$disconnect();
  }
};

export const GET = withErrorHandlerRequest(handleGet);

interface IDataRequest extends Pick<ICategory, 'name'> {
  image_base64: TCategoryImageBase64;
}

const handlePost = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const data = (await request.json()) as IDataRequest;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { image_base64: query_image_base64, name: query_name } = data;

    const defaultImageJpegOptions: sharp.JpegOptions = {
      quality: 75,
    };

    let optimizedImage1200xBase64: string | null = null;
    let optimizedImage415xBase64: string | null = null;

    type TSharpParameters = Parameters<typeof sharp>;

    const optimezeImageToBase64 = async (
      image: TSharpParameters[0],
      jpegOptions?: sharp.JpegOptions,
      options?: TSharpParameters[1]
    ) => {
      return await sharp(image, options)
        .jpeg(jpegOptions)
        .toBuffer()
        .then((buffer) => buffer.toString('base64'));
    };

    if (query_image_base64) {
      const image = query_image_base64 ? Buffer.from(query_image_base64, 'base64') : undefined;

      optimizedImage1200xBase64 = await optimezeImageToBase64(image, defaultImageJpegOptions);
      optimizedImage415xBase64 = await optimezeImageToBase64(image, defaultImageJpegOptions);
    }

    await prisma.categories.create({
      data: {
        name: query_name,
        image_base64_1200x: optimizedImage1200xBase64,
        image_base64_415x: optimizedImage415xBase64,
      },
    });

    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = withErrorHandlerRequest(checkAuthAccessToken(handlePost, true));

interface IDataRequest {
  category_id: TCategoryId | null;
}

const handleDelete = async (request: NextRequest) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const data = (await request.json()) as IDataRequest;
    const authUser = request.auth;

    if (!authUser) {
      return;
    }

    const { category_id } = data;

    if (!category_id) {
      throw new ResponseParamIsRequiredError(false, 'category_id');
    }

    const category = await prisma.categories.findFirst({ where: { id: category_id } });
    if (!category) throw new responseErrors.ResponseCategoryNotFoundError();

    await prisma.categories.delete({ where: { id: category_id } });

    return NextResponse.json(null);
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = withErrorHandlerRequest(checkAuthAccessToken(handleDelete, true));
