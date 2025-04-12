import { getEnvVar } from '@shared/lib';
import { randomUUID } from 'crypto';
import { MongoClient } from 'mongodb';

export const client = new MongoClient(getEnvVar('MONGO_DB_URL'), {
  pkFactory: { createPk: () => randomUUID().toString() },
});

const connectToDatabase = async () => {
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

await connectToDatabase();
