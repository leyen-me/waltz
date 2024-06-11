<template>
  <Header></Header>
  <div
    style="--gpt-body-width: 100%"
    class="blog mx-auto p-4 xl:px-20 xl:max-w-screen-xl pb-10 pt-24 xl:pt-36"
  >
    <h3 class="text-center text-[var(--web-color-7)]">
      <NuxtLink :to="'/?categoryId=' + (article && article.categoryId)">{{
        article && article.categoryTitle
      }}</NuxtLink>
    </h3>
    <h1
      class="text-2xl font-bold text-center mt-16 xl:mt-16 xl:text-5xl !leading-normal tracking-wider"
    >
      {{ article && article.title }}
    </h1>

    <p class="text-center font-time mt-8">
      发布
      <span class="text-[var(--web-color-7)]">{{
        article && article.author
      }}</span>
      • 更新于
      {{ article && article.publishedAtDetails.month.english }}
      {{ article && article.publishedAtDetails.day }},
      {{ article && article.publishedAtDetails.year }} •
      {{ article && article.viewsCount }} 阅读
    </p>

    <div class="mt-16">
      <img
        class="w-full h-auto object-cover aspect-video"
        :src="useImageUrl(article ? article.cover : '')"
        alt=""
      />
    </div>
    <section
      class="mt-2 leading-[1.6] tracking-[0.5px] xl:leading-[1.5] text-justify"
    >
      <div v-if="!browser" v-html="article && article.html"></div>
      <BasePreview v-else-if="article" v-model="article.content"></BasePreview>
    </section>
    <p
      v-if="article && article.tagList"
      class="text-[var(--web-color-7)] mt-4 text-sm font-silka-medium flex px-0 lg:px-8"
    >
      <span v-for="(v, k) in tagList" :key="v"
        ><NuxtLink :to="'/?tagId=' + tagIdList[k]">{{ v }}</NuxtLink
        ><span v-if="k !== tagList.length - 1" class="mx-1"> • </span></span
      >
    </p>
    <div class="flex justify-between mt-8 px-0 lg:px-8 items-end">
      <NuxtLink
        :to="'/admin/article/' + (article && article.id)"
        target="_blank"
        class="cursor-pointer text-[var(--web-color-7)] flex-1"
        ><t-icon name="edit"></t-icon> Edit this page
      </NuxtLink>
      <span
        class="text-sm text-[var(--web-color-13)] line-clamp-2 flex-1 text-end"
        >{{ article && article.updatedAt }}</span
      >
    </div>
    <div class="flex justify-between mt-6 px-0 lg:px-8">
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

    <div class="mt-32 px-0 lg:px-8" v-if="isShowComment">
      <MComment></MComment>
    </div>
  </div>

  <Footer :title="String(article && article.author)"></Footer>
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
import useAppStore from "~/stores/appStore";
import { CONFIG_KEY } from "~/common/constants";
import { getValue } from "~/common/utils/siteConfigUtil";
import MComment from "./comment.vue";
import { defaultRowsPerPageOptions } from "~/constants";
import { useWebCommentPageApi } from "~/api/web/comment";
import type Comment from "@/server/models/Comment";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const router = useRouter();
const appStore = useAppStore();

const browser = computed(() => process.browser);
const isShowComment = ref(
  getValue(appStore.siteConfig, CONFIG_KEY.SITE.COMMENT)
);

// 评论
const commmentList = ref<Comment[]>([]);
const commentLoading = ref(false);
const commentPage = ref(1);
const commentLimit = ref(defaultRowsPerPageOptions[0]);

const commentTotal = ref(0);
const commentTotalPages = ref(0);

const getComment = async () => {
  try {
    commentLoading.value = true;
    const _list = await useWebCommentPageApi({
      page: commentPage.value,
      limit: commentLimit.value,
    });
    _list.data.map((item) => commmentList.value.push(item));
    commentTotal.value = _list.meta.totalItems;
    commentTotalPages.value = _list.meta.totalPages;
  } catch {
    commentPage.value -= 1;
  } finally {
    commentLoading.value = false;
  }
};

// 文章详情
// @ts-ignore
const article = ref<Article>(null);

// 上一篇下一篇
// @ts-ignore
const adjacentInfo = ref<{
  previouArticle: Article | null;
  nextArticle: Article | null;
}>({
  previouArticle: {
    id: 0,
    title: "",
  } as Article,
  nextArticle: {
    id: 0,
    title: "",
  } as Article,
});

try {
  const articleRes = await useWebArticleInfoApi(props.id);
  const adjacentRes = await useWebArticleAdjacentApi(
    props.id,
    articleRes.categoryId
  );
  article.value = articleRes;
  adjacentInfo.value = adjacentRes;
  if (isShowComment.value) {
    try {
      await getComment();
    } catch (error) {}
  }
} catch (error) {
  console.error(error);
  if (process.browser) {
    router.push("/404");
  }
}

// @ts-ignore
const tagList = computed(() => article.value.tagList!.split(","));
const tagIdList = computed(() => article.value.tagIdList!.split(","));

if (process.browser) {
  if (article.value) {
    // @ts-ignore
    window.document.title = article.value.author + "-" + article.value.title;
  }
}
</script>
