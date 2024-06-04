<template>
  <div class="flex flex-col ml-8 mb-16 first:ml-0">
    <div class="mt-6 first:mt-0" v-for="(v, k) in children" :key="v.id">
      <t-form-item :name="v.code" :label="v.title">
        <!-- boolean -->
        <t-radio-group
          v-if="v.type === 'boolean'"
          variant="default-filled"
          v-model="v.value"
          :disabled="!v.isChange"
          @change="handleSave(v)"
        >
          <t-radio-button value="true">开启</t-radio-button>
          <t-radio-button value="false">关闭</t-radio-button>
        </t-radio-group>

        <!-- textarea -->
        <t-textarea
          @change="handleSave(v)"
          v-else-if="v.type === 'textarea'"
          :disabled="!v.isChange"
          v-model="v.value"
          clearable
        ></t-textarea>

        <!-- dict -->
        <t-select
          v-else-if="v.type === 'dict'"
          :disabled="!v.isChange"
          v-model="v.value"
          :options="getDictOptions(v.dictType)"
          :keys="{ label: 'dictLabel', value: 'dictValue' }"
          placeholder="请选择"
        />

        <!-- string -->
        <t-input
          v-else
          :disabled="!v.isChange"
          @change="handleSave(v)"
          v-model="v.value"
          clearable
        ></t-input>
      </t-form-item>
      <template v-if="v.children && v.children.length > 0">
        <BaseSiteConfig
          :children="v.children"
          @change="(e) => handleSave(e)"
        ></BaseSiteConfig>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type SiteConfig from "~/server/models/SiteConfig";
import useAppStore from "~/stores/appStore";

const emits = defineEmits(["change"]);
const props = defineProps({
  children: {
    type: Array<SiteConfig>,
    required: true,
  },
});

const appStore = useAppStore();
const getDictOptions = (dict_type: string) => {
  const item = appStore.dictList.find((item) => item.dictType === dict_type);
  if (item) {
    return item.dataList;
  }
  return [];
};

const handleSave = (v: SiteConfig) => {
  emits("change", v);
};
</script>
