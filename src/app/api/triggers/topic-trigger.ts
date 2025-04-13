import { ITopic } from '@entities/Topic';
import { getClient } from '../db';
import { ChangeStream, ChangeStreamDocument } from 'mongodb';
import { ICategory, TCategoryId } from '@entities/Category';
import { IReaction } from '@entities/Reaction';
import { IReport } from '@entities/Report';

type TChangeHandle = (change: ChangeStreamDocument<ITopic>) => void;

let changeStream: ChangeStream<ITopic, ChangeStreamDocument<ITopic>> | null = null;

export const topicTrigger = async () => {
  const client = getClient();
  await client.connect();

  const db = client.db('db');
  const topicsCollection = db.collection<ITopic>('topics');
  const categoriesCollection = db.collection<ICategory>('categories');
  const reactionCollection = db.collection<IReaction>('reactions');
  const commentsCollection = db.collection<IReaction>('comments');
  const reportsCollection = db.collection<IReport>('reports');

  const _changeStream = topicsCollection.watch([], { fullDocumentBeforeChange: 'whenAvailable' });

  changeStream?.close();
  changeStream = _changeStream;

  const updateCategoryAfterInsertTopic: TChangeHandle = async (change) => {
    if (change.operationType === 'insert') {
      const insertTopic = change.fullDocument;
      const topicsLength = (await topicsCollection.find().toArray()).length;

      await categoriesCollection.updateOne(
        { _id: insertTopic.category_id },
        {
          $set: {
            lastTopicId: insertTopic._id,
            lastActivity: insertTopic.created_at,
            topicsCount: topicsLength,
          },
        }
      );
    }
  };

  const updateCategoryAfterDeleteTopic: TChangeHandle = async (change) => {
    if (change.operationType === 'delete') {
      const deletedTopic = change.fullDocumentBeforeChange;

      const updateCategory = async (_id: TCategoryId) => {
        const lastTopic = await topicsCollection.findOne({
          category_id: _id,
          created_at: { $lt: new Date().getTime() },
        });
        const topicsLength = (await topicsCollection.find({ category_id: _id }).toArray()).length;

        await categoriesCollection.updateOne(
          { _id },
          {
            $set: {
              lastTopicId: lastTopic ? lastTopic._id : null,
              lastActivity: lastTopic ? lastTopic.created_at : null,
              topicsCount: topicsLength,
            },
          }
        );
      };

      if (deletedTopic) {
        const { category_id } = deletedTopic;

        await updateCategory(category_id);
      } else {
        const categories = await categoriesCollection.find({}).toArray();
        categories.forEach(async (category) => {
          await updateCategory(category._id);
        });
      }
    }
  };

  const deleteCommentsTopicsAfterDeleteTopic: TChangeHandle = async (change) => {
    if (change.operationType === 'delete') {
      const deletedTopic = change.fullDocumentBeforeChange;

      if (deletedTopic) {
        await commentsCollection.deleteMany({ topic_id: deletedTopic._id });
      }
    }
  };

  const deleteReactionsTopicsAfterDeleteTopic: TChangeHandle = async (change) => {
    if (change.operationType === 'delete') {
      const deletedTopic = change.fullDocumentBeforeChange;

      if (deletedTopic) {
        await reactionCollection.deleteMany({ topic_id: deletedTopic._id });
      }
    }
  };

  const deleteReportsTopicsAfterDeleteTopic: TChangeHandle = async (change) => {
    if (change.operationType === 'delete') {
      const deletedTopic = change.fullDocumentBeforeChange;

      if (deletedTopic) {
        await reportsCollection.deleteMany({ target_id: deletedTopic._id });
      }
    }
  };

  const handleInsert: TChangeHandle = (change) => {
    updateCategoryAfterInsertTopic(change);
  };

  const handleDelete: TChangeHandle = (change) => {
    updateCategoryAfterDeleteTopic(change);
    deleteReactionsTopicsAfterDeleteTopic(change);
    deleteCommentsTopicsAfterDeleteTopic(change);
    deleteReportsTopicsAfterDeleteTopic(change);
  };

  changeStream.on('change', (change) => {
    switch (change.operationType) {
      case 'insert': {
        handleInsert(change);
        return;
      }
      case 'delete': {
        handleDelete(change);
        return;
      }
    }
  });
};
