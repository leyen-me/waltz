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
          <div class="fixed inset-0 bg-gray-900/80" />
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
                  <IconXmark
                    class="!text-white"
                    @click="sidebarOpen = false"
                  ></IconXmark>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <BaseNav
                :items="menus"
                @item-click="handleNavItemClick"
              ></BaseNav>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <BaseNav :items="menus" @item-click="handleNavItemClick"></BaseNav>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden dark:bg-[var(--surface-ground)]"
    >
      <IconMenu class="p-[2px]" @click="sidebarOpen = true"></IconMenu>
      <span truncated class="flex-1 text-sm font-semibold leading-6">
        <span class="sr-only">手机端标题</span>
      </span>
    </div>

    <!-- Not beyond the full screen of the phone, beyond the phone flex-1 -->
    <main class="flex-1 p-5 lg:w-0 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useAdminMenuNavApi } from "@/api/admin/menu";
import type Menu from "~/server/models/Menu";

definePageMeta({
  middleware: "auth",
});

const sidebarOpen = ref(false);
const menus = ref<Menu[]>([]);

const getData = async () => {
  const data = await useAdminMenuNavApi();
  menus.value = data;
  console.log(data);
};

const route = useRoute();
const router = useRouter();

if (route.path === "/admin") {
  router.replace("/admin/home");
}

const handleNavItemClick = (url: string) => {
  router.push(url);
  if (sidebarOpen.value) {
    sidebarOpen.value = false;
  }
};

getData();
</script>

<style scoped>
::v-deep(.menu) {
  overflow: hidden;
}

::v-deep(.menu .p-menu-list) {
  flex: 1;
  height: 0;
  overflow-y: auto;
}
</style>
