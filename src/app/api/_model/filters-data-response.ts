export interface IFilterQueryParams {
  created_after: string | null;
  created_before: string | null;
  return_ids_only: boolean | null;
  limit_count: number;
  offset_count: number;
}

type TOptions = Pick<IFilterQueryParams, 'limit_count' | 'offset_count'>;

export class FiltersDataResponse {
  defaultOptions: TOptions;
  getFilterQueryParams: (searchParams: URLSearchParams) => IFilterQueryParams;

  constructor(defaultOptions?: TOptions) {
    this.defaultOptions = {
      limit_count: 10,
      offset_count: 0,
      ...defaultOptions,
    };

    this.getFilterQueryParams = (searchParams: URLSearchParams) => {
      const res: IFilterQueryParams = {
        created_after: null,
        created_before: null,
        return_ids_only: null,
        ...this.defaultOptions,
      };

      Object.keys(res).forEach((param) => {
        const paramValue = searchParams.get(param);
        if (paramValue) {
          if (typeof res[param] === 'number') {
            res[param] = +paramValue;
          } else {
            res[param] = paramValue;
          }
        }
      });

      return res;
    };
  }
}
