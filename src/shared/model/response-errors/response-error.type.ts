export interface IResponseError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: unknown;
}
