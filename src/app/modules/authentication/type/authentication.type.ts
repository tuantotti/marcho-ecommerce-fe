export interface ILoginResponseWrapper<T> {
  result: T;
  error?: unknown;
  success?: boolean;
  targetUrl?: unknown;
}
export interface ILoginRequest {
  userNameOrEmailAddress: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginResponse {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  userId: number;
}

export interface IUserInforResponseWrapper<T> {
  result: { application: {}; tenant: null; user: T };
  error?: unknown;
  success?: boolean;
  targetUrl?: unknown;
}
export interface IUserInforResponse {
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
  avatarPath: string;
  id: number;
}
