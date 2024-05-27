<template>
    <div class="h-full flex flex-col lg:flex-row">
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
          <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>
  
          <div class="fixed inset-0 flex">
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full" enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
              leave-to="-translate-x-full">
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                  enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <!-- Sidebar component, swap this element with another sidebar if you like -->
                <Nav :currentChatId :chatList @add="handleAdd" @deleteAll="handleDeleteAll" @logout="handleLogout"
                  @navClick="handleOpenChat" @delete="handleDelete"></Nav>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
  
      <!-- Static sidebar for desktop -->
      <div class="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <Nav :currentChatId :chatList @add="handleAdd" @deleteAll="handleDeleteAll" @logout="handleLogout"
          @navClick="handleOpenChat" @delete="handleDelete"></Nav>
      </div>
  
      <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        
        <!-- 标题 -->

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
  
  <script setup lang="js">
  import { watch, toRefs, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
  } from "@headlessui/vue";
//   import {
//     Bars3Icon,
//     CalendarIcon,
//     ChartPieIcon,
//     DocumentDuplicateIcon,
//     FolderIcon,
//     HomeIcon,
//     UsersIcon,
//     XMarkIcon,
//     ChatBubbleOvalLeftEllipsisIcon,
//   } from "@heroicons/vue/24/outline";
  import useUserStore from "@/stores/userStore";
//   import { useChatListApi, useChatDeleteAllApi, useChatDeleteApi } from "@/api/chat";
  // import { ElMessageBox, ElMessage } from "element-plus"
  import Nav from "./nav.vue";
  import { nanoid } from "nanoid";
  
  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore();
  
  const sidebarOpen = ref(false);
  const currentChatId = ref(route.params.id);
  const key = ref(currentChatId.value);
  const chatList = ref([]);
  
  
  const { params, query } = toRefs(route);
  
  watch(params, (newParams, oldParams) => {
    if (oldParams.id === "new" && newParams.id !== "new") {
      getData()
      currentChatId.value = newParams.id
    }
  });
  
  watch(query, (newQuery, oldQuery) => {
    if (newQuery.r) {
      getData()
    }
  });
  
  
  const handleAdd = () => {
    handleOpenChat({ id: "new" })
  };
  
  const handleOpenChat = (chat) => {
    currentChatId.value = chat.id;
    key.value = nanoid();
    router.push("/app/chatgpt/c/" + currentChatId.value)
    sidebarOpen.value = false;
  };
  
  const getData = async () => {
    try {
      const response = await useChatListApi();
      chatList.value = response.data;
    } catch (error) { }
  };
  
  const handleDeleteAll = () => {
    ElMessageBox.confirm("确定全部清除吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        try {
          await useChatDeleteAllApi();
          ElMessage.success("清除成功");
          await getData();
          handleAdd();
        } catch (error) { }
      })
      .catch(() => { });
  };
  
  const handleDelete = (chat) => {
    ElMessageBox.confirm("确定删除该聊天吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        try {
          await useChatDeleteApi(chat.id);
          ElMessage.success("清除成功");
          await getData();
  
          if (currentChatId.value === chat.id) {
            handleAdd();
          }
        } catch (error) { }
      })
      .catch(() => { });
  }
  
  const handleLogout = () => {
    ElMessageBox.confirm("确定要退出登录吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(async () => {
        userStore.logout()
      })
      .catch(() => { });
  };
  
  getData();
  </script>