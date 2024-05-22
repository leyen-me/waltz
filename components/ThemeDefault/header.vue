<template>
  <div
    class="px-4 h-20 fixed top-0 left-0 z-20 w-full flex items-center justify-between text-4xl font-logo xl:px-20 xl:h-28"
  >
    <div>
      <NuxtLink to="/">{{ appStore.siteConfig.title }}</NuxtLink>
    </div>
    <div>
      <div
        class="relative w-12 h-12 group cursor-pointer"
        @click="show = !show"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center transition duration-250 ease-in-out"
          :class="[show ? 'rotate-45' : 'rotate-0']"
        >
          <t-icon name="remove"></t-icon>
        </div>
        <div
          :class="show ? '-rotate-45' : 'rotate-0'"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center transition duration-250 ease-in-out"
        >
          <t-icon name="remove"></t-icon>
        </div>
      </div>
    </div>
  </div>

  <Transition name="slide">
    <div
      v-show="show"
      :class="[show ? 'h-full' : 'h-0']"
      class="m-header fixed bg-[var(--theme-bg-color-1)] top-0 left-0 z-10 w-full overflow-hidden"
    >
      <div class="mx-auto p-4 xl:px-20 xl:pt-36 xl:max-w-screen-xl mt-28">
        <t-input
          placeholder="请输入关键词"
          clearable
          v-model="searchText"
          size="large"
        >
        </t-input>

        <Loading
          style="--theme-loading-bg-color: #191a1e"
          v-if="loading"
        ></Loading>

        <ul class="w-full mt-4">
          <li
            v-for="(v, k) in searchList"
            :key="v.id"
            class="w-full flex items-center justify-between px-8 py-6 cursor-pointer hover:bg-[#343434] rounded transition ease"
            style="border-bottom: 1px rgba(0, 0, 0, 0.1) solid"
            @click="handleGoBlog(v)"
          >
            <div class="w-0 flex-1">
              <h3 class="line-clamp-1 text-white">
                {{ v.title }}
              </h3>
              <span class="text-gray-400 line-clamp-1 mt-2">{{
                v.content
              }}</span>
            </div>
            <div class="w-6 h-6 text-white">
              <IconRtArrow></IconRtArrow>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type Article from "~/server/models/Article";
import useAppStore from "~/stores/appStore";
import useDebounce from "~/utils/debounce";
import { useWebArticleListApi } from "~/api/web/article";
import Loading from "./loading.vue";

const router = useRouter();

const loading = ref(false);
const searchText = ref("");
const searchList = ref<Article[]>([]);

const appStore = useAppStore();
const show = ref(false);

const handleGoBlog = (item: Article) => {
  router.push("/blog/" + item.id);
};

const search = async () => {
  searchList.value = [];
  if (searchText.value.trim() === "") {
    return;
  }
  try {
    loading.value = true;
    const list = await useWebArticleListApi(searchText.value);
    if (list && Array.isArray(list)) {
      searchList.value = list;
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const handleSearch = useDebounce(search, 500);

watch(
  () => searchText.value,
  (newValue, oldValue) => {
    handleSearch();
  }
);

watch(
  () => show.value,
  (newValue, oldValue) => {
    if (!newValue) {
      loading.value = false;
      searchText.value = "";
      searchList.value = [];
    }
  }
);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 500ms ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  height: 0;
  background-color: #333;
}

.m-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20px;
  background-color: var(--theme-text-color-2);
}
</style>
