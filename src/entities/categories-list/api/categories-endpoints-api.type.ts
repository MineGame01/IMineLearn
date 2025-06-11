import { IEndpointInfo } from '@shared/api';
import { ICategory, TCategoryId } from '../model/category';

export type TGetCategoriesEndpointData = IEndpointInfo<
  {
    limit_count?: number;
    offset_count?: number;
    return_ids_only?: boolean;
  },
  ICategory[] | string[]
>;

export type TGetCategoryByIdEndpointData = IEndpointInfo<TCategoryId, ICategory>;

export type TCreateCategoryEndpointData = IEndpointInfo<
  { image_base64: string | null } & Pick<ICategory, 'name'>,
  null
>;

export type TDeleteCategoryEndpointData = IEndpointInfo<
  {
    category_id: TCategoryId;
  },
  null
>;

export interface ICategoriesEndpointsApi {
  getCategories: TGetCategoriesEndpointData['endpoint'];
  getCategoryById: TGetCategoryByIdEndpointData['endpoint'];
  createCategory: TCreateCategoryEndpointData['endpoint'];
  deleteCategory: TDeleteCategoryEndpointData['endpoint'];
}
