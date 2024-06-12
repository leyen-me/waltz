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
  useAdminCommentSubmitApi,
} from "@/api/admin/comment";
import { defaultRowsPerPageOptions } from "~/constants";
import type Comment from "@/server/models/Comment";
import useHasAuth from "@/utils/auth";
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
  RadioGroup as TRadioGroup,
  RadioButton as TRadioButton,
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

const statusOptions = ref([
  { label: "驳回", value: "nopass" },
  { label: "等待", value: "ing" },
  { label: "通过", value: "pass" },
]);
const handleChangeStatus = async ({
  id,
  status,
}: {
  id: number;
  status: CommentStatusEnum;
}) => {
  try {
    await useAdminCommentSubmitApi({
      id,
      status,
    });
    MessagePlugin.success("修改成功");
    getData();
  } catch (error) {
    MessagePlugin.error("修改失败");
  }
};

const columns = [
  {
    colKey: "id",
    title: "id",
    ellipsis: true,
  },
  {
    colKey: "pid",
    title: "pid",
    ellipsis: true,
  },
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
    cell: (_h: any, { row }: any) => {
      return (
        <TRadioGroup
          variant="default-filled"
          disabled={!useHasAuth("comment:update")}
          value={row.status}
          onChange={(e) => {
            handleChangeStatus({
              id: row.id,
              status: e as CommentStatusEnum,
            });
          }}
        >
          {statusOptions.value.map((item) => {
            return <TRadioButton value={item.value}>{item.label}</TRadioButton>;
          })}
        </TRadioGroup>
      );
    },
  },
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
