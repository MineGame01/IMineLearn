import { FC } from 'react';
import { TopicsList } from '@features/TopicList';
import { CategoryPhotoContainer } from '@features/categories-list';
import { getPrisma } from '@app/api/_prisma/get-prisma';
import { ICategory, TCategoryId } from '@entities/categories-list';
import { ModerationToolbar } from './ui/moderation-toolbar';
import { unstable_cache } from 'next/cache';
import { redirect } from 'next/navigation';

// eslint-disable-next-line react-refresh/only-export-components
export const generateStaticParams = async () => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const categoriesIds = (await prisma.categories.findMany({})).map((category) => ({
      categoryId: category.id,
    }));
    return categoriesIds;
  } finally {
    await prisma.$disconnect();
  }
};

interface IProps {
  params: Promise<{ categoryId: TCategoryId }>;
}

const CategoryPage: FC<IProps> = async ({ params }) => {
  const prisma = getPrisma();
  try {
    await prisma.$connect();
    const category_id = (await params).categoryId;

    const findFirstCategory = unstable_cache(
      async (category_id: TCategoryId) => {
        const prisma = getPrisma();
        try {
          await prisma.$connect();
          return await prisma.categories.findFirst({ where: { id: category_id } });
        } finally {
          await prisma.$disconnect();
        }
      },
      [category_id],
      {
        tags: [`category-${category_id}`],
        revalidate: 60,
      }
    );

    const category_find = await findFirstCategory(category_id);
    if (!category_find) redirect('/');

    const category: ICategory = {
      ...category_find,
      lastActivity: category_find.lastActivity
        ? new Date(category_find.lastActivity).getTime()
        : category_find.lastActivity,
    };

    const { id, name, image_base64_1200x } = category;

    const image_src = image_base64_1200x ? `data:image/png;base64,${image_base64_1200x}` : null;

    return (
      <main className="container mx-auto bg-surface p-2 grow-1">
        <CategoryPhotoContainer className="m-5" categoryName={name} src={image_src} />
        <ModerationToolbar category_id={id} />
        <TopicsList categoryId={id} />
      </main>
    );
  } finally {
    await prisma.$disconnect();
  }
};

export default CategoryPage;
