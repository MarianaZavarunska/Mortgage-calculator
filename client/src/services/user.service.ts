import { AxiosResponse } from "axios";

import { backURL } from "../constants/urls";
import axiosTemplate from "../http/axios";
import { IResult } from "../interfaces/user.interface";

class UserService {
  public async sendResult(data: IResult): Promise<AxiosResponse<string>> {
    return axiosTemplate.post(`${backURL.result}`, data);
  }
}

export const userService = new UserService();
