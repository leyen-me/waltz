<template>
  <div class="w-full p-6">
    <t-card title="助手管理">
      <template #actions>
        <t-button
          @click="$router.push('/app/chatgpt/gpts/0')"
          :disabled="!useHasAuth('type:save')"
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
import { defaultRowsPerPageOptions } from "~/constants";
import useHasAuth from "@/utils/auth";
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
  Tag as TTag,
} from "tdesign-vue-next";
import type Type from "~/server/models/Type";
import {
  useAdminChatTypeDeleteApi,
  useAdminChatTypePageApi,
} from "~/api/admin/chat/type";

const router = useRouter();

// 分页
const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);

const total = ref(0);
const list = ref<Type[]>([]);
const getData = async () => {
  const { data, meta } = await useAdminChatTypePageApi({
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
    colKey: "name",
    title: "名称",
    ellipsis: true,
  },
  {
    colKey: "code",
    title: "编码",
    ellipsis: true,
  },
  {
    colKey: "systemPrompt",
    title: "系统提示词",
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
            theme="primary"
            disabled={!useHasAuth("type:update")}
            onClick={() => router.push(`/app/chatgpt/c/0?typeCode=${row.code}`)}
          >
            使用
          </TLink>
          <TLink
            hover="color"
            disabled={!useHasAuth("type:update")}
            onClick={() => router.push(`/app/chatgpt/gpts/${row.id}`)}
          >
            编辑
          </TLink>
          <TPopconfirm
            disabled={!useHasAuth("type:delete")}
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <TLink
              disabled={!useHasAuth("type:delete")}
              hover="color"
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
    await useAdminChatTypeDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
