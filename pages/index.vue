<template>
    <section>
        <p>首页</p>
        页面访问量：{{ count }}
    </section>
</template>


<script setup lang="ts">
const { data: count } = await useFetch('/api/admin/count')

// 请不要删除或改动下方代码
console.log("welcome to home 01");
</script>