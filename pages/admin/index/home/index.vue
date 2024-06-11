<template>
  <div class="w-full h-full flex flex-col">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Item :icon="Home1" :iconSize="264" title="文章数" :num="54"></Item>
      <Item :icon="Home2" :iconSize="264" title="浏览数" :num="172"></Item>
      <Item :icon="Home3" :iconSize="284" title="用户数" :num="68"></Item>
      <Item :icon="Home4" :iconSize="264" title="评论数" :num="32"></Item>
    </div>
    <div class="mt-4 h-0 flex-1 flex flex-col md:flex-row">
        <LeftPanel :articleList="[120, 200, 150, 80, 70, 110, 130]"></LeftPanel>
        <RightPanel :list="[{value:10},{value:20},{value:30}]"></RightPanel>
    </div>
  </div>
</template>

<script setup>
import Item from "./item";
import Home1 from "@/assets/images/home_1.png";
import Home2 from "@/assets/images/home_2.png";
import Home3 from "@/assets/images/home_3.png";
import Home4 from "@/assets/images/home_4.png";
import LeftPanel from "./LeftPanel.vue";
import RightPanel from "./RightPanel.vue";
</script>
