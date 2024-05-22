<template>
  <div class="w-full" style="border-top: solid 1px rgba(255, 255, 255, 0.14)">
    <div
      class="mx-auto p-4 py-16 xl:px-20 xl:max-w-screen-xl flex justify-between items-center"
    >
      <p>Copyright © {{ new Date().getFullYear() }} {{ title }}.</p>
      <p>Privacy policy</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
