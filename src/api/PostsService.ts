import axios from "@/api/axios";

export interface IPost {
  id: number;
  title: string;
  destination: string;
  author: string;
  postTime: string;
  image: string;
  text: string;
}

export default class PostsService {
  static async fetchPosts(): Promise<IPost[]> {
    const response = await axios.get<IPost[]>("/articles");
    return response.data;
  }
  static async fetchPost(id: number): Promise<IPost> {
    const response = await axios.get<IPost[]>("/articles");
    const article = response.data.find((item) => item.id === id);
    return article ? article : ({} as IPost);
  }
}
