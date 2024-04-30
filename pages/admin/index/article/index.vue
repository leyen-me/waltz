<template>
  <div class="w-full m-auto mt-4 xl:w-3/4 xl:mt-8">
    <div
      v-if="list.length == 0"
      class="flex w-full h-full items-center justify-center text-gray-500 text-sm"
    >
      什么都没有...<Button
        class="text-sm py-0 px-2"
        label="新增文章"
        link
        @click="$router.push('/admin/article/0')"
      />
    </div>
    <ul
      v-else
      class="grid grid-cols-1 gap-2 xl:grid-cols-2 w-full"
      style="padding-inline-start: 0"
    >
      <li
        v-for="(v, k) in list"
        :key="v.id"
        class="w-full cursor-pointer flex relative p-4"
        style="list-style: none"
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
        <div class="flex-1 w-0 flex flex-col justify-center z-20 text-white">
          <div class="flex justify-between items-center">
            <h2 class="font-bold text-xl flex flex-1 w-0 leading-[1] p-0 m-0">
              <span class="line-clamp-1">{{ v.title }}</span>
            </h2>
            <span class="font-time opacity-65 text-sm ml-24">
              January 1,2022
            </span>
          </div>
          <div class="mt-8 flex items-center">
            <p class="line-clamp-2 flex-1 w-0 opacity-65 m-0">
              {{ v.content }}<br />
            </p>
            <div class="ml-24">
              <Button @click="$router.push(`/admin/article/${v.id}`)" text
                >编辑</Button
              >
              <Button
                severity="danger"
                @click="handleDelete(v.id as number)"
                text
                >删除</Button
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
    <Paginator
      class="w-full mt-4"
      :rows="limit"
      :totalRecords="total"
      v-if="list.length > limit"
      :rowsPerPageOptions="defaultRowsPerPageOptions"
      @page="handlePageChange"
    >
    </Paginator>
  </div>

  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import {
  useAdminArticleDeleteApi,
  useAdminArticlePageApi,
} from "@/api/admin/article";
import { defaultCover, defaultRowsPerPageOptions } from "@/constans";
import type Article from "@/server/models/Article";
import type { PageState } from "primevue/paginator";

// 分页
const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);

const handlePageChange = (pageState: PageState) => {
  page.value = pageState.page + 1;
  limit.value = pageState.rows;
  getData();
};

const total = ref(0);
const list = ref<Article[]>([]);

const toast = useToast();
const confirm = useConfirm();

const handleDelete = (id: number) => {
  confirm.require({
    message: "确定删除吗?",
    header: "删除",
    icon: "pi pi-info-circle",
    rejectLabel: "取消",
    acceptLabel: "删除",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: async () => {
      try {
        await useAdminArticleDeleteApi(id);
        await getData();
        toast.add({
          severity: "success",
          summary: "成功",
          detail: "文章删除成功",
          life: 3000,
        });
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "错误",
          detail: "文章删除失败",
          life: 3000,
        });
      }
    },
    reject: () => {},
  });
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