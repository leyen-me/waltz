<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
        <t-form :colon="true" :label-align="'top'" @submit="handleSave">
          <BaseSiteConfig
            :children="list"
            @change="handleSave"
          ></BaseSiteConfig>
        </t-form>
      </t-card>
    </div>
  </div>
</template>

<script setup lang="tsx">
import {
  useAdminSiteConfigListApi,
  useAdminSiteConfigSubmitApi,
} from "@/api/admin/config";
import useDebounce from "@/utils/debounce";
import type SiteConfig from "~/server/models/SiteConfig";
import {
  Space as TSpace,
  Link as TLink,
  Icon as TIcon,
  Popconfirm as TPopconfirm,
} from "tdesign-vue-next";

const list = ref<SiteConfig[]>([]);
const getData = async () => {
  const data = await useAdminSiteConfigListApi();
  list.value = data;
};

const save = async ({ id, key, value }: SiteConfig) => {
  try {
    await useAdminSiteConfigSubmitApi({
      id,
      value,
    });
    MessagePlugin.success("修改成功");
  } catch (error) {
    MessagePlugin.error("修改失败");
  }
};

const handleSave = useDebounce(save, 500);
getData();
</script>
