<template>
  <div class="h-full flex flex-col lg:flex-row">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-50 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-[var(--web-bg-1)]" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <t-button
                    @click="sidebarOpen = false"
                    shape="square"
                    variant="text"
                    class="-m-2.5 p-2.5 lg:hidden"
                  >
                    <t-icon name="close"></t-icon>
                  </t-button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <Nav
                :currentChatId
                :chatList
                @add="handleAdd"
                @deleteAll="handleDeleteAll"
                @navClick="handleOpenChat"
                @delete="handleDelete"
              ></Nav>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <Nav
        :currentChatId
        :chatList
        @add="handleAdd"
        @deleteAll="handleDeleteAll"
        @navClick="handleOpenChat"
        @delete="handleDelete"
      ></Nav>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden bg-[var(--web-bg-7)]"
    >
      <!-- <button
        type="button"
        class="-m-2.5 p-2.5 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button> -->

      <t-button
        @click="sidebarOpen = true"
        shape="square"
        variant="text"
        class="-m-2.5 p-2.5 lg:hidden"
      >
        <t-icon name="system-3"></t-icon>
      </t-button>
      标题

      <!-- <el-text truncated class="flex-1 text-sm font-semibold leading-6 text-gray-900">
            {{
          chatList.find((chat) => chat.id === currentChatId)
            ? chatList.find((chat) => chat.id === currentChatId).title
            : ""
            }}
          </el-text> -->
    </div>

    <main class="flex-1 lg:w-0" :key>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { watch, toRefs, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  useAdminChatChatListApi,
  useAdminChatDeleteAllApi,
  useAdminChatDeleteApi,
} from "@/api/admin/chat/chat";
import Nav from "./nav.vue";
import { nanoid } from "nanoid";
import type Chat from "~/server/models/Chat";

const route = useRoute();
const router = useRouter();

const sidebarOpen = ref(false);
const currentChatId = ref(Number(route.params.id) || 0);
const key = ref<number>(currentChatId.value);
const chatList = ref<Chat[]>([]);

const { params, query } = toRefs(route);
watch(params, (newParams, oldParams) => {
  if (oldParams.id === "0" && newParams.id !== "0") {
    getData();
    currentChatId.value = Number(newParams.id);
  }
});

watch(query, (newQuery, oldQuery) => {
  if (newQuery.r) {
    getData();
  }
});

const handleAdd = () => {
  handleOpenChat({ id: "0" });
};

const handleOpenChat = (chat: Chat) => {
  currentChatId.value = chat.id as number;
  key.value = nanoid() as unknown as number;
  router.push("/app/chatgpt/c/" + currentChatId.value);
  sidebarOpen.value = false;
};

const getData = async () => {
  try {
    const response = await useAdminChatChatListApi();
    chatList.value = response;
  } catch (error) {}
};

const handleDeleteAll = () => {
  const dialog = DialogPlugin.confirm({
    header: "提示",
    body: "确定全部清除吗?",
    cancelBtn: "取消",
    onConfirm: async () => {
      try {
        dialog.update({ confirmBtn: { content: "删除中", loading: true } });
        await useAdminChatDeleteAllApi();
        MessagePlugin.success("清除成功");
        await getData();
        handleAdd();
      } catch (error) {
      } finally {
        dialog.destroy();
      }
    },
  });
};

const handleDelete = (chat: Chat) => {
  const dialog = DialogPlugin.confirm({
    header: "提示",
    body: "确定删除该聊天吗?",
    cancelBtn: "取消",
    onConfirm: async () => {
      try {
        dialog.update({ confirmBtn: { content: "删除中", loading: true } });
        await useAdminChatDeleteApi(chat.id);
        MessagePlugin.success("删除成功");
        await getData();
        if (currentChatId.value === chat.id) {
          handleAdd();
        }
      } catch (error) {
      } finally {
        dialog.destroy();
      }
    },
  });
};

if (!currentChatId.value) {
  handleAdd();
}
getData();
</script>
