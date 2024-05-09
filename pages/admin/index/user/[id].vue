<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
        <template #actions>
          <t-button @click="handleSubmitForm">保存</t-button>
        </template>
        <t-form
          ref="form"
          :data="formData"
          :rules="formRules"
          :colon="true"
          :label-align="'top'"
          @submit="handleSave"
        >
          <t-form-item name="avatar" label="头像">
            <t-upload
              name="files"
              v-model="files"
              :action="uploadUrl"
              :abridge-name="[8, 6]"
              :multiple="false"
              theme="image"
              :showImageFileName="false"
              placeholder="未选择文件"
              @success="onUploadSuccess"
              @fail="onUploadError"
              @remove="onUploadRemove"
            ></t-upload>
          </t-form-item>
          <t-form-item name="username" label="名称">
            <t-input v-model="formData.username" clearable> </t-input>
          </t-form-item>
          <t-form-item name="password" label="密码">
            <t-input v-model="formData.password" clearable> </t-input>
          </t-form-item>
          <t-form-item name="gender" label="性别">
            <t-radio-group variant="default-filled" v-model="formData.gender">
              <t-radio-button value="men">男</t-radio-button>
              <t-radio-button value="women">女</t-radio-button>
              <t-radio-button value="secret">未知</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item name="email" label="邮箱">
            <t-input v-model="formData.email" clearable></t-input>
          </t-form-item>
          <t-form-item name="introduction" label="简介">
            <t-textarea v-model="formData.introduction"></t-textarea>
          </t-form-item>
          <t-form-item name="superAdmin" label="超管" v-if="!info">
            <t-radio-group
              variant="default-filled"
              v-model="formData.superAdmin"
            >
              <t-radio-button :value="1">是</t-radio-button>
              <t-radio-button :value="0">否</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item name="status" label="状态" v-if="!info">
            <t-radio-group variant="default-filled" v-model="formData.status">
              <t-radio-button :value="0">正常</t-radio-button>
              <t-radio-button :value="1">停用</t-radio-button>
            </t-radio-group>
          </t-form-item>
          <t-form-item name="roleIdList" label="角色" v-if="!info">
            <t-select
              v-model="formData.roleIdList"
              :options="roleList"
              :keys="{ label: 'roleDesc', value: 'id' }"
              placeholder="请选择"
              multiple
            />
          </t-form-item>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SubmitContext } from "tdesign-vue-next/es/form";
import Cookies from "js-cookie";
import {
  useAdminUserFindOneApi,
  useAdminUserInfoApi,
  useAdminUserSubmitApi,
} from "@/api/admin/user";
import { useAdminRoleListApi } from "@/api/admin/role";
import type Role from "@/server/models/Role";

const route = useRoute();
const router = useRouter();
const info = ref(false);

const files = ref([]);
const uploadUrl =
  "/api/admin/attachment/?Authorization=" + Cookies.get("token") || "";

const onUploadSuccess = (e: any) => {
  const { code, msg, data } = e.response;
  if (code !== 200) {
    MessagePlugin.error(msg);
    return;
  }
  formData.value.avatar = data[0];
  MessagePlugin.success("文件上传成功");
};
const onUploadError = () => {
  MessagePlugin.error("文件上传失败");
};

const onUploadRemove = () => {
  files.value = [];
  formData.value.avatar = "";
};

const roleList: Ref<Role[]> = ref([]);
const getRoleList = async () => {
  const data = await useAdminRoleListApi();
  roleList.value = data;
};

info.value = route.params.id === "info";

const formData = ref<{
  id: number;
  username: string;
  password: string;
  avatar: string;
  gender: string;
  email: string;
  introduction: string;
  superAdmin: number;
  status: number;
  roleIdList: number[];
}>({
  id: (route.params.id !== "info"
    ? Number(route.params.id)
    : route.params.id) as number,
  username: "",
  password: "",
  avatar: "",
  gender: "men",
  email: "",
  introduction: "",
  superAdmin: 1,
  status: 0,
  roleIdList: [],
});
const form = ref(null);
const formRules = ref({
  username: [{ required: true, message: "名称必填" }],
});

const getData = async () => {
  if (formData.value.id) {
    const call = info.value ? useAdminUserInfoApi : useAdminUserFindOneApi;
    const {
      id,
      username,
      avatar,
      gender,
      email,
      introduction,
      superAdmin,
      status,
      roleIdList,
    } = await call(formData.value.id);
    formData.value.id = id as number;
    formData.value.username = username;
    formData.value.avatar = avatar;
    formData.value.gender = gender;
    formData.value.email = email;
    formData.value.introduction = introduction;
    formData.value.superAdmin = superAdmin;
    formData.value.status = status;
    formData.value.roleIdList = roleIdList as number[];
    if (formData.value.avatar) {
      // @ts-ignore
      files.value.push({
        name: "FileName",
        url: formData.value.avatar,
      });
    }
  }
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminUserSubmitApi(formData.value);
      MessagePlugin.success("保存成功");
      !info.value && router.back();
    } catch (error: any) {
      MessagePlugin.error("保存失败");
    }
  } else {
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
  }
};

const handleSubmitForm = () => {
  // @ts-ignore
  form.value.submit();
};

getRoleList();
getData();
</script>
