import { appApi } from '@app/api';
import { ICategoriesEndpointsApi } from './categories-endpoints-api.type';
import { getResponseError } from '@shared/model';

export const categoriesApi: ICategoriesEndpointsApi = {
  async getCategories(queryParams) {
    try {
      const response = await appApi.get('categories', {
        searchParams: { ...queryParams },
        next: { tags: ['categories-list'] },
      });
      return await response.json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading categories!',
        statusCode: 500,
        code: 'FAILED-LOADING-CATEGORIES',
      });
    }
  },
  async getCategoryById(category_id) {
    try {
      const response = await appApi.get('category', {
        searchParams: { category_id },
        next: { tags: [`category-${category_id}`] },
      });
      return await response.json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed loading category!',
        statusCode: 500,
        code: 'FAILED-LOADING-CATEGORY',
      });
    }
  },
  async createCategory(body) {
    try {
      const response = await appApi.post('category', { json: body });
      return await response.json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed create category!',
        statusCode: 500,
        code: 'FAILED-CREATE-CATEGORY',
      });
    }
  },
  async deleteCategory(body) {
    try {
      const response = await appApi.delete('category', { json: body });
      return await response.json();
    } catch (error: unknown) {
      throw getResponseError(error, {
        message: 'Failed delete category!',
        statusCode: 500,
        code: 'FAILED-CREATE-CATEGORY',
      });
    }
  },
};
