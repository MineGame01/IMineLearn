import { categoryTrigger } from './category-trigger';
import { topicTrigger } from './topic-trigger';

export const runTriggers = () => {
  topicTrigger();
  categoryTrigger();
};
