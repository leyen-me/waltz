<template>
  <ThemeDefault
    v-if="appStore.siteConfig.theme === 'Default'"
    :page
    :limit
    :list
    :total
    :totalPages
    :loading
    @itemClick="handleDetail"
    @readMoreClick="handleReadMore"
  ></ThemeDefault>
</template>

<script setup lang="ts">
import { useWebArticlePageApi } from "~/api/web/article";
import { defaultRowsPerPageOptions } from "@/constans";
import type Article from "~/server/models/Article";
import useAppStore from "~/stores/appStore";

definePageMeta({
  middleware: "web-auth",
});

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

const getData = async () => {
  try {
    loading.value = true;
    const res = await useWebArticlePageApi({
      page: page.value,
      limit: limit.value,
    });
    res.data.map((item) => list.value.push(item));
    total.value = res.meta.totalItems;
    totalPages.value = res.meta.totalPages;
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

<style>
*,
::before,
::after {
  cursor: none;
}
</style>
