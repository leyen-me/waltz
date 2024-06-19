<template>
  <div class="w-full m-auto mt-4 xl:w-3/4 xl:mt-8">
    <!-- 筛选 -->
    <t-card title="检索条件">
      <template #actions>
        <t-space>
          <!-- <t-button @click="getData" theme="default">
            <template #icon>
              <t-icon name="file-import"></t-icon>
            </template>
            导入
          </t-button> -->
          <t-upload
            name="files"
            v-model="files"
            :action="uploadUrl"
            :abridge-name="[8, 6]"
            :multiple="false"
            theme="custom"
            :showImageFileName="false"
            placeholder="未选择文件"
            @success="onUploadSuccess"
            @fail="onUploadError"
          >
            <t-button theme="default">
              <template #icon>
                <t-icon name="file-import"></t-icon>
              </template>
              导入</t-button
            >
          </t-upload>
          <t-button @click="handleArticleExport">
            <template #icon>
              <t-icon name="file-export"></t-icon>
            </template>
            导出
          </t-button>
        </t-space>
      </template>
      <t-form ref="form" :colon="true" :label-align="'left'">
        <t-form-item label="分类">
          <ul class="w-full flex flex-wrap gap-2">
            <li
              @click="categoryActive = -1"
              :class="
                categoryActive === -1
                  ? 'bg-[var(--web-color-7)] text-black'
                  : ''
              "
              class="rounded px-6 py-2 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:bg-[var(---web-color-10)]"
            >
              全部
            </li>
            <li
              @click="categoryActive = k"
              :class="
                categoryActive === k ? 'bg-[var(--web-color-7)] text-black' : ''
              "
              class="rounded px-6 py-2 transition duration-500 ease cursor-pointer hover:bg-[rgb(37,37,37)] hover:bg-[var(--web-color-10)]"
              v-for="(v, k) in categoryList"
              :key="v.id"
            >
              {{ v.title }}
            </li>
          </ul>
        </t-form-item>
        <t-form-item name="title" label="标题">
          <t-input
            size="large"
            v-model="formData.title"
            clearable
            placeholder="请输入文章标题或内容"
          >
          </t-input>
        </t-form-item>
      </t-form>
    </t-card>

    <!-- 新增 -->
    <div class="fixed bottom-12 right-12 z-10">
      <t-button
        shape="circle"
        theme="primary"
        style="width: 56px; height: 56px; border-radius: 999px"
        @click="$router.push('/admin/article/0')"
        :disabled="!useHasAuth('article:save')"
      >
        <template #icon><plus-icon size="32px" /></template>
      </t-button>
    </div>

    <!-- 文章 -->
    <div class="mt-4"></div>
    <t-card title="文章列表">
      <div
        v-if="list.length == 0"
        class="flex w-full h-full items-center justify-center text-gray-500 text-sm"
      >
        一篇文章也没有
      </div>

      <div class="grid grid-cols-1 gap-4 xl:grid-cols-2 mt-8">
        <div
          class="p-4 xl:p-10 hover:bg-[var(--web-bg-1)] cursor-pointer group border border-[var(--web-border-2)] border-solid transition duration-500 ease"
          v-for="(v, k) in list"
          :key="v.id"
          @click="handleGoDetail(v)"
        >
          <div class="w-full aspect-video overflow-hidden">
            <img
              class="w-full h-full object-cover transition duration-300 ease-in-out group-hover:scale-110"
              :src="useImageUrl(v.cover)"
            />
          </div>
          <div class="mt-10 flex">
            <span>{{ v.categoryTitle }}</span
            >  
          <template v-if="v.tagList">
              <span class="mx-2">/</span><span class="text-[var(--web-color-1)] w-0 flex-1 line-clamp-1">
                {{ v.tagList && String(v.tagList).split(",").join(" • ") }}
              </span>
          </template>
          </div>
          <div class="mt-3 relative">
            <h2
              class="w-full group-hover:text-[var(--web-color-7)] line-clamp-3 text-2xl transition duration-300 ease cursor-pointer"
            >
              {{ v.title }}
            </h2>
          </div>
          <div class="mt-4 xl:mt-8 font-time flex justify-between items-center">
            <div>
              <p>Posted by {{ v.author }}</p>
              <p>
                {{
                  v.publishedAtDetails
                    ? v.publishedAtDetails.month.english +
                      " " +
                      v.publishedAtDetails.day +
                      "," +
                      v.publishedAtDetails.year
                    : "未发布"
                }}
              </p>
            </div>
            <div
              class="text-[var(--web-color-7)] flex justify-between items-center"
            >
              <t-popconfirm
                content="确认删除吗"
                @confirm="handleDelete(v.id as number)"
                :disabled="!useHasAuth('article:delete')"
              >
                <t-button
                  :disabled="!useHasAuth('article:delete')"
                  shape="rectangle"
                  variant="text"
                  @click.stop=""
                  >删除</t-button
                >
              </t-popconfirm>
              <t-button
                shape="rectangle"
                variant="text"
                :disabled="!useHasAuth('article:update')"
                >编辑</t-button
              >
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <t-pagination
          
          v-model="page"
          v-model:pageSize="limit"
          :total="total"
          show-sizer
          :page-size-options="defaultRowsPerPageOptions"
          @page-size-change="getData"
          @current-change="getData"
        />
      </div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "tdesign-icons-vue-next";
