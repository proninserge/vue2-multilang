<template>
  <div class="home">
    <h1>{{ $t("pages.home.header") }}</h1>
    <el-row type="flex" justify="center">
      <el-col :span="12" class="articles-control">
        <el-input
          data-test="search-input"
          :placeholder="$t('search')"
          v-model="searchValue"
          @input="onSearchDebounced"
        ></el-input>
        <el-tooltip
          effect="dark"
          :content="$t('tooltip')"
          placement="top-start"
        >
          <el-button
            data-test="view-mode"
            type="primary"
            :icon="viewMode ? 'el-icon-edit' : 'el-icon-star-off'"
            circle
            @click="changeView"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <div
      data-test="article-container"
      v-if="articles"
      :class="viewMode ? '' : 'block-view'"
    >
      <Article
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :viewMode="viewMode"
      />
    </div>
    <div v-else>{{ $t("article.nothing-found") }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IPost } from "@/api/PostsService";
import Article from "@/components/Article.vue";
import { debounce } from "@/utils";
import {
  actionTypes,
  getterTypes,
  mutationTypes,
} from "@/store/modules/articles";

@Component({
  components: {
    Article,
  },
})
export default class Home extends Vue {
  articles: IPost[] | null = null;
  searchValue: string = "";
  viewMode: boolean = true;

  changeView(): void {
    this.viewMode = !this.viewMode;
  }

  async mounted(): Promise<void> {
    await this.$store.dispatch(actionTypes.getArticles);
    this.articles = this.$store.state.articles.articles;
  }

  onSearch(): void {
    if (this.searchValue === "") {
      this.articles = this.$store.state.articles.articles;
    } else {
      this.$store.commit(mutationTypes.setQuery, this.searchValue);
      this.articles = this.$store.getters[getterTypes.searchedArticles];
    }
  }
  onSearchDebounced = debounce(this.onSearch, 500);
}
</script>

<style lang="scss" scoped>
.articles-control {
  .el-input {
    display: inline-block;
    width: 250px;
    margin: 0 5px 0 0;
    @media (max-width: 768px) {
      display: block;
      width: 100%;
      margin: 0 0 10px 0;
    }
  }
}
.block-view {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
