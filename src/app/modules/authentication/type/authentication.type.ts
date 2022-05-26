export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  roles: string[];
  userId: number;
  'x-access-token': string;
  'x-refresh-token': string;
}

export interface IRegisterRequest {
  username: string;
  password: string;
  email: string;
  phone: string;
}
