import {
  CategorySchema,
  ICategory,
  MAX_CATEGORY_NAME_LENGTH,
} from './../../../../entities/Category/index';
import { validateManySchema } from '../validate-many-shema';
import Joi from 'joi';

const wrong_categories: Pick<ICategory, 'name'>[] = Array(2).fill({ name: 'true' }) as Pick<
  ICategory,
  'name'
>[];
wrong_categories.push({ name: 'sddddddddddddddddddddddddddddddddddddddddddddddddddddddddd' });

describe('Validation Many Schema Categories', () => {
  test(`Maximum name length ${String(MAX_CATEGORY_NAME_LENGTH)}`, () => {
    expect.assertions(1);
    validateManySchema(
      wrong_categories,
      Joi.object({ name: CategorySchema.extract('name') })
    ).catch((error: unknown) => {
      if (error instanceof Joi.ValidationError) {
        expect(error.message).toMatch(
          `"name" length must be less than or equal to ${String(MAX_CATEGORY_NAME_LENGTH)} characters long`
        );
      }
    });
  });
});
