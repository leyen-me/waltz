<template>
  <div class="w-full m-auto mt-4 xl:w-3/4 xl:mt-8">
    <div class="fixed bottom-12 right-12">
      <t-button
        shape="circle"
        theme="primary"
        style="width: 56px; height: 56px; border-radius: 999px"
        @click="$router.push('/admin/article/0')"
      >
        <template #icon><plus-icon size="32px" /></template>
      </t-button>
    </div>
    <div
      v-if="list.length == 0"
      class="flex w-full h-full items-center justify-center text-gray-500 text-sm"
    >
      一篇文章也没有
    </div>
    <ul v-else class="grid grid-cols-1 gap-2 xl:grid-cols-2 w-full">
      <li
        v-for="(v, k) in list"
        :key="v.id"
        class="w-full cursor-pointer flex relative p-4 xl:p-10 h-40 xl:h-60"
      >
        <!-- cover -->
        <div
          class="w-full h-full overflow-hidden rounded-md absolute top-0 left-0 z-0"
        >
          <img
            class="w-full h-auto object-cover transition duration-300 ease-in-out hover:scale-110"
            :src="v.cover || defaultCover"
          />
        </div>
        <!-- mask -->
        <div
          class="w-full h-full overflow-hidden rounded-md absolute top-0 left-0 z-[1] bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0)]"
        ></div>
        <!-- content -->
        <div class="flex-1 w-0 flex flex-col justify-between z-20 text-white">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-xl flex flex-1 w-0 leading-[1] p-0 m-0">
              <span class="line-clamp-1">{{ v.title }}</span>
            </h2>
            <span class="font-time opacity-65 text-sm ml-24 text-right">
              {{ v.status === "draft" ? "未发布" : v.publishedAtDetails.week }}
              <br />
              {{
                v.status === "draft"
                  ? ""
                  : v.publishedAtDetails.year +
                    "-" +
                    v.publishedAtDetails.month +
                    "-" +
                    v.publishedAtDetails.day
              }}
            </span>
          </div>
          <div class="mt-8 flex items-end">
            <p class="line-clamp-2 flex-1 w-0 opacity-65 m-0 xl:line-clamp-3">
              {{ v.content }}<br />
            </p>
            <div
              class="ml-4 xl:ml-24"
              style="--td-bg-color-specialcomponent: rgba(0, 0, 0, 0)"
            >
              <t-space>
                <t-button
                  @click="$router.push(`/admin/article/${v.id}`)"
                  variant="outline"
                  style="color: white"
                  >编辑</t-button
                >
                <t-popconfirm
                  content="确认删除吗"
                  @confirm="handleDelete(v.id as number)"
                >
                  <t-button theme="danger" variant="outline">删除</t-button>
                </t-popconfirm>
              </t-space>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="mt-4">
      <t-pagination
        v-if="list.length > limit"
        v-model="page"
        v-model:pageSize="limit"
        :total="total"
        show-sizer
        :page-size-options="defaultRowsPerPageOptions"
        @page-size-change="getData"
        @current-change="getData"
      />
    </div>
  </div>

  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import { PlusIcon } from "tdesign-icons-vue-next";
import {
  useAdminArticleDeleteApi,
  useAdminArticlePageApi,
} from "@/api/admin/article";
import { defaultCover, defaultRowsPerPageOptions } from "@/constans";
import type Article from "@/server/models/Article";

// 分页
const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);

const total = ref(0);
const list = ref<Article[]>([]);

const handleDelete = async (id: number) => {
  try {
    await useAdminArticleDeleteApi(id);
    await getData();
    MessagePlugin.success("文章删除成功");
  } catch (error) {
    MessagePlugin.error("文章删除失败");
  }
};

const getData = async () => {
  const { data, meta } = await useAdminArticlePageApi({
    page: page.value,
    limit: limit.value,
  });
  list.value = data;
  total.value = meta.totalItems;
};

getData();
</script>
