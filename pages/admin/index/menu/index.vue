<template>
  <div class="w-full">
    <t-card title="菜单管理">
      <template #actions>
        <t-button class="ml-2" @click="$router.push('/admin/menu/0')"
          >新增</t-button
        >
      </template>
      <t-enhanced-table
        ref="tableRef"
        row-key="id"
        drag-sort="row-handler"
        :data="list"
        :columns="columns"
        :tree="treeConfig"
      ></t-enhanced-table>
    </t-card>
  </div>
</template>

<script setup lang="tsx">
import { useAdminMenuDeleteApi, useAdminMenuListApi } from "@/api/admin/menu";

const list = ref([]);
const router = useRouter();

const getData = async () => {
  const data = await useAdminMenuListApi();
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
    colKey: "path",
    title: "路径",
    ellipsis: true,
  },
  {
    colKey: "sort",
    title: "排序",
    ellipsis: true,
  },
  {
    colKey: "type",
    title: "类型",
    ellipsis: true,
    cell: (_h: any, { row }: any) => {
      return (
        <t-tag theme={getTypeTagColor(row.type)}>
          {row.type === "menu" ? "菜单" : "按钮"}
        </t-tag>
      );
    },
  },
  {
    colKey: "authority",
    title: "权限",
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
            onClick={() => router.push(`/admin/menu/${row.id}`)}
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
const treeConfig = reactive({
  childrenKey: "children",
  treeNodeColumnIndex: 0,
  indent: 25,
  expandTreeNodeOnClick: true,
});

const handleDelete = async (id: number) => {
  try {
    await useAdminMenuDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

const getTypeTagColor = (type: string) => {
  return type === "menu" ? "primary" : "default";
};

getData();
</script>
