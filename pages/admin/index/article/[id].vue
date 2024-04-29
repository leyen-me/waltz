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
          @upload="onCoverUploadSuccess"
          @error="onCoverUploadError"
          :auto="true"
          :fileLimit="1"
          chooseLabel="上传"
        />
        <Button class="ml-2" link @click="handlePreviewCover">预览</Button>
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
const uploadUrl =
  "/api/admin/attachment/?Authorization=" + Cookies.get("token") || "";

const formData = ref({
  id: Number(route.params.id),
  title: "",
  cover: "",
  content: "",
});

const handleSave = async () => {
  try {
    const res = await useAdminArticleSubmitApi(formData.value);
    if (typeof res === "number") {
      formData.value.id = res;
      await getData();

      const newPath = `/admin/article/${formData.value.id}`;
      history.pushState({}, "", newPath);
    }
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

const handleEditorUpload = async (event: any, insertImage: any, files: any) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }

  const { data, error } = await useFetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (error.value) {
    onCoverUploadError();
    return;
  }
  // @ts-ignore
  if (data.value?.code !== 200) {
    onCoverUploadError();
    return;
  }
  // @ts-ignore
  for (const item of data.value.data) {
    insertImage({
      url: item,
      desc: "七龙珠",
    });
  }
};

const handlePreviewCover = () => {
  window.open(formData.value.cover);
};

const onCoverUploadSuccess = (e: any) => {
  if (!e.xhr.response) {
    onCoverUploadError();
    return;
  }
  try {
    const response = JSON.parse(e.xhr.response);
    if (response.code !== 200) {
      onCoverUploadError();
      return;
    }
    formData.value.cover = response.data[0];
  } catch (e2) {
    onCoverUploadError();
    return;
  }

  toast.add({
    severity: "success",
    summary: "成功",
    detail: "文件上传成功",
    life: 3000,
  });
};
const onCoverUploadError = () => {
  toast.add({
    severity: "error",
    summary: "错误",
    detail: "文件上传失败",
    life: 3000,
  });
};

const reset = () => {
  formData.value.id = 0;
  formData.value.title = "";
  formData.value.cover = "";
  formData.value.content = "";
};

const getData = async () => {
  if (formData.value.id) {
    const { title, cover, content, authorId } = await useAdminArticleInfoApi(
      formData.value.id
    );
    formData.value.title = title;
    formData.value.cover = cover;
    formData.value.content = content;
  } else {
    reset();
  }
};

onBeforeRouteUpdate(() => {
  reset();
});

getData();
</script>
