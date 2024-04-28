<template>
    <ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        <li v-for="v, k in list" class="w-full cursor-pointer flex relative p-4">
            <!-- cover -->
            <div class="w-full h-full overflow-hidden rounded-md absolute top-0 left-0 z-0">
                <img class="w-full h-auto object-cover transition duration-300 ease-in-out hover:scale-110"
                    src="https://images.unsplash.com/photo-1706914890322-336df4374736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D" />
            </div>
            <!-- mask -->
            <div
                class="w-full h-full overflow-hidden rounded-md absolute top-0 left-0 z-[1] bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]">
            </div>
            <!-- content -->
            <div class="flex-1 w-0 flex flex-col justify-center z-20 text-white">
                <div class="flex justify-between items-center">
                    <h2 class="font-bold text-xl flex flex-1 w-0 leading-[1] p-0 m-0">
                        <span class="line-clamp-1">冰川融化</span>
                    </h2>
                    <span class="font-time opacity-65 text-sm ml-24">
                        January 1,2022
                    </span>
                </div>
                <div class="mt-8 flex items-center">
                    <p class="line-clamp-2 flex-1 w-0 opacity-65 m-0">
                        莫言表示：“虽然我也会时不时地刷短视频莫言表示：“虽然我也会时不时地刷短视频莫言表示：“虽然我也会时不时地刷短视频莫言表示：“虽然我也会时不时地刷短视频<br />
                    </p>
                    <div class="ml-24">
                        <Button @click="$router.push(`/admin/article/${v.id}`)">编辑</Button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { useAdminArticlePageApi } from "@/api/admin/article"
import type Article from "@/server/models/Article"

const list = ref<Article[]>([])
const getData = async () => {
    const { data, meta } = await useAdminArticlePageApi()
    list.value = list.value.concat(data)
    list.value = list.value.concat(data)
    list.value = list.value.concat(data)
    list.value = list.value.concat(data)
}

getData()
</script>