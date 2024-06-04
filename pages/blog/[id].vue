<template>
  <ThemeDefaultDetail
    v-if="theme === 'Default'"
    :id
  ></ThemeDefaultDetail>
</template>

<script setup lang="ts">
import useAppStore from "~/stores/appStore";
import { getValue } from "~/common/utils/siteConfigUtil";
import { CONFIG_KEY } from "~/common/constants";

definePageMeta({
  middleware: "web-auth",
});

const theme = computed(() => {
  return getValue(appStore.siteConfig, CONFIG_KEY.SITE.THEME);
});

const route = useRoute();
const id = Number(route.params.id);
const appStore = useAppStore();
</script>

<style scoped>
v-deep(.vuepress-markdown-body){
  width: 100% !important;
}
</style>