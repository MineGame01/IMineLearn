import { PrismaClient } from '@prisma/client';
import { TPrismaClientExtends } from './prisma-client-extends.type';
import { TCategoryId } from '@entities/categories-list';
import { revalidateTag } from 'next/cache';

export const updateCategoryToLatestTopic = async (
  prisma: TPrismaClientExtends | PrismaClient,
  category_id: TCategoryId
) => {
  const topic_count = await prisma.topics.count({ where: { category_id } });
  const topics = await prisma.topics.findMany({
    where: { category_id },
    orderBy: { created_at: 'desc' },
  });

  const latest_topic = topics.length > 0 ? topics[0] : null;

  await prisma.categories.update({
    where: { id: category_id },
    data: {
      lastTopicId: latest_topic?.id ?? null,
      lastActivity: latest_topic?.created_at ?? null,
      topicsCount: topic_count,
    },
  });
  revalidateTag(`refetch-categoryid-${category_id}`);
};
