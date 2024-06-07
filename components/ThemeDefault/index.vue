<template>
  <div
    class="home relative w-full h-full bg-[var(--web-bg-1)] text-[var(--web-color-1)] pt-28 flex flex-col justify-between"
  >
    <Header></Header>

    <div
      :class="[_categoryId ? 'xl:pt-4' : 'xl:pt-36']"
      class="w-full mx-auto p-4 xl:px-20 xl:max-w-screen-xl pb-16 xl:pb-40"
    >
      <div v-show="!_categoryId">
        <h3 id="home-title-1">Blog</h3>
        <h1 id="home-title-2" class="py-5 text-3xl xl:text-5xl">
          Welcome to
          <span class="text-[var(--web-color-7)]">{{
            (
              getValue(
                appStore.siteConfig,
                CONFIG_KEY.SITE.TITLE
              ) as unknown as string
            )
              .charAt(0)
              .toUpperCase() +
            getValue(appStore.siteConfig, CONFIG_KEY.SITE.TITLE).slice(1)
          }}</span
          >!
        </h1>
        <p
          id="home-title-3"
          class="mt-4 mb-24 text-xl opacity-80 tracking-wider font-silka-regular"
        >
          {{ getValue(appStore.siteConfig, CONFIG_KEY.SITE.DESC) }}
        </p>
      </div>

      <!-- 分类 -->
      <ul class="w-full flex flex-wrap gap-2">
        <li
          class="hidden rounded-full px-6 py-4 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:text-white lg:block"
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
      :title="getValue(appStore.siteConfig, CONFIG_KEY.SITE.TITLE)"
      v-if="getValue(appStore.siteConfig, CONFIG_KEY.SITE.FOOTER)"
    ></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "./header.vue";
import Footer from "./footer.vue";
import List from "./list.vue";
import useAppStore from "~/stores/appStore";
import type Article from "~/server/models/Article";
import type Category from "~/server/models/Category";
import { gsap } from "gsap";
import type Tag from "~/server/models/Tag";
import { getValue } from "~/common/utils/siteConfigUtil";
import { CONFIG_KEY } from "~/common/constants";

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
  categoryId: {
    type: Number,
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

const route = useRoute();
const _categoryId = ref(route.query.categoryId);

onBeforeRouteUpdate((n, o) => {
  _categoryId.value = "";
});

onMounted(() => {
  const tl = gsap.timeline();
  const title1 = document.querySelector("#home-title-1");
  let y = 0;
  if (title1) {
    y = title1.clientHeight;
  }
  gsap.set(["#home-title-1", "#home-title-2", "#home-title-3"], {
    y,
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
