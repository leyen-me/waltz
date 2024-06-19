<template>
  <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-8">
    <div
      :class="k === 0 ? 'col-span-full' : ''"
      class="article-item p-4 bg-[var(--web-bg-2)] xl:p-10 cursor-pointer group rounded-md hover:bg-[var(--web-bg-7)] transition duration-300 ease-in-out"
      v-for="(v, k) in list"
      :key="v.id"
      @click="emits('click', v)"
    >
      <div class="w-full aspect-video overflow-hidden">
        <!-- <img
          class="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
          :src="useImageUrl(v.cover)"
        /> -->

        <div
          class="w-full h-full transition duration-300 ease-in-out group-hover:scale-110"
        >
          <t-image
            :src="useImageUrl(v.cover)"
            fit="cover"
            :style="{ width: '100%', height: '100%' }"
            :lazy="true"
          />
        </div>
      </div>
      <div class="text-[var(--web-color-7)] mt-10 flex">
        <span>{{ v.categoryTitle }}</span
        ><span class="mx-2" v-if="v.tagList">/</span
        ><span
          class="text-[var(--web-color-1)] w-0 flex-1 line-clamp-1 text-sm"
        >
          {{ v.tagList && String(v.tagList).split(",").join(" • ") }}
        </span>
      </div>
      <div class="mt-3 relative">
        <h2
          class="w-full text-[var(--web-color-7)] line-clamp-3 text-2xl transition duration-300 ease"
        >
          {{ v.title }}
        </h2>
      </div>
      <div class="mt-4 xl:mt-8 font-time flex justify-between items-center">
        <div>
          <p>Posted by {{ v.author }}</p>
          <p>
            {{
              v.publishedAtDetails
                ? v.publishedAtDetails.month.english +
                  " " +
                  v.publishedAtDetails.day +
                  "," +
                  v.publishedAtDetails.year
                : "未发布"
            }}
          </p>
        </div>
        <div
          class="text-[var(--web-color-7)] flex justify-between items-center"
        >
          <div
            data-hover="阅读"
            class="btn relative min-w-[80px] overflow-hidden"
          >
            <span
              class="font-bold px-4 py-2 transition duration-300 ease-in-out flex justify-center w-full"
            >
              阅读
            </span>
          </div>
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
