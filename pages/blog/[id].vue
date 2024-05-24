<template>
  <ThemeDefaultDetail
    v-if="appStore.siteConfig.theme === 'Default'"
    :id
  ></ThemeDefaultDetail>
</template>

<script setup lang="ts">
import useAppStore from "~/stores/appStore";

definePageMeta({
  middleware: "web-auth",
});

const route = useRoute();
const id = Number(route.params.id);
const appStore = useAppStore();
</script>
