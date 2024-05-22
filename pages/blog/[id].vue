<template>
  <ThemeDefaultDetail
    v-if="appStore.siteConfig.theme === 'Default'"
    :id="route.params.id as string"
  ></ThemeDefaultDetail>
</template>

<script setup lang="ts">
import useAppStore from "~/stores/appStore";

definePageMeta({
  middleware: "web-auth",
});

const route = useRoute();
const appStore = useAppStore();
</script>
