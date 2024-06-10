<template>
  <div class="w-full h-full" @contextmenu="(e) => showMenu(e, false)">
    <t-card title="" style="height: 100%">
      <div class="flex items-center">
        <span class="mr-4">目录:</span>
        <t-button variant="text" style="padding: 0">/</t-button>
        <t-button style="padding: 0 4px" variant="text"
          @click="handleFileClick({ id: 0, isFolder: true }, true)">root</t-button>
        <t-button variant="text" style="padding: 0">/</t-button>
        <div v-for="(v, k) in currentDir" :key="v.id">
          <t-button variant="text" style="padding: 0 4px" @click="handleFileClick(v, true)">{{ v.title }}
          </t-button>
          <t-button variant="text" style="padding: 0">/</t-button>
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <t-space>
          <t-button v-if="pid !== 0" @click="handleParentClick">返回</t-button>
          <t-button @click="folderItems[1].onClick">上传</t-button>
          <t-button @click="folderItems[0].onClick">新建文件夹</t-button>
        </t-space>
      </div>
      <div class="mt-4 h-full">
        <t-table height="70vh" ref="tableRef" row-key="id" :data="list" :columns="columns"
          :onRowClick="(v) => handleFileClick(v.row)"></t-table>
      </div>
    </t-card>
  </div>

  <ContextMenu v-model="contextShow" :items :x :y :h="contextItemHight" :w="contextItemWidth"></ContextMenu>

  <t-dialog v-model:visible="addFolderVisible" header="新建文件夹" :confirm-on-enter="true"
    :on-cancel="() => (addFolderVisible = false)" :on-close-btn-click="() => (addFolderVisible = false)"
    :on-overlay-click="() => (addFolderVisible = false)" :on-close="() => (addFolderVisible = false)"
    :on-confirm="handleAddFolderVisibleConfirm">
    <t-space direction="vertical" style="width: 100%">
      <t-input v-model="addFolderName" placeholder="文件夹名称"></t-input>
    </t-space>
  </t-dialog>

  <t-dialog v-model:visible="uploadFileVisible" header="文件上传" width="40%" :confirm-on-enter="true"
    :cancelBtn="() => null" :confirmBtn="() => null" :on-cancel="() => (uploadFileVisible = false)"
    :on-close-btn-click="() => (uploadFileVisible = false)" :on-overlay-click="() => (uploadFileVisible = false)"
    :on-close="() => (uploadFileVisible = false)">
    <t-space direction="vertical" style="width: 100%">
      <t-upload name="files" v-model="files" :action="uploadUrl" :abridge-name="[8, 6]" :multiple="true" :max="10"
        theme="file-flow" placeholder="未选择文件" @success="onUploadSuccess" @fail="onUploadError"></t-upload>
    </t-space>
  </t-dialog>

  <t-image-viewer showOverlay :closeOnOverlay="true" v-model:visible="imageViewerVisible" draggable mode="modal"
    :images="[imageViewerUrl]">
  </t-image-viewer>
</template>

<script setup lang="tsx">
import { defaultRowsPerPageOptions } from "~/constants";
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
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
} from "tdesign-vue-next";
import { imageMimeTypes } from '@/common/utils/fileUtil';
import { copyText } from "@/common/utils/clipboardUtil";

// 图片预览
const imageViewerVisible = ref(false)
const imageViewerUrl = ref("")

const { NUXT_API_BASE, NUXT_API_STATIC_BASE } = useRuntimeConfig().public;

