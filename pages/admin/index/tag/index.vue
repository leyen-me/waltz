<template>
  <div class="w-full">
    <t-card title="标签管理">
      <template #actions>
        <t-button
          @click="$router.push('/admin/tag/0')"
          :disabled="!useHasAuth('tag:save')"
          >新增</t-button
        >
      </template>
      <t-table
        ref="tableRef"
        row-key="id"
        :data="list"
        :columns="columns"
      ></t-table>
    </t-card>
  </div>
</template>

<script setup lang="tsx">
import { useAdminTagListApi, useAdminTagDeleteApi } from "@/api/admin/tag";
import { defaultRowsPerPageOptions } from "~/constants";
import type Tag from "@/server/models/Tag";
import useHasAuth from "@/utils/auth";
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
} from "tdesign-vue-next";

const router = useRouter();

const list = ref<Tag[]>([]);
const getData = async () => {
  const data = await useAdminTagListApi();
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
            disabled={!useHasAuth("tag:update")}
            onClick={() => router.push(`/admin/tag/${row.id}`)}
          >
            编辑
          </TLink>
          <TPopconfirm
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <TLink
              disabled={!useHasAuth("tag:delete")}
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
    await useAdminTagDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
