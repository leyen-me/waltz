<template>
  <div class="w-full">
    <t-card title="评论管理">
      <t-table
        ref="tableRef"
        row-key="id"
        :data="list"
        :columns="columns"
        :hover="false"
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
  useAdminCommentPageApi,
  useAdminCommentDeleteApi,
} from "@/api/admin/comment";
import { defaultRowsPerPageOptions } from "~/constants";
import type Comment from "@/server/models/Comment";
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
const list = ref<Comment[]>([]);
const getData = async () => {
  const { data, meta } = await useAdminCommentPageApi({
    page: page.value,
    limit: limit.value,
  });
  list.value = data;
  total.value = meta.totalItems;
};

const columns = [
  {
    colKey: "articleTitle",
    title: "文章标题",
    ellipsis: true,
  },
  {
    colKey: "username",
    title: "用户名称",
    ellipsis: true,
  },
  {
    colKey: "content",
    title: "评论",
    ellipsis: true,
  },
  {
    colKey: "status",
    title: "审核状态",
    ellipsis: true,
  },
  // <TLink
  //           hover="color"
  //           disabled={!useHasAuth("comment:update")}
  //           onClick={() => router.push(`/admin/comment/${row.id}`)}
  //         >
  //           编辑
  //         </TLink>
  {
    colKey: "operate",
    title: "操作",
    cell: (_h: any, { row }: any) => {
      return (
        <TSpace>
          <TPopconfirm
            content="确认删除吗"
            onConfirm={() => handleDelete(row.id)}
          >
            <TLink
              disabled={!useHasAuth("comment:delete")}
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
    await useAdminCommentDeleteApi(id);
    await getData();
    MessagePlugin.success("删除成功");
  } catch (error) {
    MessagePlugin.error("删除失败");
  }
};

getData();
</script>
