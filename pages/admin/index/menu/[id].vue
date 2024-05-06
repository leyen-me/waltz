<template>
  <Card>
    <template #content>
      <form>
        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >菜单名称</label
            >
            <div class="mt-2">
              <InputText type="text" v-model="value" />
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >路径</label
            >
            <div class="mt-2">
              <InputText type="text" v-model="value" />
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >路径</label
            >
            <div class="mt-2">
              <InputText type="text" v-model="value" />
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >路径</label
            >
            <div class="mt-2">
              <InputText type="text" v-model="value" />
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >路径</label
            >
            <div class="mt-2">
              <InputText type="text" v-model="value" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
const value = ref();
</script>
