<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm">
            <IconLogo class="text-indigo-500"></IconLogo>
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
                登录您的账号</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
                <div>
                    <label for="email"
                        class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">账号</label>
                    <div class="mt-2">
                        <InputText class="w-full" type="text" v-model.trim="username" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password"
                            class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">密码</label>
                        <div class="text-sm">
                            <Button class="text-sm p-0" label="忘记密码?" link />
                        </div>
                    </div>
                    <div class="mt-2">
                        <InputText class="w-full" type="password" v-model.trim="password" toggleMask
                            @keydown="handleKeyDown" />
                    </div>
                </div>
                <div>
                    <Button label="登录" class="w-full" @click.prevent="handleLogin" />
                </div>
            </form>
            <p class="mt-10 text-sm text-gray-500 flex items-center justify-center">
                <span>没有账号?</span>
                <Button class="text-sm py-0 px-2" label="开始注册" link />
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import Cookies from 'js-cookie';
import { useAdminLoginApi } from '@/api/admin/auth';

const username = ref("")
const password = ref("")

const router = useRouter()

const handleLogin = async () => {
    try {
        const { token } = await useAdminLoginApi({
            username: username.value,
            password: password.value
        })
        // 存储
        Cookies.set("token", token)
        // 回到主页
        router.replace("/admin")
    } catch (error: any) { }
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        handleLogin()
    }
}
</script>
