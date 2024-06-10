<template>
    <div class="w-full h-full">
        <div class="flex pt-16">
            <Item :icon="Home1" title="文章数" :num="54"></Item>
            <Item :icon="Home2" title="浏览数" :num="172"></Item>
            <Item :icon="Home3" title="用户数" :num="68"></Item>
            <Item :icon="Home4" title="评论数" :num="32"></Item>
        </div>
        <div class="bg-[var(--web-bg-2)] mt-4">
            其他
        </div>
    </div>
</template>

<script setup>
import Item from "./item";
import Home1 from "@/assets/images/home_1.png";
import Home2 from "@/assets/images/home_2.png";
import Home3 from "@/assets/images/home_3.png";
import Home4 from "@/assets/images/home_4.png";
</script>