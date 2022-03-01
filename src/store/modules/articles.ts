import PostsService, { IPost } from "@/api/PostsService";
import { ActionTree } from "vuex";

export interface IArticlesState {
  articles: IPost[] | null;
  currentArticle: IPost | null;
  query: string;
}

const state: IArticlesState = {
  articles: null,
  currentArticle: null,
  query: "",
};

export const mutationTypes = {
  getArticles: "[articles] getArticles",
  getArticle: "[articles] getArticle",
  setQuery: "[articles] setQuery",
};

export const actionTypes = {
  getArticles: "[articles] getArticles",
  getArticle: "[articles] getArticle",
};

export const getterTypes = {
  searchedArticles: "[articles] searchedArticles",
};

const mutations = {
  [mutationTypes.getArticles](state: IArticlesState, payload: IPost[]): void {
    state.articles = payload;
  },
  [mutationTypes.getArticle](state: IArticlesState, payload: IPost): void {
    state.currentArticle = payload;
  },
  [mutationTypes.setQuery](state: IArticlesState, payload: string): void {
    state.query = payload;
  },
};

const getters = {
  [getterTypes.searchedArticles]: (state: IArticlesState): IPost[] | null => {
    const articles = state.articles?.filter((item) =>
      item.title.toLowerCase().includes(state.query.toLowerCase())
    );
    return articles ? articles : null;
  },
};

const actions: ActionTree<IArticlesState, IArticlesState> = {
  async [actionTypes.getArticles](context): Promise<void> {
    try {
      const articles = await PostsService.fetchPosts();
      context.commit(mutationTypes.getArticles, articles);
    } catch (e) {
      context.commit(mutationTypes.getArticles, null);
      console.log(e);
    }
  },

  async [actionTypes.getArticle](context, id: number): Promise<void> {
    try {
      const article = await PostsService.fetchPost(id);
      context.commit(mutationTypes.getArticle, article);
    } catch (e) {
      context.commit(mutationTypes.getArticle, {} as IPost);
      console.log(e);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
