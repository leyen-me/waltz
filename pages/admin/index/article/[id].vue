<template>
  <div
    class="m-editor-wrap w-full mt-40 lg:mt-28"
    style="--web-vuepress-markdown-body-bg: var(--web-bg-2)"
  >
    <BaseEditor
      v-model="formData"
      @save="handleSubmitForm"
      @info="handleShowInfo"
      @upload="handleEditorUpload"
      @video="handleVideoUpload"
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
        <div class="ml-2">
          <t-button
            theme="default"
            variant="outline"
            @click="handleAddCategoryShow"
            :disabled="!useHasAuth('category:save')"
          >
            <template #icon>
              <t-icon name="collection" size="16"></t-icon>
            </template>
            新增分类
          </t-button>
        </div>
      </t-form-item>
      <t-form-item name="tagIdList" label="标签">
        <t-select
          v-model="formData.tagIdList"
          :options="tagList"
          :keys="{ label: 'title', value: 'id' }"
          placeholder="请选择"
          multiple
        />
        <div class="ml-2">
          <t-button
            theme="default"
            variant="outline"
            @click="handleAddTagShow"
            :disabled="!useHasAuth('tag:save')"
          >
            <template #icon>
              <t-icon name="discount" size="16"></t-icon>
            </template>
            新增标签
          </t-button>
        </div>
      </t-form-item>
      <t-form-item name="roleIdList" label="可见角色">
        <t-select
          v-model="formData.roleIdList"
          :options="roleList"
          :keys="{ label: 'roleDesc', value: 'id' }"
          placeholder="请选择"
          multiple
        />
      </t-form-item>
      <!-- <t-form-item name="isPrivate" label="私有">
        <t-radio-group variant="default-filled" v-model="formData.isPrivate">
          <t-radio-button :value="v.value" v-for="(v, k) in privateOptions" :key="v.value">{{ v.label
            }}</t-radio-button>
        </t-radio-group>
      </t-form-item> -->
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

  <t-dialog
    v-model:visible="addCategoryVisible"
    header="新建分类"
    :confirm-on-enter="true"
    :on-cancel="() => (addCategoryVisible = false)"
    :on-close-btn-click="() => (addCategoryVisible = false)"
    :on-overlay-click="() => (addCategoryVisible = false)"
    :on-close="() => (addCategoryVisible = false)"
    :on-confirm="handleAddCategoryConfirm"
  >
    <t-form
      ref="addCategoryForm"
      :data="addCategoryFormData"
      :rules="addCategoryFormRules"
      :colon="true"
      :label-align="'top'"
      @submit="handleAddCategorySave"
    >
      <t-form-item name="title" label="名称">
        <t-input v-model="addCategoryFormData.title" clearable> </t-input>
      </t-form-item>
      <t-form-item name="desc" label="备注">
        <t-input v-model="addCategoryFormData.desc" clearable> </t-input>
      </t-form-item>
    </t-form>
  </t-dialog>

  <t-dialog
    v-model:visible="addTagVisible"
    header="新建标签"
    :confirm-on-enter="true"
    :on-cancel="() => (addTagVisible = false)"
    :on-close-btn-click="() => (addTagVisible = false)"
    :on-overlay-click="() => (addTagVisible = false)"
    :on-close="() => (addTagVisible = false)"
    :on-confirm="handleAddTagConfirm"
  >
    <t-form
      ref="addTagForm"
      :data="addTagFormData"
      :rules="addTagFormRules"
      :colon="true"
      :label-align="'top'"
      @submit="handleAddTagSave"
    >
      <t-form-item name="title" label="名称">
        <t-input v-model="addTagFormData.title" clearable> </t-input>
      </t-form-item>
      <t-form-item name="desc" label="备注">
        <t-input v-model="addTagFormData.desc" clearable> </t-input>
      </t-form-item>
    </t-form>
  </t-dialog>
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
import { useAdminCategorySubmitApi } from "@/api/admin/category";
import { useAdminTagSubmitApi } from "@/api/admin/tag";
import type Role from "~/server/models/Role";
import { useAdminRoleListApi } from "~/api/admin/role";

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
const roleList = ref<Role[]>([]);

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
  // @ts-ignore
  roleIdList: [],
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
    infoVisible.value = true;
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
  }
};

