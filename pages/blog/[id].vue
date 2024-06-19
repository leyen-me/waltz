<template>
  <ThemeDefaultDetail
    v-if="theme === 'Default'"
    :article
    :articleAdjacent
    :commentPage
    :commentLimit
    :commentTotal
    :commentTotalPages
    :commentList
    @loadMoreComment="handleLoadMoreComment"
  ></ThemeDefaultDetail>
</template>

<script setup lang="ts">
import useAppStore from "~/stores/appStore";
import { buildMap, getValue } from "~/common/utils/siteConfigUtil";
import { CONFIG_KEY } from "~/common/constants";
import useUserStore from "~/stores/userStore";
import { defaultRowsPerPageOptions } from "~/constants";
import { useWebCommentArticlePageApi } from "~/api/web/comment";

const token = useCookie("token", {
  default: () => "",
  watch: false,
});

const route = useRoute();
const id = Number(route.params.id);

const appStore = useAppStore();
const userStore = useUserStore();

const article = ref(null);
const articleAdjacent = ref(null);

// 此处逻辑应和web-auth中间件相同
const { data: configRes } = await useFetch(`/api/web/site/config/list`);
const configMap = buildMap(configRes.value?.data);
appStore.siteConfig = configMap;

// 获取用户信息
const { data: userInfoRes } = await useFetch(`/api/admin/user/info`, {
  headers: {
    "Content-Type": "application/json",
    Authorization: token.value,
  },
});
if (userInfoRes.value?.data) {
  userStore.user.id = userInfoRes.value?.data.id;
}

// 获取文章信息
const { data: articleRes } = await useFetch(`/api/web/article/${id}`);
article.value = articleRes.value.data;

// 获取上一篇，下一篇
const { data: articleAdjacentRes } = await useFetch(
  `/api/web/article/adjacent?id=${id}&categoryId=${article.value.categoryId}`
);
articleAdjacent.value = articleAdjacentRes.value.data;

const theme = computed(() => {
  return getValue(appStore.siteConfig, CONFIG_KEY.SITE.THEME);
});

// 评论
const isShowComment = ref(
  getValue(appStore.siteConfig, CONFIG_KEY.SITE.COMMENT)
);

const commentList = ref<Comment[]>([]);

const commentLoading = ref(false);
const commentPage = ref(1);
const commentLimit = ref(defaultRowsPerPageOptions[0]);

const commentTotal = ref(0);
const commentTotalPages = ref(0);

const getComment = async () => {
  try {
    commentLoading.value = true;
    const _data = await useWebCommentArticlePageApi({
      articleId: article.value.id,
      page: commentPage.value,
      limit: commentLimit.value,
    });

    _data.data.map((item) => {
      // @ts-ignore
      item._page = 0;
      item._limit = defaultRowsPerPageOptions[0];
      item._total = 0;
      item._total_page = 0;
      item.children = [];
      commentList.value.push(item);
      return item;
    });

    commentTotal.value = _data.meta.totalItems;
    commentTotalPages.value = _data.meta.totalPages;
  } catch {
    commentPage.value -= 1;
  } finally {
    commentLoading.value = false;
  }
};

const handleLoadMoreComment = () => {
  commentPage.value += 1;
  getComment();
};

if (isShowComment.value) {
  const { data: commentRes } = await useFetch(
    `/api/web/comment/article/page?page=${commentPage.value}&limit=${commentLimit.value}&articleId=${article.value.id}`
  );
  commentRes.value.data.data.map((item) => {
    // @ts-ignore
    item._page = 0;
    item._limit = defaultRowsPerPageOptions[0];
    item._total = 0;
    item._total_page = 0;
    item.children = [];
    commentList.value.push(item);
    return item;
  });

  commentTotal.value = commentRes.value.data?.meta.totalItems;
  commentTotalPages.value = commentRes.value.data?.meta.totalPages;
}
</script>
