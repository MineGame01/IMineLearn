import { TPrismaClientExtends } from './prisma-client-extends.type';
import { updateCategoryToLatestTopic } from './update-category-to-latest-topic';

export const updateAllCategoriesToLatestTopic = async (prisma: TPrismaClientExtends) => {
  const categories = await prisma.categories.findMany({});
  for (const category of categories) {
    const { id } = category;
    await updateCategoryToLatestTopic(prisma, id);
  }
};
