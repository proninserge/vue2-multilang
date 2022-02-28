import axios, { AxiosResponse } from "axios";

interface IUser {
  email: string;
  password: string;
}

export default class UserService {
  static async login({
    email,
    password,
  }: IUser): Promise<AxiosResponse<IUser>> {
    return axios.post<IUser>("http://localhost:5000/login", {
      email,
      password,
    });
  }
}
