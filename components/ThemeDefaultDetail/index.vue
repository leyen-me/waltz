<template>
  <Header></Header>
  <div
    style="--gpt-body-width: 100%"
    class="blog mx-auto p-4 xl:px-20 xl:max-w-screen-xl pb-10 pt-24 xl:pt-36"
  >
    <h3 class="text-center text-[var(--web-color-7)]">
      <NuxtLink :to="'/?categoryId=' + article.categoryId">{{
        article.categoryTitle
      }}</NuxtLink>
    </h3>
    <h1
      class="text-2xl font-bold text-center mt-16 xl:mt-16 xl:text-5xl !leading-normal tracking-wider"
    >
      {{ article.title }}
    </h1>

    <p class="text-center font-time mt-8">
      发布
      <span class="text-[var(--web-color-7)]">{{ article.author }}</span>
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
      <!-- 服务端渲染 -->
      <div v-if="!browser" v-html="article.html"></div>

      <!-- 客户端渲染 -->
      <BasePreview v-else v-model="article.content"></BasePreview>
    </section>
    <p
      v-if="article.tagList"
      class="text-[var(--web-color-7)] mt-4 text-sm font-silka-medium flex px-8"
    >
      <span v-for="(v, k) in tagList" :key="v"
        ><NuxtLink :to="'/?tagId=' + tagIdList[k]">{{ v }}</NuxtLink
        ><span v-if="k !== tagList.length - 1" class="mx-1"> • </span></span
      >
    </p>
    <div class="flex justify-between mt-8 px-8 items-end">
      <NuxtLink
        :to="'/admin/article/' + article.id"
        target="_blank"
        class="cursor-pointer text-[var(--web-color-7)] flex-1"
        ><t-icon name="edit"></t-icon> Edit this page
      </NuxtLink>
      <span
        class="text-sm text-[var(--web-color-13)] line-clamp-2 flex-1 text-end"
        >{{ article.updatedAt }}</span
      >
    </div>
    <div class="flex justify-between mt-6 px-8">
      <NuxtLink
        :to="'/blog/' + String(adjacentInfo.previouArticle.id)"
        class="hover:no-underline"
        v-if="adjacentInfo.previouArticle"
      >
        <div
          class="flex group flex-col border border-[var(--web-border-1)] border-solid p-4 rounded-md cursor-pointer hover:border-[var(--web-color-7)] transition duration-500 ease"
        >
          <span class="text-xs" style="color: rgba(235, 235, 245, 0.6)"
            >上一篇</span
          ><span
            class="w-28 xl:w-60 line-clamp-1 mt-2 group-hover:text-[var(--web-color-7)] transition duration-500 ease"
            >{{ adjacentInfo.previouArticle.title }}</span
          >
        </div>
      </NuxtLink>
      <div v-else></div>
      <NuxtLink
        :to="'/blog/' + String(adjacentInfo.nextArticle.id)"
        class="hover:no-underline"
        v-if="adjacentInfo.nextArticle"
      >
        <div
          class="flex group items-end flex-col border border-[var(--web-border-1)] border-solid p-4 rounded-md cursor-pointer hover:border-[var(--web-color-7)] transition duration-500 ease"
        >
          <span class="text-xs" style="color: rgba(235, 235, 245, 0.6)"
            >下一篇</span
          ><span
            class="w-28 xl:w-60 line-clamp-1 mt-2 group-hover:text-[var(--web-color-7)] transition duration-500 ease"
            >{{ adjacentInfo.nextArticle.title }}</span
          >
        </div>
      </NuxtLink>
      <div v-else></div>
    </div>
  </div>
  <Footer :title="String(article.author)"></Footer>
</template>

<script setup lang="ts">
import {
  useWebArticleAdjacentApi,
  useWebArticleInfoApi,
} from "~/api/web/article";
import Header from "../ThemeDefault/header.vue";
import Footer from "../ThemeDefault/footer.vue";
import type Article from "~/server/models/Article";
import useImageUrl from "@/utils/imageUrl";
import useUserStore from "~/stores/userStore";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

// @ts-ignore
const adjacentInfo = ref<Article>(null);
const browser = computed(() => process.browser);

// @ts-ignore
const article = ref<Article>(null);
const res = await useWebArticleInfoApi(props.id);
const res_1 = await useWebArticleAdjacentApi(props.id, res.categoryId);

// @ts-ignore
const tagList = computed(() => article.value.tagList!.split(","));
const tagIdList = computed(() => article.value.tagIdList!.split(","));
article.value = res;
adjacentInfo.value = res_1;

if (process.browser) {
  window.document.title = res.author + "-" + res.title;
}
</script>
