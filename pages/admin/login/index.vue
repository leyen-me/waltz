<template>
    <div class="w-full h-full flex flex-col justify-center items-center">
        <input class="bg-[#2e2e2e] p-2 px-3 xl:px-4" type="text" v-model="username" placeholder="账号">
        <input class="bg-[#2e2e2e] mt-2 p-2 px-3 xl:px-4" type="password" v-model="password" placeholder="密码">
        <button class="p-2.5 px-6 mt-2 bg-black" @click="handleLogin">登录</button>
    </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';
const username = ref("LEYEN")
const password = ref("123456")

const router = useRouter()

const handleLogin = async () => {
    const data = await useFetch('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const message = data.error.value && data.error.value.data.message
    if (message) {
        alert(message)
        return
    }
    const { token } = data.data.value

    // 存储
    Cookies.set("token", token)
    // 回到主页
    router.replace("/admin")
}
// login.post.ts
</script>
