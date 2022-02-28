<template>
  <el-row type="flex" justify="center" :class="viewMode ? '' : 'block-el-row'">
    <el-col
      :xs="23"
      :sm="22"
      :md="20"
      :lg="viewMode ? 18 : 22"
      :xl="viewMode ? 18 : 22"
      class="post-view"
    >
      <el-row type="flex" justify="center">
        <el-col :span="viewMode ? 12 : 24">
          <h3 data-test="article-header">
            {{ article.title }}
          </h3>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        justify="center"
        :class="viewMode ? 'post-sub-title' : 'post-sub-title-block'"
      >
        <el-col :span="viewMode ? 5 : 24">
          {{ $t("article.destination-title") }}
          <strong>{{ article.destination }}</strong>
        </el-col>
        <el-col :span="viewMode ? 5 : 24">
          {{ $t("article.added-title") }}
          <strong>{{ article.author }}</strong>
        </el-col>
        <el-col :span="viewMode ? 5 : 24">
          {{ article.postTime }}
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="viewMode ? 16 : 24">
          <img :src="article.image" alt="post picture" />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="viewMode ? 12 : 22">
          <p>
            {{ truncate(article.text, 200) }}
          </p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col class="post-control" :span="12">
          <el-button @click="viewMore(article.id)" data-test="view-more">
            {{ $t("article.view-more-button") }}
          </el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { IPost } from "@/api/PostsService";
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Article extends Vue {
  @Prop({
    required: true,
  })
  article?: IPost;

  @Prop({
    required: true,
  })
  viewMode?: boolean;

  truncate(str: string, n: number): string {
    return str.length > n ? `${str.substr(0, n - 1)} ...` : str;
  }

  viewMore(id: string): void {
    this.$router.push({
      name: "Article",
      params: { id },
    });
  }
}
</script>

<style lang="scss" scoped>
.post-view {
  margin-bottom: 40px;
  &:first-child {
    margin-top: 20px;
  }
  h3 {
    margin: 0;
    font-size: 35px;
    line-height: 43px;
    text-align: center;
    color: #1e1e1e;
  }
  img {
    width: 100%;
  }
}
.post-sub-title {
  margin: 25px 0;
  div {
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #9b9b9b;
    strong {
      color: #4a4a4a;
    }
  }
}
.post-control {
  text-align: center;
  margin: 15px 0;
}
.block-el-row {
  width: 50%;
  @media (max-width: 480px) {
    width: 100%;
  }
}
.post-sub-title-block {
  flex-direction: column;
  div {
    padding: 5px;
  }
}
</style>
