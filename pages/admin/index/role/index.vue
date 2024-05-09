<template>
  <div class="w-full">
    <t-card title="角色管理">
      <template #actions>
        <t-button class="ml-2" @click="$router.push('/admin/role/0')"
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
import { useAdminRoleListApi, useAdminRoleDeleteApi } from "@/api/admin/role";
import type Role from "@/server/models/User";

const router = useRouter();

const list = ref<Role[]>([]);
const getData = async () => {
  const data = await useAdminRoleListApi();
  list.value = data;
};

const columns = [
  {
    colKey: "id",
    title: "编号",
    ellipsis: true,
  },
  {
    colKey: "roleName",
    title: "角色名称",
    ellipsis: true,
  },
  {
    colKey: "roleDesc",
    title: "角色描述",
    ellipsis: true,
  },
  {
    colKey: "operate",
    title: "操作",
    cell: (_h: any, { row }: any) => {
      return (
        <t-space>
          <t-link
            variant="text"
            hover="color"
            onClick={() => router.push(`/admin/role/${row.id}`)}
          >
            编辑
          </t-link>
          <t-popconfirm
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <t-link variant="text" hover="color" theme="danger">
              删除
            </t-link>
          </t-popconfirm>
        </t-space>
      );
    },
  },
];
const handleDelete = async (id: number) => {
  try {
    await useAdminRoleDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