const pidCache = ref<number[]>([]);
const pid = ref(0);
const currentDir = ref<Attachment[]>([]);

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
      addFolderName.value = "";
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
      files.value = [];
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
      moveFileVisible.value = true;
    },
  },
  {
    id: nanoid(),
    icon: "delete",
    title: "删除",
    onClick: () => {
      contextShow.value = false;
      useDeleteConfirm(useAdminAttachmentDeleteApi, optionId.value, () => {
        getData();
      });
    },
  },
];
const columns = [
  {
    colKey: "id",
    title: "ID",
    ellipsis: true,
  },
  {
    colKey: "id",
    title: "预览",
    ellipsis: true,
    cell: (_h: any, { row }: any) => {
      return (
        <div class="h-full flex item-center">
          {
            imageMimeTypes.includes(row.type) ? (
              <img class="w-8 h-8" src={NUXT_API_STATIC_BASE + '/' + row.id} onclick={() => { imageViewerUrl.value = NUXT_API_STATIC_BASE + '/' + row.id; imageViewerVisible.value = true }} />
            ) : (
              <></>
            )
          }
        </div>
      );
    },
  },
  {
    colKey: "title",
    title: "文件名",
    ellipsis: true,
    cell: (_h: any, { row }: any) => {
      return (
        <div
          class={
            row.type === "folder"
              ? "text-[var(--web-color-7)] font-semibold flex items-center"
              : "text-[#FFF] flex items-center"
          }
        >
          {row.type === "folder" ? (
            <TIcon name="folder"></TIcon>
          ) : (
            <TIcon name="file"></TIcon>
          )}
          <p class={"line-clamp-1 ml-2 w-0 flex-1"}>{row.title}</p>
        </div>
      );
    },
  },
  {
    colKey: "size",
    title: "大小(Mb)",
    ellipsis: true,
  },
  {
    colKey: "type",
    title: "类型",
    ellipsis: true,
  },
  {
    colKey: "createdAt",
    title: "创建时间",
    ellipsis: true,
  },
  {
    colKey: "operate",
    title: "操作",
    cell: (_h: any, { row }: any) => {
      return (
        <div class={"w-32"}>
          <TSpace>
            {row.type !== "folder" ? (
              <TLink
                variant="text"
                hover="color"
                disabled={row.type === "folder"}
                onClick={(e: MouseEvent) => {
                  copyText(NUXT_API_STATIC_BASE + '/' + row.id)
                }}
              >
                复制
              </TLink>
            ) : (
              <></>
            )}
            {row.type !== "folder" ? (
              <TLink
                variant="text"
                hover="color"
                disabled={row.type === "folder"}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  optionId.value = row.id;
                  window.open(useImageUrl("/" + String(optionId.value)));
                }}
              >
                下载
              </TLink>
            ) : (
              <></>
            )}
            <TPopconfirm
              content="确认删除吗"
              onConfirm={async () => {
                optionId.value = row.id;
                try {
                  await useAdminAttachmentDeleteApi(optionId.value);
                  MessagePlugin.success("删除成功");
                  getData();
                } catch { }
              }}
            >
              <TLink
                variant="text"
                hover="color"
                theme="danger"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                }}
              >
                删除
              </TLink>
            </TPopconfirm>
          </TSpace>
        </div>
      );
    },
  },
];

const items = ref([]);

const optionId = ref<number>(0);
const showMenu = function (event: MouseEvent, id: number) {
  event.preventDefault();
  event.stopPropagation();
  optionId.value = 0;
  if (id) {
    optionId.value = id;
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

// 文件移动
const moveFileVisible = ref(false);

// 点击事件
const handleParentClick = () => {
  pid.value = pidCache.value[pidCache.value.length - 1];
  pidCache.value.splice(pidCache.value.length - 1, 1);
  currentDir.value.splice(currentDir.value.length - 1, 1);
};
const handleFileClick = (v: Attachment, flag: Boolean) => {
  if (v.isFolder) {
    if (flag) {
      if (v.id !== pid.value) {
        list.value = [];
        if (v.id === 0) {
          currentDir.value = [];
          pidCache.value = [];
          pid.value = 0;
          return;
        }
        let index = currentDir.value.findIndex((dir) => dir.id === v.id);
        currentDir.value.splice(index + 1);
        pidCache.value.push(currentDir.value[currentDir.value.length - 1].pid);
        pid.value = v.id as number;
      }
    } else {
      list.value = [];
      pidCache.value.push(pid.value);
      currentDir.value.push(v);
      pid.value = v.id as number;
    }
    return;
  }
};

const list = ref<Attachment[]>([]);
const getData = async () => {
  const data = await useAdminAttachmentListApi({
    pid: pid.value,
  });
  list.value = data;
};

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
