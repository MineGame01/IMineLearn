import { IEndpointInfo } from '@shared/api';
import { ICategory, TCategoryId } from '../model/category';

export type TGetCategoriesEndpointInfo = IEndpointInfo<
  {
    limit_count?: number;
    offset_count?: number;
    return_ids_only?: boolean;
  },
  ICategory[] | string[]
>;

export type TGetCategoryByIdEndpointInfo = IEndpointInfo<TCategoryId, ICategory>;

export type TCreateCategoryEndpointInfo = IEndpointInfo<
  { image_base64: string | null } & Pick<ICategory, 'name'>,
  null
>;

export type TDeleteCategoryEndpointInfo = IEndpointInfo<
  {
    category_id: TCategoryId;
  },
  null
>;

export interface ICategoriesEndpointsApi {
  getCategories: TGetCategoriesEndpointInfo['endpoint'];
  getCategoryById: TGetCategoryByIdEndpointInfo['endpoint'];
  createCategory: TCreateCategoryEndpointInfo['endpoint'];
  deleteCategory: TDeleteCategoryEndpointInfo['endpoint'];
}
