import { getEnvVar } from '@shared/lib';
import { randomUUID } from 'crypto';
import { MongoClient } from 'mongodb';

export const client = new MongoClient(getEnvVar('MONGO_DB_URL'), {
  pkFactory: { createPk: () => randomUUID().toString() },
});

client
  .db('admin')
  .command({ ping: 1 })
  .then(() => {
    console.log('Ping is successful! Mongodb connected!');
  })
  .catch((error) => {
    console.error('Ping is failed! Mongodb not respond!', error);
  });
