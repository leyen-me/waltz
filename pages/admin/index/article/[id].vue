<template>
  <div
    class="w-full mt-40 xl:mt-16"
    style="--web-vuepress-markdown-body-bg: var(--web-bg-2)"
  >
    <BaseEditor
      v-model="formData"
      @save="handleSubmitForm"
      @info="handleShowInfo"
      @upload="handleEditorUpload"
    ></BaseEditor>
  </div>

  <t-drawer
    v-model:visible="infoVisible"
    header="基本信息"
    class="v-md-editor-info-drawer"
    :confirmBtn="'保存'"
    :onConfirm="handleSubmitForm"
  >
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
      <t-form-item name="categoryId" label="分类">
        <t-select
          v-model="formData.categoryId"
          :options="categoryList"
          :keys="{ label: 'title', value: 'id' }"
          placeholder="请选择"
        />
      </t-form-item>
      <t-form-item name="tagIdList" label="标签">
        <t-select
          v-model="formData.tagIdList"
          :options="tagList"
          :keys="{ label: 'title', value: 'id' }"
          placeholder="请选择"
          multiple
        />
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
  </t-drawer>

  <!-- <div
    class="w-full"
    style="
      --td-comp-paddingLR-xl: 16px;
      --td-comp-paddingLR-l: 16px;
      --td-comp-paddingTB-m: 16px;
    "
  > -->
  <!-- <t-collapse defaultExpandAll>
      <t-collapse-panel header="基本信息">
        <div class="pb-4">
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
            <t-form-item name="categoryId" label="分类">
              <t-select
                v-model="formData.categoryId"
                :options="categoryList"
                :keys="{ label: 'title', value: 'id' }"
                placeholder="请选择"
              />
            </t-form-item>
            <t-form-item name="tagIdList" label="标签">
              <t-select
                v-model="formData.tagIdList"
                :options="tagList"
                :keys="{ label: 'title', value: 'id' }"
                placeholder="请选择"
                multiple
              />
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
        </div>
      </t-collapse-panel>
    </t-collapse> -->

  <!-- <div class="mt-16">
      <t-card
        style="background-color: var(--web-bg-2);"
      >
        
      </t-card>
    </div> -->
  <!-- </div> -->
</template>

<script setup lang="ts">
import {
  useAdminArticleInfoApi,
  useAdminArticleSubmitApi,
} from "@/api/admin/article";
import Cookies from "js-cookie";
import type { SubmitContext } from "tdesign-vue-next/es/form";
import useHasAuth from "@/utils/auth";
import useImageUrl from "@/utils/imageUrl";
import { useAdminTagListApi } from "~/api/admin/tag";
import { useAdminCategoryListApi } from "~/api/admin/category";
import type Category from "~/server/models/Category";
import type Tag from "~/server/models/Tag";
import type Article from "~/server/models/Article";

const route = useRoute();
const { NUXT_API_BASE } = useRuntimeConfig().public;
const uploadUrl =
  NUXT_API_BASE +
    "/api/admin/attachment/file?pid=1&Authorization=" +
    Cookies.get("token") || "";

const statusOptions = ref([
  { label: "草稿", value: "draft" },
  { label: "发布", value: "published" },
]);

const categoryList = ref<Category[]>([]);
const tagList = ref<Tag[]>([]);

const files = ref([]);
const form = ref(null);
const formData = ref<Article>({
  id: Number(route.params.id),
  title: "",
  cover: "",
  content: "",
  status: "",
  html: "",

  // @ts-ignore
  categoryId: "",

  // @ts-ignore
  tagIdList: [],
});
const formRules = ref({
  title: [{ required: true, message: "文章标题必填" }],
  categoryId: [{ required: true, message: "文章分类必填" }],
  cover: [{ required: true, message: "封面必填" }],
});

const handleSubmitForm = () => {
  // @ts-ignore
  form.value.submit();
};

const handleSave = async ({ validateResult, firstError }: SubmitContext) => {
  // @ts-ignore
  let html = window.document.querySelector(".v-md-editor-preview").outerHTML;
  formData.value.html = html;
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
      infoVisible.value = false;
    } catch (e) {
      MessagePlugin.error("保存失败");
    }
  } else {
    infoVisible.value = true
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
      url: useImageUrl("/" + item),
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
  formData.value.cover = "/" + data[0];
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

  // @ts-ignore
  formData.value.categoryId = "";
  // @ts-ignore
  formData.value.tagIdList = [];
};

const getData = async () => {
  if (formData.value.id) {
    const [_tagList, _categoryList, _article] = await Promise.all([
      useAdminTagListApi(),
      useAdminCategoryListApi(),
      useAdminArticleInfoApi(formData.value.id),
    ]);

    tagList.value = _tagList;
    categoryList.value = _categoryList;

    formData.value.title = _article.title;
    formData.value.cover = _article.cover;
    formData.value.content = _article.content;
    formData.value.status = _article.status;
    formData.value.categoryId = _article.categoryId;

    // @ts-ignore
    formData.value.tagIdList = _article.tagIdList
      ?.split(",")
      .map((id) => Number(id));
  } else {
    const [_tagList, _categoryList] = await Promise.all([
      useAdminTagListApi(),
      useAdminCategoryListApi(),
    ]);
    tagList.value = _tagList;
    categoryList.value = _categoryList;
    reset();
  }
};

// info
const infoVisible = ref(false);
const handleShowInfo = () => {
  infoVisible.value = true;
};

onBeforeRouteUpdate(() => {
  reset();
});

getData();
</script>
