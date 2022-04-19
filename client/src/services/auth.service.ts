import { AxiosResponse } from "axios";

import { backURL } from "../constants/urls";
import axiosTemplate from "../http/axios";
import { IResponse, IUser } from "../interfaces/user.interface";

class AuthService {
  public async registartion(data: IUser): Promise<AxiosResponse<IResponse>> {
    return axiosTemplate.post<IResponse>(`${backURL.registartion}`, data);
  }

  public async login(data: Partial<IUser>): Promise<AxiosResponse<IResponse>> {
    return axiosTemplate.post<IResponse>(`${backURL.login}`, data);
  }

  public async logout(): Promise<string> {
    return axiosTemplate.post(`${backURL.logout}`);
  }
}

export const authService = new AuthService();
