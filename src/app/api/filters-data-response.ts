import { FindOptions } from 'mongodb';

export interface IFilterQueryParams {
  created_after: string | null;
  created_before: string | null;
  return_ids_only: boolean;
  limit_count: string | null;
  offset_count: string | null;
}

interface IOptions extends NonNullable<Pick<IFilterQueryParams, 'limit_count' | 'offset_count'>> {}

export class FiltersDataResponse {
  options: IOptions;
  defaultFindOptions: FindOptions;

  constructor(options?: IOptions) {
    this.options = {
      limit_count: '10',
      offset_count: '0',
      ...options,
    };
    this.defaultFindOptions = {
      limit: +(this.options.limit_count as string),
      skip: +(this.options.offset_count as string),
    };
  }

  getFilterQueryParams(searchParams: URLSearchParams) {
    const queryParams: IFilterQueryParams = {
      created_after: null,
      created_before: null,
      return_ids_only: false,
      ...this.options,
    };

    Object.keys(queryParams).forEach((param) => {
      if (searchParams.get(param)) queryParams[param] = searchParams.get(param);
    });

    return queryParams;
  }
}
