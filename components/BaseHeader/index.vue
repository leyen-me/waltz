<template>
  <t-affix @fixed-change="handleFixedChange">
    <header
      class="flex p-5 justify-between items-center dark:text-white"
      :class="{
        'bg-white shadow-md dark:bg-[#242424]': affixed,
        'bg-transparent shadow-none': !affixed,
      }"
    >
      <h1 class="text-4xl leading-9 font-bold cursor-pointer font-logo">
        <NuxtLink to="/" class="dark:text-white">LEYEN</NuxtLink>
      </h1>
      <div class="flex items-center">
        <IconSearch
          class="w-6 h-6 cursor-pointer"
          @click="handleShowSearch"
        ></IconSearch>
        <!-- <div class="ml-8">
          <t-button shape="round" size="large" variant="outline">登录</t-button>
        </div> -->
      </div>
      <t-dialog
        class="search-dialog"
        attach="body"
        placement="top"
        header="搜索文章"
        body="自定义对话框距离窗口顶部位置，top: 50px"
        top="50px"
        width="90%"
        :visible="visible"
        :cancelBtn="() => null"
        :confirmBtn="() => null"
        @close="handleClose"
      >
        <t-input placeholder="请输入关键词" clearable v-model="searchText">
        </t-input>
        <ul class="w-full mt-4">
          <li
            v-for="(v, k) in searchList"
            :key="v.id"
            class="w-full flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#343434]"
            style="border-bottom: 1px rgba(0, 0, 0, 0.1) solid"
            @click="handleGoBlog(v)"
          >
            <div class="w-0 flex-1">
              <h3 class="text-zinc-900 line-clamp-1 dark:text-white">
                {{ v.title }}
              </h3>
              <span class="text-gray-400 line-clamp-1">{{ v.content }}</span>
            </div>
            <div class="w-6 h-6 text-zinc-900 dark:text-white">
              <IconRtArrow></IconRtArrow>
            </div>
          </li>
        </ul>
      </t-dialog>
    </header>
  </t-affix>
</template>

<script setup lang="ts">
import { useWebArticleListApi } from "~/api/web/article";
import type Article from "~/server/models/Article";
import useDebounce from "~/utils/debounce";

const router = useRouter();

const visible = ref(false);
const searchText = ref("");
const searchList = ref<Article[]>([]);
const affixed = ref(false);
const handleClose = () => {
  visible.value = false;
};

const handleFixedChange = (_affixed: boolean) => {
  affixed.value = _affixed;
};

const search = async () => {
  if (searchText.value.trim() === "") {
    searchList.value = [];
    return;
  }
  const list = await useWebArticleListApi(searchText.value);
  if (list && Array.isArray(list)) {
    searchList.value = list;
  }
};

const handleGoBlog = (item: Article) => {
  router.push("/blog/" + item.id);
};

const handleSearch = useDebounce(search, 500);

watch(
  () => searchText.value,
  (newValue, oldValue) => {
    handleSearch();
  }
);
const handleShowSearch = () => {
  visible.value = true;
};
</script>
