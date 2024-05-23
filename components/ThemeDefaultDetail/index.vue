<template>
  <Header></Header>
  <div class="blog mx-auto p-4 xl:px-20 xl:pt-36 xl:max-w-screen-xl pb-40">
    <h3 class="text-center text-[var(--theme-text-color-2)]">
      {{ article.categoryTitle }}
    </h3>
    <h1
      class="text-2xl font-bold text-center mt-16 xl:mt-16 xl:text-5xl !leading-normal tracking-wider"
    >
      {{ article.title }} #{{ String(article.sort).padStart(3, "0") }}
    </h1>

    <p class="text-center font-time mt-8">
      发布
      <span class="text-[var(--theme-text-color-2)]">{{ article.author }}</span>
      • 更新于
      {{ article.publishedAtDetails.month.english }}
      {{ article.publishedAtDetails.day }},
      {{ article.publishedAtDetails.year }} • {{ article.viewsCount }} 阅读
    </p>

    <div class="mt-16">
      <img
        class="w-full h-auto object-cover aspect-video"
        :src="useImageUrl(article.cover)"
        alt=""
      />
    </div>
    <section
      class="mt-2 leading-[1.6] tracking-[0.5px] xl:leading-[1.5] text-justify"
    >
      <div v-html="article.html"></div>
    </section>
    <p
      v-if="article.tagList"
      class="text-[var(--theme-text-color-2)] mt-4 text-sm"
    >
      {{ article.tagList.split(",").join(" • ") }}
    </p>
  </div>

  <Follower parent=".blog"></Follower>
</template>

<script setup lang="ts">
import { useWebArticleInfoApi } from "~/api/web/article";
import Header from "../ThemeDefault/header.vue";
import Follower from "../ThemeDefault/follower.vue";
import type Article from "~/server/models/Article";
import "@kangc/v-md-editor/lib/style/preview.css";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
import "@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import  useImageUrl  from "@/utils/imageUrl"

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});
const article = ref<Article>(null as unknown as Article);
const res = await useWebArticleInfoApi(props.id as unknown as number);
article.value = res;
</script>
