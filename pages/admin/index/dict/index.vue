<template>
  <div class="w-full">
    <t-card title="数据字典">
      <template #actions>
        <t-button
          class="ml-2"
          @click="$router.push('/admin/dict/0')"
          :disabled="!useHasAuth('dict:save')"
          >新增</t-button
        >
      </template>
      <t-table
        ref="tableRef"
        row-key="id"
        :data="list"
        :columns="columns"
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
  useAdminDictTypePageApi,
  useAdminDictTypeDeleteApi,
} from "@/api/admin/dict";
import { defaultRowsPerPageOptions } from "~/constants";
import type User from "@/server/models/User";
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
const list = ref<User[]>([]);
const getData = async () => {
  const { data, meta } = await useAdminDictTypePageApi({
    page: page.value,
    limit: limit.value,
  });
  list.value = data;
  total.value = meta.totalItems;
};

const columns = [
  {
    colKey: "id",
    title: "编号",
    ellipsis: true,
  },
  {
    colKey: "dictType",
    title: "字典类型",
    ellipsis: true,
  },
  {
    colKey: "dictName",
    title: "字典名称",
    ellipsis: true,
  },
  {
    colKey: "remark",
    title: "备注",
    ellipsis: true,
  },
  {
    colKey: "sort",
    title: "排序",
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
            disabled={!useHasAuth("dict:update")}
            onClick={() => router.push(`/admin/dict/${row.id}`)}
          >
            编辑
          </TLink>
          <TPopconfirm
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <TLink
              disabled={!useHasAuth("dict:delete")}
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
    await useAdminDictTypeDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
