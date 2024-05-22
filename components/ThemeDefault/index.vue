<template>
  <div
    class="home relative w-full h-full bg-[var(--theme-bg-color-1)] text-[var(--theme-text-color-1)] pt-28"
  >
    <Header></Header>
    <div class="mx-auto p-4 xl:px-20 xl:pt-36 xl:max-w-screen-xl pb-40">
      <h3>Blog</h3>
      <h1 class="py-5 text-3xl xl:text-5xl">
        Welcome to
        <span class="text-[var(--theme-text-color-2)]">{{
          (appStore.siteConfig.title as unknown as string)
            .charAt(0)
            .toUpperCase() + appStore.siteConfig.title.slice(1)
        }}</span
        >!
      </h1>
      <p class="mt-4 mb-24 text-xl opacity-80 tracking-wider">
        {{ appStore.siteConfig.desc }}
      </p>
      <List :list @click="(e:any) => emits('itemClick', e)"></List>
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
    <Follower></Follower>
  </div>
</template>

<script setup lang="ts">
import "./index.css";
import Header from "./header.vue";
import Footer from "./footer.vue";
import List from "./list.vue";
import Loading from "./loading.vue";
import Follower from "./follower.vue";
import useAppStore from "~/stores/appStore";
import type Article from "~/server/models/Article";

const emits = defineEmits(["itemClick", "readMoreClick"]);
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
});

const appStore = useAppStore();
</script>

<style scoped></style>
