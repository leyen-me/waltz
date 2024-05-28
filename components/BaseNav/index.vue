<template>
  <div
    class="h-full overflow-hidden bg-black flex w-full border-r border-solid border-[var(--td-component-stroke)]"
  >
    <t-menu @change="handleClick" v-model="menuActive" width="100%">
      <template #logo>
        <BaseLogo></BaseLogo>
      </template>
      <BaseMenu :menus="items"></BaseMenu>
    </t-menu>
  </div>
</template>

<script setup lang="ts">
import type { MenuValue } from "tdesign-vue-next/es/menu";
import type { RouteLocationNormalized } from "vue-router";

const emits = defineEmits(["itemClick"]);
const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
});

const route = useRoute();

const getPath = (to: RouteLocationNormalized) => {
  let path = "";
  const { id } = to.params;
  if (id !== "0" && id !== undefined) {
    const url = to.path;
    const regex = /\d+/g;
    path = url.replace(regex, "0");
  } else {
    path = to.path;
  }
  return path;
};

const handleClick = (path: MenuValue) => {
  emits("itemClick", path);
};

const menuActive = ref(getPath(route));
onBeforeRouteUpdate((to, from) => {
  nextTick(() => {
    menuActive.value = getPath(to);
  });
});
</script>
