<template>
  <div
    class="home relative w-full h-full bg-[var(--theme-bg-color-1)] text-[var(--theme-text-color-1)] pt-28"
  >
    <Header></Header>
    <div class="mx-auto p-4 xl:px-20 xl:pt-36 xl:max-w-screen-xl">
      <h3>Blog</h3>
      <h1 class="py-5 text-3xl xl:text-5xl">
        My Name is
        <span class="text-[var(--theme-text-color-2)]">{{
          (appStore.siteConfig.title as unknown as string)
            .charAt(0)
            .toUpperCase() + appStore.siteConfig.title.slice(1)
        }}</span>
      </h1>
      <p class="mt-4 text-xl opacity-80 tracking-wider">
        Here I will share insights, tips, and tutorials on website development
        and also thoughts on the latest trends and technologies in the field.
      </p>
    </div>

    <Follower></Follower>
  </div>
</template>

<script setup lang="ts">
import "./index.css";
import Header from "./header.vue";
import Follower from "./follower.vue";
import useAppStore from "~/stores/appStore";

const appStore = useAppStore();
</script>
