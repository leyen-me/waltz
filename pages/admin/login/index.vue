<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-900">
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
                        <input v-model.trim="username" autocomplete="email" required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white dark:bg-white/5 dark:ring-white/10" />
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password"
                            class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">密码</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">忘记密码?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input v-model.trim="password" autocomplete="current-password" required="true"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white dark:bg-white/5 dark:ring-white/10" />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        @click.prevent="handleLogin">登录</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                没有账号?
                {{ ' ' }}
                <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">开始注册</a>
            </p>
        </div>
    </div>

    <!-- 
            <p class="mt-10 text-center text-sm text-gray-400">
                没有账号?
                {{ ' ' }}
                <a href="#" class="font-semibold leading-6 text-indigo-400 hover:text-indigo-300">开始注册</a>
            </p>
        </div>
    </div> -->

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
    } catch (error: any) {
        alert(error.message)
    }
}
</script>
