<template>
  <div
    class="flex h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8"
    style="
      background-image: url(/login_bg.svg);
      background-repeat: space;
      background-size: 32%;
    "
  >
    <t-card title="注册">
      <div
        class="flex flex-col justify-center items-center sm:mx-auto sm:w-full sm:max-w-sm"
      >
        <BaseLogo></BaseLogo>
        <h2
          class="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-white"
        >
          注册您的账号
        </h2>
      </div>

      <div class="w-80 mx-auto mt-4">
        <t-form
          ref="form"
          :data="formData"
          :rules="formRules"
          :colon="true"
          :label-align="'top'"
          @submit="handleRegister"
        >
          <t-form-item name="username" label="账户">
            <t-input
              v-model="formData.username"
              clearable
              size="large"
              placeholder="请输入账户名"
            >
              <template #prefix-icon>
                <desktop-icon />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item name="password" label="密码">
            <t-input
              v-model="formData.password"
              type="password"
              size="large"
              clearable
              placeholder="请输入密码"
            >
              <template #prefix-icon>
                <lock-on-icon />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item name="rePassword" label="重复密码">
            <t-input
              v-model="formData.rePassword"
              type="password"
              size="large"
              clearable
              placeholder="请重新输入密码"
            >
              <template #prefix-icon>
                <lock-on-icon />
              </template>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-button
              theme="primary"
              type="submit"
              block
              style="margin-bottom: 20px"
              size="large"
              >注册</t-button
            >
          </t-form-item>
          <t-form-item>
            <span class="w-full flex"
              >已经有账号？去<NuxtLink
                class="text-[var(--web-color-7)]"
                :to="'/admin/login'"
                >登录</NuxtLink
              >
            </span>
          </t-form-item>
        </t-form>
      </div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { DesktopIcon, LockOnIcon } from "tdesign-icons-vue-next";
import { useAdminRegisterApi } from "@/api/admin/auth";
import type { SubmitContext } from "tdesign-vue-next/es/form";

const route = useRoute();
const router = useRouter();

const formData = ref({
  username: "",
  password: "",
  rePassword: "",
});

const rePassword = (val: any) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(formData.value.password === val);
      clearTimeout(timer);
    });
  });
const formRules = ref({
  username: [{ required: true, message: "账号必填" }],
  password: [{ required: true, message: "密码必填" }],
  rePassword: [
    { required: true, message: "密码必填" },
    { validator: rePassword, message: "两次密码不一致" },
  ],
});

const handleRegister = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      await useAdminRegisterApi(formData.value);
      router.replace(
        ("/admin/login?redirect=" + route.query.redirect) as string
      );
    } catch (error: any) {}
  } else {
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
  }
};
</script>
