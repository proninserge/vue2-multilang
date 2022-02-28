import axios from "@/api/axios";
import { AxiosResponse } from "axios";

interface IUser {
  email: string;
  password: string;
}

export default class UserService {
  static async login({
    email,
    password,
  }: IUser): Promise<AxiosResponse<IUser>> {
    return axios.post<IUser>("/login", {
      email,
      password,
    });
  }
}
