<template>
    <ul class="grid grid-cols-1 gap-2 mt-8 xl:grid-cols-2 xl:gap-6 xl:mt-16">
        <li v-for="v, k in list" class="mb-8 cursor-pointer" >
            <div class="w-full aspect-square overflow-hidden">
                <img class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
                    src="https://images.unsplash.com/photo-1706914890322-336df4374736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <div class="p-2 xl:p-4">
                <h2 class="mt-3 font-bold text-2xl flex">
                    <span class="line-clamp-1">冰川融化</span>
                    <span class="ml-2">#009</span>
                    <span class="inline-block align-middle">
                        <IconRtArrow></IconRtArrow>
                    </span>
                </h2>
                <p class="mt-1 opacity-65 line-clamp-3">
                    莫言表示：“虽然我也会时不时地刷短视频，但每次刷完后都会自我反省，问自己为什么又浪费了一小时，而且大部分时间都在看无聊的东西。因此，短视频只是一个阶段性的现象。相比之下，阅读才是我们业余时间中最值得，也是最应该做的
                </p>
                <span class="font-time mt-1 opacity-65 text-sm">
                    January 1,2022
                </span>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useAdminArticlePageApi } from "@/api/admin/article"

const list = ref([])
const getData = async () => {
    const { data, meta } = await useAdminArticlePageApi()
    list.value = data
}

getData()
</script>