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
    @itemClick="handleDetail"
    @readMoreClick="handleReadMore"
    @categoryClick="handleCategoryClick"
  ></ThemeDefault>
</template>

<script setup lang="ts">
import { useWebArticlePageApi } from "~/api/web/article";
import { defaultRowsPerPageOptions } from "@/constans";
import type Article from "~/server/models/Article";
import useAppStore from "~/stores/appStore";
import { useWebCategoryListApi } from "~/api/web/category";
import type Category from "~/server/models/Category";

definePageMeta({
  middleware: "web-auth",
});

const active = ref(-1);
const categoryList = ref<Category[]>([]);

const page = ref(1);
const totalPages = ref(0);
const limit = ref(defaultRowsPerPageOptions[0]);

const total = ref(0);
const list = ref<Article[]>([]);
const router = useRouter();

const loading = ref(false);

const appStore = useAppStore();

const handleDetail = (v: any) => {
  router.push(`/blog/${v.id}`);
};

const handleCategoryClick = (k: number) => {
  totalPages.value = 0;
  total.value = 0;
  list.value = [];
  active.value = k;
  getData();
};

const getData = async () => {
  try {
    loading.value = true;
    const [_categoryList, _list] = await Promise.all([
      useWebCategoryListApi(),
      useWebArticlePageApi({
        page: page.value,
        limit: limit.value,
        categoryId:
          active.value === -1 ? "" : categoryList.value[active.value].id,
      }),
    ]);
    categoryList.value = _categoryList;
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
console.log("welcome to home 002");
</script>
