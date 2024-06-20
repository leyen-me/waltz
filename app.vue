<template>
  <NuxtLayout>
    <div class="w-full h-full">
      <BaseLoadingIndicator v-if="!showLoading" />

      <!-- 在这里 -->
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import "@/utils/banner";
import BaseLoadingIndicator from "@/components/BaseLoadingIndicator";

const route = useRoute();

// 二级以上路由不显示
const showLoading = computed(() => {
  if (!route.name) {
    return true;
  }
  const routeName = route.name?.toString() as string;
  return routeName.startsWith("admin") || routeName.startsWith("app");
});

onMounted(() => {
  document.documentElement.setAttribute("theme-mode", "dark");
});
</script>
