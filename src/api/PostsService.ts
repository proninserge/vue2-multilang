import axios from "axios";

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
    const response = await axios.get<IPost[]>("../posts.json");
    return response.data;
  }
  static async fetchPost(id: number): Promise<IPost | null> {
    const response = await axios.get<IPost[]>("../posts.json");
    const article = response.data.find((item) => item.id === id);
    return article ? article : null;
  }
}
