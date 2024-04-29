<template>
  <div>
    <div class="flex flex-col xl:flex-row xl:items-center">
      <span class="text-sm">文章标题：</span>
      <InputText
        class="mt-1 xl:mt-0"
        type="text"
        v-model="formData.title"
        placeholder="文章标题"
      />
    </div>
    <div class="mt-2 flex flex-col xl:flex-row xl:items-center">
      <span class="text-sm">文章封面：</span>
      <InputText
        class="mt-1 xl:mt-0"
        type="text"
        v-model="formData.cover"
        placeholder="文章封面"
      />
      <div class="flex mt-2 xl:mt-0">
        <FileUpload
          class="xl:ml-2"
          mode="basic"
          name="files"
          :url="uploadUrl"
          accept="image/*"
          :maxFileSize="1000000"
          @upload="onCoverUpload"
          @error="onCoverUploadError"
          @success="onCoverUploadSuccess"
          :auto="true"
          chooseLabel="上传"
        />
        <Button class="ml-2">预览</Button>
      </div>
    </div>
    <div class="mt-2">
      <BaseEditor
        v-model="formData"
        @save="handleSave"
        @upload="handleEditorUpload"
      ></BaseEditor>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useAdminArticleInfoApi,
  useAdminArticleSubmitApi,
} from "@/api/admin/article";
import Cookies from "js-cookie";

const route = useRoute();
const nuxtApp = useNuxtApp();
const toast = nuxtApp.vueApp.config.globalProperties.$toast;
const uploadUrl = "/api/admin/attachment?token=" + Cookies.get("token") || "";

const formData = ref({
  id: Number(route.params.id),
  title: "",
  cover: "",
  content: "",
});

const handleSave = async () => {
  try {
    await useAdminArticleSubmitApi(formData.value);
    toast.add({
      severity: "success",
      summary: "成功",
      detail: "保存成功",
      life: 3000,
    });
  } catch (e) {
    toast.add({
      severity: "error",
      summary: "错误",
      detail: "保存失败",
      life: 3000,
    });
  }
};

const handleEditorUpload = (event: any, insertImage: any, files: any) => {
  console.log(files);
};

const onCoverUpload = (e: any) => {
  console.log(e);
};
const onCoverUploadSuccess = (e: any) => {
  toast.add({
    severity: "success",
    summary: "成功",
    detail: "文件上传成功",
    life: 3000,
  });
};
const onCoverUploadError = (e: any) => {
  toast.add({
    severity: "error",
    summary: "错误",
    detail: "文件上传失败",
    life: 3000,
  });
};

const getData = async () => {
  if (formData.value.id) {
    const { title, cover, content } = await useAdminArticleInfoApi(
      formData.value.id
    );
    formData.value.title = title;
    formData.value.cover = cover;
    formData.value.content = content;
  } else {
    formData.value.title = "";
    formData.value.cover = "";
    formData.value.content = "";
  }
};

onBeforeRouteUpdate(() => {
  formData.value.id = 0;
  formData.value.title = "";
  formData.value.cover = "";
  formData.value.content = "";
});

getData();
</script>
