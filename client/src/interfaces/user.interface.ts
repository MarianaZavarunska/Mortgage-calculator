interface ICommonEntity {
  id: number;
  createdAt: string;
  deletedAt?: string;
}

export interface IUser extends ICommonEntity {
  firstName: string;
  lastName: string;
  age?: number;
  phone: string;
  email: string;
  password: string;
}

export interface IResponse {
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
}
