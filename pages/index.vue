<template>
  <ThemeDefault
    v-if="appStore.siteConfig.theme === 'Default'"
    :active
    :page
    :limit
    :list
    :total
    :totalPages
    :loading
    :categoryList
    :categoryId
    :tagActive
    :tagList
    @itemClick="handleDetail"
    @readMoreClick="handleReadMore"
    @categoryClick="handleCategoryClick"
    @tagClick="handleTagClick"
  ></ThemeDefault>
</template>

<script setup lang="ts">
import { useWebArticlePageApi } from "~/api/web/article";
import { defaultRowsPerPageOptions } from "@/constans";
import type Article from "~/server/models/Article";
import useAppStore from "~/stores/appStore";
import { useWebCategoryListApi } from "~/api/web/category";
import type Category from "~/server/models/Category";
import type Tag from "~/server/models/Tag";
import { useWebTagListApi } from "~/api/web/tag";

definePageMeta({
  middleware: "web-auth",
});

const active = ref(-1);
const categoryList = ref<Category[]>([]);

const tagActive = ref(-1);
const tagList = ref<Tag[]>([]);

const page = ref(1);
const totalPages = ref(0);
const limit = ref(defaultRowsPerPageOptions[0]);

const total = ref(0);
const list = ref<Article[]>([]);

const route = useRoute();
const router = useRouter();

const categoryId = ref(route.query.categoryId as string);
const tagId = ref(route.query.tagId as string);

const loading = ref(false);

const appStore = useAppStore();

window.document.title = "Welcome to " + appStore.siteConfig.title || "Hello Nuxt!"

const handleDetail = (v: any) => {
  router.push(`/blog/${v.id}`);
};

const handleCategoryClick = (k: number) => {
  categoryId.value = ""
  totalPages.value = 0;
  total.value = 0;
  list.value = [];
  active.value = k;
  getData();
};

const handleTagClick = (k: number) => {
  tagId.value = ""
  totalPages.value = 0;
  total.value = 0;
  list.value = [];
  tagActive.value = k;
  getData();
};

const getData = async () => {
  try {
    loading.value = true;
    const [_tagList, _categoryList, _list] = await Promise.all([
      useWebTagListApi(),
      useWebCategoryListApi(),
      useWebArticlePageApi({
        page: page.value,
        limit: limit.value,
        categoryId: categoryId.value
          ? categoryId.value
          : active.value === -1
          ? ""
          : categoryList.value[active.value].id,
        tagId: tagId.value
          ? tagId.value
          : tagActive.value === -1
          ? ""
          : tagList.value[tagActive.value].id,
      }),
    ]);
    tagList.value = _tagList;
    categoryList.value = _categoryList;

    const tagIndex = tagList.value.findIndex(
      (tag) => String(tag.id) === String(tagId.value)
    );
    if (tagIndex !== -1) {
      tagActive.value = tagIndex;
    }

    const categoryIndex = categoryList.value.findIndex(
      (category) => String(category.id) === String(categoryId.value)
    );
    if (categoryIndex !== -1) {
      active.value = categoryIndex;
    }

    _list.data.map((item) => list.value.push(item));
    total.value = _list.meta.totalItems;
    totalPages.value = _list.meta.totalPages;
  } catch {
    page.value -= 1;
  } finally {
    loading.value = false;
  }
};

const handleReadMore = () => {
  page.value += 1;
  getData();
};

getData();

// 请不要删除或改动下方代码
console.log("welcome to home 001");
</script>