import {
  useAdminArticleDeleteApi,
  useAdminArticlePageApi,
} from "@/api/admin/article";
import { defaultRowsPerPageOptions } from "~/constants";
import type Article from "@/server/models/Article";
import useHasAuth from "@/utils/auth";
import useImageUrl from "@/utils/imageUrl";
import type Category from "~/server/models/Category";
import { useAdminCategoryListApi } from "~/api/admin/category";
import useDebounce from "~/utils/debounce";
import Cookies from "js-cookie";

const { NUXT_API_BASE } = useRuntimeConfig().public;
const router = useRouter();

// 分页
const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);

const categoryActive = ref(-1);
const categoryList = ref<Category[]>([]);

const total = ref(0);
const list = ref<Article[]>([]);

const formData = ref({
  title: "",
});

const handleGoDetail = (article: Article) => {
  if (!useHasAuth("article:update")) {
    MessagePlugin.warning("没有权限");
    return;
  }
  router.push(`/admin/article/${article.id}`);
};

// 文件导入
const files = ref([]);
const uploadUrl =
  NUXT_API_BASE +
    "/api/admin/article/import?Authorization=" +
    Cookies.get("token") || "";

const onUploadSuccess = async (e: any) => {
  const { code, msg, data } = e.response;
  if (code !== 200) {
    MessagePlugin.error(msg);
    return;
  }
  MessagePlugin.success("导入成功, 请刷新页面");
  files.value = [];
  await getData();
};
const onUploadError = () => {
  files.value = [];
  MessagePlugin.error("文件上传失败");
};

const handleArticleExport = async () => {
  const Authorization = useCookie("token", {
    default: () => "",
    watch: false,
  });
  window.open(
    NUXT_API_BASE +
      `/api/admin/article/export?Authorization=${Authorization.value}`
  );
};

const handleDelete = async (id: number) => {
  try {
    await useAdminArticleDeleteApi(id);
    await getData();
    MessagePlugin.success("文章删除成功");
  } catch (error) {
    MessagePlugin.error("文章删除失败");
  }
};

const getCategoryList = async () => {
  const _categoryList = await useAdminCategoryListApi();
  categoryList.value = _categoryList;
};

const getData = async () => {
  const options =
    categoryActive.value === -1
      ? { categoryId: "" as unknown as number }
      : {
          categoryId: categoryList.value[categoryActive.value].id,
        };
  const { data, meta } = await useAdminArticlePageApi({
    page: page.value,
    limit: limit.value,
    ...options,
    title: encodeURIComponent(formData.value.title),
  });
  list.value = data;
  total.value = meta.totalItems;
};

const handleSearch = useDebounce(getData, 500);

watch(
  () => formData.value.title,
  () => {
    handleSearch();
  }
);

watch(
  () => categoryActive.value,
  () => {
    getData();
  }
);

getCategoryList();
getData();
</script>
