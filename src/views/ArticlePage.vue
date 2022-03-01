<template>
  <el-row type="flex" justify="center" class="article-page">
    <el-col
      :xs="23"
      :sm="22"
      :md="20"
      :lg="16"
      :xl="16"
      v-if="content !== null && Object.keys(content).length"
    >
      <h1>
        {{ content.title }}
      </h1>
      <img :src="content.image" alt="post picture" />
      <p>
        {{ content.text }}
      </p>
      <el-divider></el-divider>
      <el-row type="flex" justify="space-between">
        <el-col :span="12" class="article-information text-left">
          {{ content.author }}
        </el-col>
        <el-col :span="12" class="article-information text-right">
          {{ content.postTime }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="article-control">
        <el-col :span="12">
          <el-button data-test="back" @click="backToArticles" type="primary">{{
            $t("article.back-button")
          }}</el-button>
        </el-col>
      </el-row>
    </el-col>
    <h1 v-if="!content">{{ $t("article.loading") }}</h1>
    <h1 v-if="content !== null && !Object.keys(content).length">
      {{ $t("article.nothing-found") }}
    </h1>
  </el-row>
</template>

<script lang="ts">
import { IPost } from "@/api/PostsService";
import { actionTypes } from "@/store/modules/articles";
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  name: "ArticlePage",
})
export default class ArticlePage extends Vue {
  get articleId(): string {
    return this.$route.params.id;
  }

  get content(): IPost {
    return this.$store.state.articles.currentArticle;
  }

  mounted(): void {
    this.$store.dispatch(actionTypes.getArticle, Number(this.$route.params.id));
  }

  backToArticles(): void {
    this.$router.go(-1);
  }

  @Watch("articleId")
  onPropertyChanged(): void {
    if (this.$route.params.id !== this.articleId) {
      this.$router.push({
        name: "Article",
        params: { id: this.articleId },
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.article-page {
  margin-bottom: 30px;
  img {
    width: 100%;
  }
}
.article-information {
  color: #5c5c5c;
}
.article-control {
  margin-top: 20px;
}
</style>
