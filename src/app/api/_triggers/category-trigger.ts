import { ICategory } from '@entities/Category';
import { ChangeStream, ChangeStreamDocument } from 'mongodb';
import { getClient } from '../db';
import { ITopic } from '@entities/Topic';

type TChangeHandle = (change: ChangeStreamDocument<ICategory>) => void;

let changeStream: ChangeStream<ICategory, ChangeStreamDocument<ICategory>> | null = null;

export const categoryTrigger = async () => {
  const client = getClient();
  await client.connect();

  const db = client.db('db');
  const topicsCollection = db.collection<ITopic>('topics');
  const categoriesCollection = db.collection<ICategory>('categories');

  const _changeStream = categoriesCollection.watch([], {
    fullDocumentBeforeChange: 'whenAvailable',
  });

  changeStream?.close();
  changeStream = _changeStream;

  const deleteAllTopicAfterDeleteCategory: TChangeHandle = async (change) => {
    if (change.operationType === 'delete') {
      const deletedCategory = change.fullDocumentBeforeChange;

      if (deletedCategory) {
        await topicsCollection.deleteMany({ category_id: deletedCategory._id });
      }
    }
  };

  const handleDelete: TChangeHandle = (change) => {
    deleteAllTopicAfterDeleteCategory(change);
  };

  changeStream.on('change', handleDelete);
};
