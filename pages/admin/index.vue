<template>
    后台管理
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';

definePageMeta({
    middleware: 'auth'
})
// console.log(Cookies.get("token"));
</script>