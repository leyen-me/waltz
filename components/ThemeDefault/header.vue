<template>
  <div
    class="header-1 px-4 h-20 fixed top-0 left-0 z-20 w-full flex items-center justify-between text-4xl font-logo xl:px-20 xl:h-28"
  >
    <div id="header-title">
      <NuxtLink to="/">{{ getValue(appStore.siteConfig, CONFIG_KEY.SITE.TITLE) }}</NuxtLink>
    </div>
    <div>
      <div
        class="relative w-12 h-12 group cursor-pointer"
        @click="show = !show"
      >
        <t-icon v-if="!show" name="search" size="32"></t-icon>
        <t-icon v-else name="close" size="32"></t-icon>
      </div>
    </div>
  </div>

  <Transition name="slide">
    <div
      v-show="show"
      :class="[show ? 'header-show h-full' : 'h-0']"
      class="header-2 fixed bg-[var(--web-bg-1)] top-0 left-0 z-10 w-full overflow-hidden"
    >
      <div
        class="mx-auto p-4 xl:px-20 pt-36 xl:max-w-screen-xl mt-2 h-full pb-32 xl:pb-40"
      >
        <t-input
          placeholder="请输入两个以上关键词"
          clearable
          v-model="searchText"
          size="large"
        >
        </t-input>
        <ul class="w-full h-full mt-4 overflow-auto">
          <li
            v-for="(v, k) in searchList"
            :key="v.id"
            class="w-full flex items-center justify-between px-4 py-4 xl:px-8 xl:py-6 cursor-pointer hover:bg-[var(--web-bg-7)] rounded transition ease"
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
import { getValue } from "~/common/utils/siteConfigUtil";
import { CONFIG_KEY } from "~/common/constants";

const emits = defineEmits(["change"]);

const router = useRouter();

const loading = ref(false);
const searchText = ref("");
const searchList = ref<Article[]>([]);

const appStore = useAppStore();
const show = ref(false);

const handleGoBlog = (item: Article) => {
  router.push("/blog/" + item.id);
};

onMounted(() => {
  document.body.style.overflow = "auto";
});

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
    emits("change", newValue);
    if (!newValue) {
      loading.value = false;
      searchText.value = "";
      searchList.value = [];
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
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
</style>
