<template>
  <div>
    <t-card title="基本信息">
      <template #actions>
        <t-button @click="handleSubmitForm" :disabled="!useHasAuth('article:save')">保存</t-button>
      </template>
      <t-form
        ref="form"
        :data="formData"
        :rules="formRules"
        :colon="true"
        :label-align="'top'"
        @submit="handleSave"
      >
        <t-form-item name="title" label="文章标题">
          <t-input
            v-model="formData.title"
            clearable
            placeholder="请输入文章标题"
          >
          </t-input>
        </t-form-item>
        <t-form-item name="cover" label="文章封面">
          <t-input
            v-model="formData.cover"
            clearable
            placeholder="请输入文章封面"
          >
          </t-input>
          <div class="ml-2">
            <t-upload
              name="files"
              v-model="files"
              :action="uploadUrl"
              :abridge-name="[8, 6]"
              :multiple="false"
              theme="custom"
              :showImageFileName="false"
              placeholder="未选择文件"
              :disabled="!useHasAuth('attachment:save')"
              @success="onCoverUploadSuccess"
              @fail="onCoverUploadError"
            ></t-upload>
          </div>
        </t-form-item>
        <t-form-item name="status" label="文章状态">
          <t-radio-group variant="default-filled" v-model="formData.status">
            <t-radio-button
              :value="v.value"
              v-for="(v, k) in statusOptions"
              :key="v.value"
              >{{ v.label }}</t-radio-button
            >
          </t-radio-group>
        </t-form-item>
      </t-form>
    </t-card>
    <div class="mt-4">
      <t-card title="文章内容">
        <BaseEditor
          v-model="formData"
          @save="handleSubmitForm"
          @upload="handleEditorUpload"
        ></BaseEditor>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useAdminArticleInfoApi,
  useAdminArticleSubmitApi,
} from "@/api/admin/article";
import Cookies from "js-cookie";
import type { SubmitContext } from "tdesign-vue-next/es/form";
import useHasAuth from "@/utils/auth"

const route = useRoute();
const uploadUrl =
  "/api/admin/attachment/?Authorization=" + Cookies.get("token") || "";

const statusOptions = ref([
  { label: "草稿", value: "draft" },
  { label: "发布", value: "published" },
]);

const files = ref([]);
const form = ref(null);
const formData = ref({
  id: Number(route.params.id),
  title: "",
  cover: "",
  content: "",
  status: "",
});
const formRules = ref({
  title: [{ required: true, message: "文章标题必填" }],
  cover: [{ required: true, message: "封面必填" }],
});

const handleSubmitForm = () => {
  // @ts-ignore
  form.value.submit();
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  if (validateResult === true) {
    try {
      const res = await useAdminArticleSubmitApi(formData.value);
      if (typeof res === "number") {
        formData.value.id = res;
        await getData();

        const newPath = `/admin/article/${formData.value.id}`;
        history.replaceState({}, "", newPath);
      }
      MessagePlugin.success("保存成功");
    } catch (e) {
      MessagePlugin.error("保存失败");
    }
  } else {
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
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
      desc: "",
    });
  }
};

const onCoverUploadSuccess = (e: any) => {
  const { code, msg, data } = e.response;
  if (code !== 200) {
    MessagePlugin.error(msg);
    return;
  }
  formData.value.cover = data[0];
  MessagePlugin.success("文件上传成功");
};
const onCoverUploadError = () => {
  MessagePlugin.error("文件上传失败");
};

const reset = () => {
  formData.value.id = 0;
  formData.value.title = "";
  formData.value.cover = "";
  formData.value.content = "";
  formData.value.status = statusOptions.value[0].value;
};

const getData = async () => {
  if (formData.value.id) {
    const { title, cover, content, authorId, status } =
      await useAdminArticleInfoApi(formData.value.id);
    formData.value.title = title;
    formData.value.cover = cover;
    formData.value.content = content;
    formData.value.status = status;
  } else {
    reset();
  }
};

onBeforeRouteUpdate(() => {
  reset();
});

getData();
</script>
