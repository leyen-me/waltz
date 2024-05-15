<template>
  <div class="w-full p-5 xl:w-2/5 mx-auto pt-20">
    <BaseHeader></BaseHeader>
    <ul class="grid grid-cols-1 gap-2 mt-8 xl:grid-cols-2 xl:gap-6 xl:mt-16">
      <li
        v-for="(v, k) in list"
        class="mb-8 cursor-pointer"
        @click="handleDetail(v)"
      >
        <div class="w-full aspect-square overflow-hidden">
          <img
            class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
            :src="v.cover"
          />
        </div>
        <div class="p-2 xl:p-4 dark:text-white">
          <h2 class="mt-3 font-bold text-2xl flex">
            <span class="line-clamp-1">{{ v.title }}</span>

            <span class="ml-2">#{{ String(v.sort).padStart(3, "0") }}</span>
            <span class="inline-block align-middle w-8 h-8">
              <IconRtArrow></IconRtArrow>
            </span>
          </h2>
          <p class="mt-1 opacity-65 line-clamp-3">
            {{ v.content }}
          </p>
          <span class="font-time mt-1 opacity-65 text-sm">
            {{
              v.publishedAtDetails.month.english +
              " " +
              v.publishedAtDetails.day +
              "," +
              v.publishedAtDetails.year
            }}
          </span>
        </div>
      </li>
    </ul>
    <div class="mt-4">
      <t-pagination
        v-if="list.length > limit"
        v-model="page"
        v-model:pageSize="limit"
        :total="total"
        show-sizer
        :page-size-options="defaultRowsPerPageOptions"
        @page-size-change="getData"
        @current-change="getData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebArticlePageApi } from "~/api/web/article";
import { defaultRowsPerPageOptions } from "@/constans";
import type Article from "~/server/models/Article";

const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);

const total = ref(0);
const list = ref<Article[]>([]);
const router = useRouter();

const handleDetail = (v: any) => {
  router.push(`/blog/${v.id}`);
};

const getData = async () => {
  const res = await useWebArticlePageApi({
    page: page.value,
    limit: limit.value,
  });
  list.value = res.data;
  total.value = res.meta.totalItems;
};

getData();

// 请不要删除或改动下方代码
console.log("welcome to home 001");
</script>
