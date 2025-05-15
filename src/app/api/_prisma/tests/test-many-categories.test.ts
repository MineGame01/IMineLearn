import { randomUUID } from 'crypto';
import { getPrisma } from '../get-prisma';

describe('Testing automatic operations categories', () => {
  const categories_ids_set = new Set<string>();
  const categories_name: string[] = ['Test1', 'Test2'];

  const formatSetToArray = <value = unknown>(set: Set<value>) => {
    return set.keys().toArray();
  };

  const prisma = getPrisma();

  test('Create many categories', async () => {
    expect.assertions(4);
    try {
      await prisma.$connect();

      const count_created_categories = (
        await prisma.categories.createMany({
          data: categories_name.map((name) => {
            return {
              name,
            };
          }),
        })
      ).count;

      const created_categories_ids = (
        await prisma.categories.findMany({
          where: { AND: categories_name.map((name) => ({ name })) },
          select: { id: true },
        })
      ).map((category) => category.id);

      created_categories_ids.forEach((id) => {
        categories_ids_set.add(id);
      });

      expect(created_categories_ids.length).toBe(count_created_categories);
    } finally {
      await prisma.$disconnect();
    }
  });
  test('Creating topics for current categories', async () => {
    expect.assertions(4);
    try {
      await prisma.$connect();

      const categories_ids_array = formatSetToArray(categories_ids_set);

      const count_created_topics = (
        await prisma.topics.createMany({
          data: categories_ids_array.map((id, index) => {
            return {
              user_id: randomUUID(),
              category_id: id,
              title: `Topic${String(index)}`,
              content: `Content${String(index)}`,
            };
          }),
        })
      ).count;

      const count_find_topics = (
        await prisma.topics.findMany({
          where: { AND: categories_ids_array.map((id) => ({ category_id: id })) },
        })
      ).length;

      expect(count_find_topics).toBe(count_created_topics);
    } finally {
      await prisma.$disconnect();
    }
  });
  test('Deleting created categories, and then check if they delete their themes', async () => {
    expect.assertions(4);
    try {
      await prisma.$connect();

      const categories_ids_array = formatSetToArray(categories_ids_set);

      await prisma.categories.deleteMany({
        where: { AND: categories_ids_array.map((id) => ({ id })) },
      });

      const count_find_topics = (
        await prisma.topics.findMany({
          where: { AND: categories_ids_array.map((id) => ({ category_id: id })) },
        })
      ).length;

      expect(count_find_topics).toBe(0);
    } finally {
      await prisma.$disconnect();
    }
  });
});
