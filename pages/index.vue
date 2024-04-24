<template>
    <div class="w-full p-5 xl:w-2/5 xl:m-auto xl:mt-20">
        <BaseHeader></BaseHeader>
        <ul class="grid grid-cols-1 gap-2 mt-8 xl:grid-cols-2 xl:gap-6 xl:mt-16">
            <li v-for="v, k in list" class="mb-8 cursor-pointer" @click="handleDetail(v)">
                <div class="w-full aspect-square overflow-hidden">
                    <img class="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
                        :src="v.src" />
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
    </div>
</template>


<script setup lang="ts">
// const { data: count } = await useFetch('/api/admin/count')
const router = useRouter()

const list = ref([
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1706914890322-336df4374736?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1709777083341-2ebb9f0772cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1713727967827-b04e5eab7d3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D"
    }
])
const handleDetail = (v: any) => {
    router.push(`/blog/${v.id}`)
}

// 请不要删除或改动下方代码
console.log("welcome to home 002");
</script>