<template>
  <div class="w-full h-full flex flex-col">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Item
        :icon="Home1"
        :iconSize="264"
        title="文章数"
        :num="statistical.articleCount"
      ></Item>
      <Item
        :icon="Home2"
        :iconSize="264"
        title="浏览数"
        :num="statistical.viewsCount"
      ></Item>
      <Item
        :icon="Home3"
        :iconSize="284"
        title="用户数"
        :num="statistical.userCount"
      ></Item>
      <Item
        :icon="Home4"
        :iconSize="264"
        title="评论数"
        :num="statistical.commentCount"
      ></Item>
    </div>
    <div class="mt-4 h-0 flex-1 flex flex-col md:flex-row">
      <LeftPanel
        :articleList="statistical.yearList"
      ></LeftPanel>
      <RightPanel
        :list="statistical.categoryList"
      ></RightPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useAdminDashboardBasicApi,
  useAdminDashboardYearApi,
  useAdminDashboardCategoryApi
} from "@/api/admin/dashboard";
import Item from "./item";
import Home1 from "@/assets/images/home_1.png";
import Home2 from "@/assets/images/home_2.png";
import Home3 from "@/assets/images/home_3.png";
import Home4 from "@/assets/images/home_4.png";
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";

const statistical = ref({
  articleCount: 0,
  commentCount: 0,
  userCount: 0,
  viewsCount: 0,
  yearList: [],
  categoryList: [],
});

const getData = async () => {
  try {
    const [_baise, _year, _category] = await Promise.all([
      useAdminDashboardBasicApi(),
      useAdminDashboardYearApi(),
      useAdminDashboardCategoryApi(),
    ]);
    statistical.value.articleCount = _baise.articleCount;
    statistical.value.commentCount = _baise.commentCount;
    statistical.value.userCount = _baise.userCount;
    statistical.value.viewsCount = _baise.viewsCount;
    statistical.value.yearList = _year
    statistical.value.categoryList = _category
  } catch (error) {}
};

getData();
</script>
