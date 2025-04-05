export const getServerErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object') {
    if ('data' in error && typeof error.data === 'object') {
      if (error.data && 'message' in error.data && typeof error.data.message === 'string') {
        return error.data.message;
      }
    }
  }
  return undefined;
};
