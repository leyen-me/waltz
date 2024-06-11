<template>
  <div
    class="header-1 px-4 h-20 fixed top-0 left-0 z-20 w-full flex items-center justify-between text-4xl font-logo xl:px-20 xl:h-28"
  >
    <div id="header-title" class="text-5xl">
      <NuxtLink to="/">{{
        getValue(appStore.siteConfig, CONFIG_KEY.SITE.TITLE)
      }}</NuxtLink>
    </div>
    <div class="flex justify-end items-center">
      <div class="block lg:hidden">
        <t-button
          shape="round"
          size="large"
          variant="text"
          style="padding: 24px; border-radius: 999px"
          v-if="!show"
          @click="show = !show"
        >
          <template #icon>
            <t-icon name="search"></t-icon>
          </template>
        </t-button>
      </div>
      <div class="hidden lg:block">
        <div
          class="bg-[var(--web-bg-2)] rounded-full px-6 h-12 flex items-center"
        >
          <t-icon
            name="search"
            size="18px"
            style="color: var(--web-color-2)"
          ></t-icon>
          <input
            type="text"
            v-model="searchText"
            placeholder="Search..."
            class="border-none bg-none ml-2 h-full text-white"
            @keydown.enter="handleSearchEnter"
          />
        </div>
      </div>
      <template v-if="browser && showLogin">
        <div class="hidden lg:block ml-2">
          <t-button
            shape="round"
            style="
              height: 48px;
              padding: 0 24px;
              border-radius: 999px;
              font-family: 'silka-medium';
            "
            size="large"
            variant="text"
            @click="handleGoLogIn"
          >
            Log in</t-button
          >
        </div>
        <div class="ml-2">
          <t-button
            shape="round"
            style="
              height: 48px;
              background-color: white;
              padding: 0 24px;
              border-radius: 999px;
              font-family: 'silka-medium';
            "
            size="large"
            variant="base"
            @click="handleGoSignUp"
          >
            Sign up</t-button
          >
        </div>
      </template>
    </div>
  </div>

  <Transition name="slide">
    <div
      v-show="show"
      :class="[show ? 'header-show h-full' : 'h-0']"
      class="header-2 fixed bg-[var(--web-bg-1)] top-0 left-0 z-10 w-full overflow-hidden"
    >
      <div
        class="mx-auto p-4 xl:px-20 pt-36 xl:max-w-screen-xl mt-2 h-full pb-32 xl:pb-40 flex flex-col"
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
        <t-button
          shape="round"
          size="large"
          variant="text"
          style="padding: 24px"
          @click="show = !show"
        >
          <template #icon>
            <t-icon name="close"></t-icon>
          </template>
          Close
        </t-button>
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
import useUserStore from "~/stores/userStore";

const emits = defineEmits(["change"]);

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const searchText = ref("");
const searchList = ref<Article[]>([]);

const userStore = useUserStore();
const appStore = useAppStore();
const show = ref(false);

const browser = computed(() => process.browser);

const showLogin = computed(() => {
  if (getValue(appStore.siteConfig, CONFIG_KEY.SITE.LOGIN)) {
    if (userStore.user.id) {
      // 不显示
      return false;
    }
    // 显示
    return true;
  } else {
    // 不显示
    return false;
  }
});

const handleGoBlog = (item: Article) => {
  router.push("/blog/" + item.id);
};
const handleGoLogIn = () => {
  router.push("/admin/login/?redirect=" + encodeURIComponent(route.path));
};
const handleGoSignUp = () => {
  router.push("/admin/register?redirect=" + encodeURIComponent(route.path));
};

const handleSearchEnter = () => {
  show.value = true;
};

onMounted(() => {
  if (browser.value) {
    document.body.style.overflow = "auto";
  }
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
