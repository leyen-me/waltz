<template>
  <div class="w-full">
    <div class="w-full flex justify-end">
      <Button class="ml-2" @click="$router.push('/admin/menu/0')">新增</Button>
    </div>
    <Card class="mt-2">
      <template #content>
        <TreeTable :value="list" :dataKey="'id'">
          <Column field="title" header="名称" expander></Column>
          <Column field="path" header="路径"></Column>
          <Column field="sort" header="排序"></Column>
          <Column header="类型">
            <template #body="slotProps">
              <Tag :severity="getTypeTagColor(slotProps.node.type)">{{
                slotProps.node.type === "menu" ? "菜单" : "按钮"
              }}</Tag>
            </template>
          </Column>
          
          <Column field="authority" header="权限"></Column>
          <Column header="操作">
            <template #body="slotProps">
              <Button
                text
                @click="$router.push(`/admin/menu/${slotProps.node.id}`)"
                >修改</Button
              >
              <Button class="ml-2" text severity="danger">删除</Button>
            </template>
          </Column>
        </TreeTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useAdminMenuListApi } from "@/api/admin/menu";
import TreeTable from "primevue/treetable";
import Column from "primevue/column";

const list = ref([]);

const handleData = (data: any) => {
  let _list = [];
  _list = data.map((item) => {
    return { ...item, children: handleData(item.children), data: { ...item } };
  });
  return _list;
};

const getData = async () => {
  const data = await useAdminMenuListApi();
  list.value = handleData(data);
};

const getTypeTagColor = (type) => {
  return type === "menu" ? "primary" : "info";
};

getData();
</script>
