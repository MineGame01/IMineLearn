import { TPrismaClientExtends } from './prisma-client-extends.type';

export const updateAllCategoriesToLatestTopic = async (prisma: TPrismaClientExtends) => {
  const categories = await prisma.categories.findMany({});
  for (const category of categories) {
    const { id } = category;
    const topic_count = await prisma.topics.count({ where: { category_id: id } });
    const topics = await prisma.topics.findMany({
      where: { category_id: id },
      orderBy: { created_at: 'desc' },
    });

    const latest_topic = topics.length > 0 ? topics[0] : null;

    await prisma.categories.update({
      where: { id },
      data: {
        topicsCount: topic_count,
        lastActivity: latest_topic?.created_at ?? null,
        lastTopicId: latest_topic?.id ?? null,
      },
    });
  }
};