const handleVideoUpload = async (editor: any) => {
  const fileInput = document.createElement("input");
  fileInput.setAttribute("type", "file");
  fileInput.setAttribute("id", "fileVideoInput");
  fileInput.setAttribute("accept", "video/mp4")
  fileInput.style.position = "absolute";
  fileInput.style.left = "-9999px";

  const insertVideo = ({ url }: { url: string }) => {
    editor.insert(() => {
      return {
        text: `<video src="${url}" width="100%" height="auto" controls></video>\n`,
      };
    });
  };

  fileInput.addEventListener("change", () => {
    handleEditorUpload(null, insertVideo, fileInput.files);
  });
  document.body.appendChild(fileInput);
  fileInput.click();
};

const handleEditorUpload = async (event: any, insert: any, files: any) => {
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
    insert({
      url: useImageUrl("/" + item, false),
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
  // @ts-ignore
  formData.value.roleIdList = [];
};

const getData = async () => {
  if (formData.value.id) {
    const [_tagList, _categoryList, _roleList, _article] = await Promise.all([
      useAdminTagListApi(),
      useAdminCategoryListApi(),
      useAdminRoleListApi(),
      useAdminArticleInfoApi(formData.value.id),
    ]);

    tagList.value = _tagList;
    categoryList.value = _categoryList;
    roleList.value = _roleList;

    formData.value.title = _article.title;
    formData.value.cover = _article.cover;
    formData.value.content = _article.content;
    formData.value.status = _article.status;
    formData.value.categoryId = _article.categoryId;

    // @ts-ignore
    formData.value.tagIdList = _article.tagIdList
      ?.split(",")
      .map((id) => Number(id));

    // @ts-ignore
    formData.value.roleIdList = _article.roleIdList
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

// add category
const addCategoryForm = ref(null);
const addCategoryVisible = ref(false);
const addCategoryFormData = ref({
  title: "",
  desc: "",
});
const addCategoryFormRules = ref({
  title: [{ required: true, message: "名称必填" }],
});
const handleAddCategoryShow = () => {
  addCategoryFormData.value = {
    title: "",
    desc: "",
  };
  addCategoryVisible.value = true;
};
const handleAddCategoryConfirm = () => {
  addCategoryForm.value && addCategoryForm.value.submit();
};
const handleAddCategorySave = async ({
  validateResult,
  firstError,
}: SubmitContext) => {
  if (validateResult === true) {
    try {
      const _categoryId = await useAdminCategorySubmitApi(
        addCategoryFormData.value
      );
      MessagePlugin.success("保存成功");
      addCategoryVisible.value = false;
      if (_categoryId) {
        formData.value.categoryId = _categoryId;
      }
      // 回显
      const _categoryList = await useAdminCategoryListApi();
      categoryList.value = _categoryList;
    } catch (e) {
      MessagePlugin.error("保存失败");
    }
  } else {
    addCategoryVisible.value = true;
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
  }
};

// add tag
const addTagForm = ref(null);
const addTagVisible = ref(false);
const addTagFormData = ref({
  title: "",
  desc: "",
});
const addTagFormRules = ref({
  title: [{ required: true, message: "名称必填" }],
});
const handleAddTagShow = () => {
  addTagFormData.value = {
    title: "",
    desc: "",
  };
  addTagVisible.value = true;
};
const handleAddTagConfirm = () => {
  addTagForm.value && addTagForm.value.submit();
};
const handleAddTagSave = async ({
  validateResult,
  firstError,
}: SubmitContext) => {
  if (validateResult === true) {
    try {
      const _TagId = await useAdminTagSubmitApi(addTagFormData.value);
      MessagePlugin.success("保存成功");
      addTagVisible.value = false;
      if (_TagId) {
        formData.value.tagIdList.push(_TagId);
      }
      // 回显
      const _TagList = await useAdminTagListApi();
      tagList.value = _TagList;
    } catch (e) {
      MessagePlugin.error("保存失败");
    }
  } else {
    addTagVisible.value = true;
    console.log("Validate Errors: ", firstError, validateResult);
    firstError && MessagePlugin.warning(firstError);
  }
};

onBeforeRouteUpdate(() => {
  reset();
});

getData();
</script>
