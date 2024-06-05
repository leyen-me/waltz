<template>
  <div class="w-full">
    <t-card title="用户管理">
      <template #actions>
        <t-button
          class="ml-2"
          @click="$router.push('/admin/user/0')"
          :disabled="!useHasAuth('user:save')"
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
import { useAdminUserDeleteApi, useAdminUserPageApi } from "@/api/admin/user";
import { defaultRowsPerPageOptions } from "~/constants";
import type User from "@/server/models/User";
import useHasAuth from "@/utils/auth";
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
  Tag as TTag,
} from "tdesign-vue-next";
import useUserStore from "~/stores/userStore";

const router = useRouter();

// 分页
const page = ref(1);
const limit = ref(defaultRowsPerPageOptions[0]);
const userStore = useUserStore();

const total = ref(0);
const list = ref<User[]>([]);
const getData = async () => {
  const { data, meta } = await useAdminUserPageApi({
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
    colKey: "username",
    title: "名称",
    ellipsis: true,
  },
  {
    colKey: "gender",
    title: "性别",
    ellipsis: true,
    cell: (_h: any, { row }: any) => {
      return (
        <TTag
          theme={
            row.gender === "men"
              ? "primary"
              : row.gender === "women"
              ? "danger"
              : "default"
          }
        >
          {row.gender === "men" ? "男" : row.gender === "women" ? "女" : "保密"}
        </TTag>
      );
    },
  },
  {
    colKey: "email",
    title: "邮箱",
    ellipsis: true,
  },
  {
    colKey: "superAdmin",
    title: "超管",
    ellipsis: true,
    cell: (_h: any, { row }: any) => {
      return (
        <TTag theme={row.superAdmin === 1 ? "primary" : "default"}>
          {row.superAdmin === 1 ? "是" : "否"}
        </TTag>
      );
    },
  },
  {
    colKey: "status",
    title: "状态",
    ellipsis: true,
    cell: (_h: any, { row }: any) => {
      return (
        <TTag theme={row.status === 0 ? "primary" : "default"}>
          {row.status === 0 ? "正常" : "停用"}
        </TTag>
      );
    },
  },
  {
    colKey: "operate",
    title: "操作",
    cell: (_h: any, { row }: any) => {
      return (
        <TSpace>
          <TLink
            hover="color"
            disabled={!useHasAuth("user:update")}
            onClick={() => router.push(`/admin/user/${row.id}`)}
          >
            编辑
          </TLink>
          <TPopconfirm
            disabled={
              userStore.user.id === row.id ||
              row.superAdmin ||
              !useHasAuth("user:delete")
            }
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <TLink
              disabled={
                userStore.user.id === row.id ||
                row.superAdmin ||
                !useHasAuth("user:delete")
              }
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
    await useAdminUserDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
