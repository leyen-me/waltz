<template>
  <div
    class="px-4 h-20 fixed top-0 left-0 z-20 w-full flex items-center justify-between text-4xl font-logo xl:px-20 xl:h-28"
  >
    <div>
      <NuxtLink to="/">{{ appStore.siteConfig.title }}</NuxtLink>
    </div>
    <div>
      <div
        class="relative w-12 h-12 group cursor-pointer"
        @click="show = !show"
      >
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center transition duration-250 ease-in-out"
          :class="[show ? 'rotate-45' : 'rotate-0']"
        >
          <t-icon name="remove"></t-icon>
        </div>
        <div
          :class="show ? '-rotate-45' : 'rotate-0'"
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center transition duration-250 ease-in-out"
        >
          <t-icon name="remove"></t-icon>
        </div>
      </div>
    </div>
  </div>

  <Transition name="slide">
    <div
      v-show="show"
      :class="[show ? 'h-full' : 'h-0']"
      class="fixed bg-[var(--theme-bg-color-2)] top-0 left-0 z-10 w-full overflow-hidden"
    ></div>
  </Transition>
</template>

<script setup lang="ts">
import useAppStore from "~/stores/appStore";

const appStore = useAppStore();
const show = ref(false);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 500ms ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  height: 0;
}
</style>
