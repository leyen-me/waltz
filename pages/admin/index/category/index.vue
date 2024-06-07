<template>
  <div class="w-full">
    <t-card title="分类管理">
      <template #actions>
        <t-button
          @click="$router.push('/admin/category/0')"
          :disabled="!useHasAuth('category:save')"
          >新增</t-button
        >
      </template>
      <t-table
        ref="tableRef"
        row-key="id"
        :data="list"
        :columns="columns"
        :hover = "false"
      ></t-table>
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
    </t-card>
  </div>
</template>

<script setup lang="tsx">
import {
  useAdminCategoryListApi,
  useAdminCategoryDeleteApi,
} from "@/api/admin/category";
import { defaultRowsPerPageOptions } from "~/constants";
import type Category from "@/server/models/Category";
import useHasAuth from "@/utils/auth";
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
} from "tdesign-vue-next";

const router = useRouter();

// 分页
const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);

const total = ref(0);
const list = ref<Category[]>([]);
const getData = async () => {
  const data = await useAdminCategoryListApi();
  list.value = data;
};

const columns = [
  {
    colKey: "id",
    title: "编号",
    ellipsis: true,
  },
  {
    colKey: "title",
    title: "名称",
    ellipsis: true,
  },
  {
    colKey: "desc",
    title: "备注",
    ellipsis: true,
  },
  {
    colKey: "operate",
    title: "操作",
    cell: (_h: any, { row }: any) => {
      return (
        <TSpace>
          <TLink
            hover="color"
            disabled={!useHasAuth("category:update")}
            onClick={() => router.push(`/admin/category/${row.id}`)}
          >
            编辑
          </TLink>
          <TPopconfirm
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <TLink
              disabled={!useHasAuth("category:delete")}
              hover="color"
              theme="danger"
            >
              删除
            </TLink>
          </TPopconfirm>
        </TSpace>
      );
    },
  },
];
const handleDelete = async (id: number) => {
  try {
    await useAdminCategoryDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
