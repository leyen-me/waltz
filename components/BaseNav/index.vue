<template>
  <div
    class="h-full overflow-hidden bg-black flex w-full border-r border-solid border-[var(--td-component-stroke)]"
  >
    <t-menu @change="handleClick" v-model="menuActive" width="100%">
      <template #logo>
        <BaseLogo></BaseLogo>
      </template>
      <BaseMenu :menus="items" @click="(e) => emits('itemClick', e)"></BaseMenu>
    </t-menu>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";

const emits = defineEmits(["itemClick"]);
const props = defineProps({
  items: {
    type: Array<any>,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();

/**active menu */
const getPath = (to: RouteLocationNormalized) => {
  let path = "";
  const { id } = to.params;
  if (id !== "0" && id !== undefined) {
    const url = to.path;
    const regex = /\d+/g;
    path = url.replace(regex, "0");
    console.log(id);
  } else {
    path = to.path;
  }
  return path;
};

const menuActive = ref(getPath(route));

onBeforeRouteUpdate((to, from) => {
  nextTick(() => {
    menuActive.value = getPath(to);
  });
});
/**active menu */

const handleClick = (path: any) => {
  emits("itemClick", path);
};
</script>
