<template>
  <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-8">
    <div
      :class="k === 0 ? 'col-span-full' : ''"
      class="p-4 bg-[var(--web-bg-2)] xl:p-10"
      v-for="(v, k) in list"
      :key="v.id"
    >
      <div class="w-full aspect-video overflow-hidden">
        <img
          @click="emits('click', v)"
          class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
          :src="useImageUrl(v.cover)"
        />
      </div>
      <div class="text-[var(--web-color-7)] mt-10 flex">
        <span>{{ v.categoryTitle }}</span
        ><span class="mx-2" v-if="v.tagList">/</span
        ><span class="text-[var(--web-color-1)] w-0 flex-1 line-clamp-1 text-sm">
          {{ v.tagList && String(v.tagList).split(",").join(" • ") }}
        </span>
      </div>
      <div class="mt-3 relative">
        <h2
          @click="emits('click', v)"
          class="w-full text-[var(--web-color-7)] line-clamp-3 text-2xl hover:text-[var(--web-color-8)] transition duration-300 ease cursor-pointer"
        >
          {{ v.title }}
        </h2>
      </div>
      <div class="mt-4 xl:mt-8 font-time flex justify-between items-center">
        <div>
          <p>Posted by {{ v.author }}</p>
          <p>
            {{
              v.publishedAtDetails.month.english +
              " " +
              v.publishedAtDetails.day +
              "," +
              v.publishedAtDetails.year
            }}
          </p>
        </div>
        <div
          class="text-[var(--web-color-7)] flex justify-between items-center"
        >
          <div
            data-hover="阅读"
            class="btn relative min-w-[80px] overflow-hidden cursor-pointer"
            @click="emits('click', v)"
          >
            <span
              class="font-bold px-4 py-2 transition duration-300 ease-in-out flex justify-center w-full"
            >
              阅读
            </span>
          </div>
          <IconRtArrow2></IconRtArrow2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Article from "~/server/models/Article";
import useImageUrl from "@/utils/imageUrl";

const emits = defineEmits(["click"]);
const props = defineProps({
  list: {
    type: Array<Article>,
    required: true,
  },
});
</script>

<style scoped>
.btn:before {
  @apply absolute top-0 left-0 font-bold px-4 py-2 opacity-0 transition duration-300 ease-in-out flex justify-center w-full;
  content: attr(data-hover);
  transform: translate(0, -100%);
}

.btn:hover span {
  @apply opacity-0 translate-y-full;
}

.btn:hover:before {
  @apply opacity-100 translate-y-0;
}
</style>
