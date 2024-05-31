<template>
  <div class="w-full h-full" @contextmenu="(e) => showMenu(e, false)">
    <t-card title="附件管理" style="height: 100%">
      <ul class="grid grid-cols-3 gap-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-12">
        <li
          v-if="pid !== 0"
          class="w-full bg-[var(--web-bg-8)] p-8 cursor-pointer rounded-md flex flex-col items-center aspect-square hover:bg-[var(--web-bg-9)]"
          @click="handleParentClick"
        >
          <t-icon name="folder" size="56px"></t-icon>
          <span class="line-clamp-3 mt-2">返回上一级</span>
        </li>
        <li
          v-for="(v, k) in list"
          :key="v.id"
          class="w-full h-40 bg-[var(--web-bg-8)] p-8 cursor-pointer rounded-md flex flex-col items-center hover:bg-[var(--web-bg-9)]"
          @click="handleFileClick(v)"
          @contextmenu="(e) => showMenu(e, true)"
        >
          <t-icon v-if="v.isFolder" name="folder" size="56px"></t-icon>
          <t-icon v-else name="file" size="56px"></t-icon>

          <img v-if="v.type === 'image/png'" :src="useImageUrl(v.url)" alt="" style="width: 50px;height: 50px;" />
          <p class="w-full mt-2 line-clamp-3 text-center">
            {{ v.title }}
          </p>
        </li>
      </ul>

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

  <ContextMenu
    :items
    :x
    :y
    v-model="contextShow"
    :h="contextItemHight"
    :w="contextItemWidth"
  ></ContextMenu>

  <t-dialog
    v-model:visible="addFolderVisible"
    header="新建文件夹"
    width="40%"
    :confirm-on-enter="true"
    :on-cancel="() => (addFolderVisible = false)"
    :on-close-btn-click="() => (addFolderVisible = false)"
    :on-overlay-click="() => (addFolderVisible = false)"
    :on-close="() => (addFolderVisible = false)"
    :on-confirm="handleAddFolderVisibleConfirm"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-input v-model="addFolderName" placeholder="文件夹名称"></t-input>
    </t-space>
  </t-dialog>

  <t-dialog
    v-model:visible="uploadFileVisible"
    header="文件上传"
    width="40%"
    :confirm-on-enter="true"
    :cancelBtn="null"
    :confirmBtn="null"
    :on-cancel="() => (uploadFileVisible = false)"
    :on-close-btn-click="() => (uploadFileVisible = false)"
    :on-overlay-click="() => (uploadFileVisible = false)"
    :on-close="() => (uploadFileVisible = false)"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-upload
        name="files"
        v-model="files"
        :action="uploadUrl"
        :abridge-name="[8, 6]"
        :multiple="true"
        :max="10"
        theme="file-flow"
        placeholder="未选择文件"
        @success="onUploadSuccess"
        @fail="onUploadError"
        @remove="onUploadRemove"
      ></t-upload>
    </t-space>
  </t-dialog>
</template>

<script setup lang="tsx">
import { defaultRowsPerPageOptions } from "@/constans";
import {
  useAdminAttachmentDeleteApi,
  useAdminAttachmentFolderApi,
  useAdminAttachmentListApi,
  useAdminAttachmentPageApi,
} from "@/api/admin/attachment";
import type Attachment from "~/server/models/Attachment";
import Cookies from "js-cookie";
import useHasAuth from "@/utils/auth";
import ContextMenu from "./ContextMenu.vue";
import { nanoid } from "nanoid";
import useImageUrl from "@/utils/imageUrl";

const { NUXT_API_BASE } = useRuntimeConfig().public;

const pidCache = ref(0);
const pid = ref(0);

const contextShow = ref(false);
const contextItemWidth = ref(180);
const contextItemHight = ref(44);
const x = ref(0);
const y = ref(0);

const folderItems = [
  {
    id: nanoid(),
    icon: "folder",
    title: "新建文件夹",
    onClick: () => {
      contextShow.value = false;
      addFolderVisible.value = true;
    },
  },
  {
    id: nanoid(),
    icon: "upload",
    title: "文件上传",
    type: "file",
    onClick: () => {
      contextShow.value = false;
      uploadFileVisible.value = true;
    },
  },
];
const fileItems = [
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
    onClick: () => {
      contextShow.value = false;
    },
  },
];

const items = ref([]);

const showMenu = function (event: MouseEvent, show: Boolean) {
  event.preventDefault();
  event.stopPropagation();
  if (show) {
    items.value = fileItems;
  } else {
    items.value = folderItems;
  }

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

// 新增文件夹
const addFolderVisible = ref(false);
const addFolderName = ref("");
const handleAddFolderVisibleConfirm = async () => {
  try {
    await useAdminAttachmentFolderApi({
      pid: pid.value,
      title: addFolderName.value,
    });
    await getData();
    MessagePlugin.success("新建成功");
  } catch {
  } finally {
    addFolderVisible.value = false;
  }
};

// 文件上传
const uploadFileVisible = ref(false);
const files = ref([]);
const uploadUrl = ref(
  NUXT_API_BASE +
    `/api/admin/attachment/file?pid=${pid.value}&Authorization=${Cookies.get(
      "token"
    )}`
);

const onUploadSuccess = (e: any) => {
  e.response.map((response, index) => {
    if (response.code !== 200) {
      MessagePlugin.error(response.msg);
      files.value[index].status = "warning";
      return;
    }
    MessagePlugin.success("文件上传成功");
  });
  getData();
};
const onUploadError = () => {
  MessagePlugin.error("文件上传失败");
};

// 点击事件
const handleParentClick = () => {
  pid.value = pidCache.value;
};
const handleFileClick = (v: Attachment) => {
  if (v.isFolder) {
    pidCache.value = pid.value;
    pid.value = v.id;
    return;
  }
  MessagePlugin.warning("不支持打开此文件类型");
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

// 分页
// const page = ref(1);
// const limit = ref(defaultRowsPerPageOptions[0]);

// const total = ref(0);

const list = ref<Attachment[]>([]);
const getData = async () => {
  const data = await useAdminAttachmentListApi({
    pid: pid.value,
  });
  list.value = data;
};

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

watch(
  () => pid.value,
  () => {
    uploadUrl.value =
      NUXT_API_BASE +
      `/api/admin/attachment/file?pid=${pid.value}&Authorization=${Cookies.get(
        "token"
      )}`;
    getData();
  }
);
getData();
</script>
