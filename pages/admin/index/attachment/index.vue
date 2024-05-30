<template>
  <div class="w-full h-full" id="attachmentPage" @contextmenu="showMenu">
    <t-card title="附件管理" style="height: 100%">
      <!-- <template #actions>
        <t-upload
          name="files"
          v-model="files"
          :action="uploadUrl"
          :abridge-name="[8, 6]"
          :multiple="false"
          :showImageFileName="false"
          theme="custom"
          :disabled="!useHasAuth('attachment:save')"
          placeholder="未选择文件"
          @success="onUploadSuccess"
          @fail="onUploadError"
          @remove="onUploadRemove"
        ></t-upload>
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
      </div> -->

      <!-- <t-button variant="outline">右击时触发</t-button> -->
    </t-card>
  </div>

  <ContextMenu :items :x :y v-model="contextShow"></ContextMenu>
</template>

<script setup lang="tsx">
import { defaultRowsPerPageOptions } from "@/constans";
import {
  useAdminAttachmentDeleteApi,
  useAdminAttachmentPageApi,
} from "@/api/admin/attachment";
import type Attachment from "~/server/models/Attachment";
import Cookies from "js-cookie";
import useHasAuth from "@/utils/auth";
import ContextMenu from "./ContextMenu.vue";
import { nanoid } from "nanoid";

const pid = ref(0);
const contextShow = ref(false);
const x = ref(0);
const y = ref(0);

const items = ref([
  {
    id: nanoid(),
    icon: "folder",
    title: "新建文件夹",
    onClick: () => {
      contextShow.value = false;
    },
  },
  {
    id: nanoid(),
    icon: "upload",
    title: "文件上传",
    onClick: () => {
      contextShow.value = false;
    },
  },
  {
    id: nanoid(),
    icon: "move",
    title: "移动",
    onClick: () => {
      contextShow.value = false;
    },
  },
  {
    id: nanoid(),
    icon: "delete",
    title: "删除",
  },
]);

// document.querySelector('.t-popup')
const showMenu = function (event) {
  // 阻止默认的右键菜单行为
  event.preventDefault();
  contextShow.value = !contextShow.value;

  const viewportWidth = window.innerWidth - 20;
  const viewportHeight = window.innerHeight - 20;

  const getMenuPosition = () => {
    const menuWidth = 144;
    const menuHeight = items.value.length * 32;
    let finalX = event.clientX;
    let finalY = event.clientY;
    // 检查水平位置
    if (finalX + menuWidth > viewportWidth) {
      finalX = viewportWidth - menuWidth;
    }
    // 检查垂直位置
    if (finalY + menuHeight > viewportHeight) {
      finalY = viewportHeight - menuHeight;
    }
    return { finalX, finalY };
  };

  const { finalX, finalY } = getMenuPosition();

  x.value = finalX;
  y.value = finalY;
};

// const files = ref([]);
// const uploadUrl =
//   "/api/admin/attachment/?Authorization=" + Cookies.get("token") || "";
// const onUploadSuccess = (e: any) => {
//   const { code, msg, data } = e.response;
//   if (code !== 200) {
//     MessagePlugin.error(msg);
//     return;
//   }
//   getData();
//   MessagePlugin.success("文件上传成功");
// };
// const onUploadError = () => {
//   MessagePlugin.error("文件上传失败");
// };

// const onUploadRemove = () => {
//   files.value = [];
// };

// const router = useRouter();

// // 分页
// const page = ref(1);
// const limit = ref(defaultRowsPerPageOptions[0]);

// const total = ref(0);
// const list = ref<Attachment[]>([]);
// const getData = async () => {
//   const { data, meta } = await useAdminAttachmentPageApi({
//     page: page.value,
//     limit: limit.value,
//   });
//   list.value = data;
//   total.value = meta.totalItems;
// };

// const columns = [
//   {
//     colKey: "id",
//     title: "编号",
//     ellipsis: true,
//   },
//   {
//     colKey: "title",
//     title: "附件标题",
//     ellipsis: true,
//   },
//   {
//     colKey: "url",
//     title: "附件链接",
//     ellipsis: true,
//   },
//   {
//     colKey: "ext",
//     title: "扩展名",
//     ellipsis: true,
//   },
//   {
//     colKey: "size",
//     title: "附件大小",
//     ellipsis: true,
//   },
//   {
//     colKey: "operate",
//     title: "操作",
//     cell: (_h: any, { row }: any) => {
//       return (
//         <t-space>
//           <t-popconfirm
//             content="确认删除吗"
//             onConfirm={() => handleDelete(row.id)}
//           >
//             <t-link
//               disabled={!useHasAuth("attachment:delete")}
//               variant="text"
//               hover="color"
//               theme="danger"
//             >
//               删除
//             </t-link>
//           </t-popconfirm>
//         </t-space>
//       );
//     },
//   },
// ];
// const handleDelete = async (id: number) => {
//   try {
//     await useAdminAttachmentDeleteApi(id);
//     await getData();
//     MessagePlugin.success("删除成功");
//   } catch (error) {
//     MessagePlugin.error("删除失败");
//   }
// };

// getData();
</script>
