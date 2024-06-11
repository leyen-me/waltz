<template>
  <div
    class="w-full bg-[var(--web-bg-2)] relative flex flex-col pt-48 pb-4 px-10 mr-2 rounded-md"
  >
    <img
      :src="icon"
      :style="{
        width: iconSize + 'px',
        height: iconSize + 'px',
        top: iconTop + 'px',
      }"
      class="absolute top-0 right-0"
    />
    <span class="text-[var(--web-color-14)]">
      {{ title }}
    </span>
    <span class="font-logo text-[64px]">
      {{ num }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  iconTop: {
    type: Number,
    default: () => 0,
  },
  iconSize: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  num: {
    type: Number,
    required: true,
  },
});
</script>
