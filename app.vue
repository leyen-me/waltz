<template>
  <NuxtLayout>
    <div class="w-full h-full bg-slate-200 dark:bg-[#242424]">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import useTheme from "@/utils/theme";
useTheme();
</script>
