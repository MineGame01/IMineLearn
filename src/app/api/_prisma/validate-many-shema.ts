import Joi from 'joi';

export const validateManySchema = async <ArrayItem = unknown>(
  data: ArrayItem | ArrayItem[],
  schema: Joi.ObjectSchema
) => {
  let result: ArrayItem[] | ArrayItem | null = null;
  if (Array.isArray(data)) {
    result = [];
    for (let length = 1; length <= data.length; length++) {
      result.push((await schema.validateAsync(data[length - 1])) as ArrayItem);
    }
  } else {
    result = (await schema.validateAsync(data)) as ArrayItem;
  }
  return result;
};
