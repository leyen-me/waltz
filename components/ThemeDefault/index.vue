<template>
  <div
    class="home relative w-full h-full bg-[var(--theme-bg-color-1)] text-[var(--theme-text-color-1)] pt-28 flex flex-col justify-between"
  >
    <Header></Header>
    <div class="mx-auto p-4 xl:px-20 xl:pt-36 xl:max-w-screen-xl pb-40">
      <h3 id="home-title-1">Blog</h3>
      <h1 id="home-title-2" class="py-5 text-3xl xl:text-5xl">
        Welcome to
        <span class="text-[var(--theme-text-color-2)]">{{
          (appStore.siteConfig.title as unknown as string)
            .charAt(0)
            .toUpperCase() + appStore.siteConfig.title.slice(1)
        }}</span
        >!
      </h1>
      <p
        id="home-title-3"
        class="mt-4 mb-24 text-xl opacity-80 tracking-wider font-silka-regular"
      >
        {{ appStore.siteConfig.desc }}
      </p>

      <!-- 分类 -->
      <ul class="w-full flex flex-wrap gap-2" v-if="!tagActive">
        <li
          class="rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white"
        >
          分类：
        </li>
        <li
          @click="emits('categoryClick', -1)"
          :class="active === -1 ? 'bg-white text-black' : ''"
          class="rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white"
        >
          全部
        </li>
        <li
          @click="emits('categoryClick', k)"
          :class="active === k ? 'bg-white text-black' : ''"
          class="rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white"
          v-for="(v, k) in categoryList"
          :key="v.id"
        >
          {{ v.title }}
        </li>
      </ul>

      <!-- 标签 -->
      <!-- <ul class="w-full flex flex-wrap gap-2 mt-2">
        <li
          class="rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white"
        >
          标签：
        </li>
        <li
          @click="emits('tagClick', -1)"
          :class="tagActive === -1 ? 'bg-white text-black' : ''"
          class="rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white"
        >
          全部
        </li>
        <li
          @click="emits('tagClick', k)"
          :class="tagActive === k ? 'bg-white text-black' : ''"
          class="rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white"
          v-for="(v, k) in tagList"
          :key="'tag' + v.id"
        >
          {{ v.title }}
        </li>
      </ul> -->

      <List :list @click="(e:any) => emits('itemClick', e)"></List>

      <p class="text-center mt-32" v-if="list.length === 0">一条博客都没有~</p>

      <Loading
        v-if="loading"
        style="--theme-loading-bg-color: var(--theme-bg-color-1)"
      ></Loading>
      <div class="w-full flex justify-center mt-8" v-if="page < totalPages">
        <span
          @click="emits('readMoreClick')"
          v-if="page * limit"
          class="bg-white text-black rounded-full px-6 py-4 hover:bg-[rgb(37,37,37)] hover:text-white transition duration-500 ease"
          >阅读更多</span
        >
      </div>
    </div>
    <Footer
      :title="appStore.siteConfig.title"
      v-if="appStore.siteConfig.footer"
    ></Footer>
  </div>
</template>

<script setup lang="ts">
import "./index.css";
import Header from "./header.vue";
import Footer from "./footer.vue";
import List from "./list.vue";
import Loading from "./loading.vue";
import useAppStore from "~/stores/appStore";
import type Article from "~/server/models/Article";
import type Category from "~/server/models/Category";
import { gsap } from "gsap";
import type Tag from "~/server/models/Tag";

const parent = ref(".home");

const emits = defineEmits([
  "itemClick",
  "readMoreClick",
  "categoryClick",
  "tagClick",
]);
const props = defineProps({
  list: {
    type: Array<Article>,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  categoryList: {
    type: Array<Category>,
    required: true,
  },
  active: {
    type: Number,
    required: true,
  },
  tagActive: {
    type: Number,
    required: true,
  },
  tagList: {
    type: Array<Tag>,
    required: true,
  },
});

const appStore = useAppStore();
const handleHeaderChange = (show: boolean) => {
  if (show) {
    parent.value = ".header-1,.header-2";
  } else {
    parent.value = ".home";
  }
};

onMounted(() => {
  var tl = gsap.timeline();
  gsap.set(["#home-title-1", "#home-title-2", "#home-title-3"], {
    y: document.querySelector("#home-title-1")!.clientHeight,
    opacity: 0,
  });
  tl.to(["#home-title-1", "#home-title-2", "#home-title-3"], {
    duration: 1,
    y: 0,
    opacity: 1,
    stagger: 0.2,
  });
  tl.to("#home-title-1", { duration: 1, y: 0, opacity: 1 });
  tl.to("#home-title-2", { duration: 1, y: 0, opacity: 1 }, "-=1");
  tl.to("#home-title-3", { duration: 1, y: 0, opacity: 1 }, "-=1");
});
</script>

<style scoped></style>
