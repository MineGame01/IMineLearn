import { getEnvVar } from '@shared/lib';
import { randomUUID } from 'crypto';
import { MongoClient } from 'mongodb';
import { runsTriggers } from './triggers';

export const getClient = () => {
  const client = new MongoClient(getEnvVar('MONGO_DB_URL'), {
    pkFactory: { createPk: () => randomUUID().toString() },
  });
  return client;
};

const connectToDatabase = async () => {
  const client = getClient();
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Ping is successful! Mongodb connected!');
  } catch (error) {
    console.error('Ping is failed! Mongodb not respond!', error);
  } finally {
    await client.close();
  }
};

connectToDatabase();
runsTriggers();
