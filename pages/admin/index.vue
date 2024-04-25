<template>
    <span>后台管理</span>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';

definePageMeta({
    middleware: 'auth'
})
// console.log(Cookies.get("token"));
</script>