<template>
  <div class="w-full xl:w-2/5 xl:m-auto xl:mt-20">
    <BaseHeader></BaseHeader>
    <h1 class="text-2xl font-bold text-center mt-16 xl:mt-16 dark:text-white">
      {{ article.title }} #{{ String(article.sort).padStart(3, "0") }}
    </h1>
    <div class="flex justify-center items-center mt-4">
      <div class="text-stone-500 text-sm flex items-center justify-center">
        <div class="h-3 w-px bg-stone-500 inline-block relative">
          <span
            class="absolute right-4 whitespace-nowrap top-1/2 translate-y-[-50%]"
            >By {{ article.author }}</span
          >
          <span
            class="absolute left-4 whitespace-nowrap top-1/2 translate-y-[-50%]"
            >{{
              article.publishedAtDetails.month.english +
              " " +
              article.publishedAtDetails.day +
              "," +
              article.publishedAtDetails.year
            }}</span
          >
        </div>
      </div>
    </div>
    <div class="mt-8">
      <img
        class="w-full h-auto object-cover aspect-video"
        :src="NUXT_API_STATIC_BASE + article.cover"
        alt=""
      />
    </div>
    <section
      class="mt-2 leading-[1.6] tracking-[1px] xl:leading-[1.8] text-justify dark:text-stone-300"
    >
      <div v-html="article.html"></div>
      <!-- <BasePreview v-model="article.content"></BasePreview> -->
    </section>
    <div class="p-5 text-sm text-stone-500">阅读 {{ article.viewsCount }}</div>
  </div>
</template>

<script setup lang="ts">
import { useWebArticleInfoApi } from "~/api/web/article";
import type Article from "~/server/models/Article";
const { NUXT_API_STATIC_BASE } = useRuntimeConfig().public;

const route = useRoute();
const router = useRouter();
const id = route.params.id as unknown as number;
const article = ref<Article>({
  title: "",
  cover: "",
  content: "",
  authorId: "",
  author: "",
  publishedAt: "",
  status: "",
  viewsCount: 0,
  publishedAtDetails: "",
  sort: 0,
});
const res = await useWebArticleInfoApi(id);
article.value = res;
</script>
