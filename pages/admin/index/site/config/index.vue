<template>
  <div class="h-full flex xl:justify-center">
    <div class="w-full xl:w-[680px]">
      <t-card title="基本信息">
        <t-form :colon="true" :label-align="'top'" @submit="handleSave">
          <t-form-item
            :name="v.key"
            :label="v.desc"
            v-for="(v, k) in list"
            :key="v.id"
          >
            <!-- boolean -->
            <t-radio-group
              v-if="v.type === 'boolean'"
              variant="default-filled"
              v-model="v.value"
              @change="handleSave(v)"
            >
              <t-radio-button value="true">开启</t-radio-button>
              <t-radio-button value="false">关闭</t-radio-button>
            </t-radio-group>

            <!-- string -->
            <t-input
              @change="handleSave(v)"
              v-else
              v-model="v.value"
              clearable
            ></t-input>
          </t-form-item>
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

const router = useRouter();

const list = ref<SiteConfig[]>([]);
const getData = async () => {
  const data = await useAdminSiteConfigListApi();
  list.value = data;
};

const save = async ({ id, key, value }) => {
  try {
    await useAdminSiteConfigSubmitApi({
      id,
      value,
    });
    getData();
  } catch (error) {
    MessagePlugin.success("修改失败");
  }
};

const handleSave = useDebounce(save, 500);
getData();
</script>
