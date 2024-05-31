<template>
  <NuxtLayout>
    <div class="w-full h-full">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import "@/utils/banner"

onMounted(() => {
  document.documentElement.setAttribute("theme-mode", "dark");
});
</script>
