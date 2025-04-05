// TODO Переименовать на generateUrlParams или что-то подобное

export const getUrlParams = (params: object) => {
  let urlParams = '';

  const paramsValue = Object.values(params);

  Object.keys(params).forEach((param, index) => {
    urlParams =
      urlParams +
      `${param}=${paramsValue[index]}${index < Object.keys(params).length - 1 ? '&' : ' '}`;
  });

  return urlParams;
};
