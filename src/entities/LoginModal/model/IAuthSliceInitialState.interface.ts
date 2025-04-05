import { IAuthUser } from "@entities/User";

export interface IAuthSliceInitialState {
  user: IAuthUser & { access_token: string | null },
  isLoading: boolean;
  error: string | null;
}

export type TAuthError = IAuthSliceInitialState['error'];
