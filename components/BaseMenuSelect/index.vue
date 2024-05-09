<template>
  <t-select-input
    :value="modelValue.join(',')"
    :popup-visible="popupVisible"
    placeholder="请选择"
    :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
    clearable
    @clear="handleClear"
    @popup-visible-change="(e) => (popupVisible = e)"
    @input-change="handleInputChange"
  >
    <template #panel>
      <div class="w-full h-80 overflow-y-auto">
        <t-tree
          ref="tree"
          :actived="modelValue"
          :data="menuList"
          :checkable="true"
          :check-strictly="false"
          :value-mode="'onlyLeaf'"
          :keys="{ label: 'title', value: 'id' }"
          hover
          expand-all
          @change="onChange"
        />
      </div>
    </template>
    <template #suffixIcon>
      <t-icon name="chevron-down"></t-icon>
    </template>
  </t-select-input>
</template>

<script setup lang="ts">
import type Menu from "@/server/models/Menu";
import type { TreeNodeValue } from "tdesign-vue-next/es/tree";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Array<TreeNodeValue>,
    required: true,
  },
  menuList: {
    type: Array<Menu>,
    required: true,
  },
});
const popupVisible = ref(false);

const handleClear = () => {
  popupVisible.value = false;
  emits("update:modelValue", []);
};
const onChange = (e: Array<TreeNodeValue>) => {
  emits("update:modelValue", e);
};
const handleInputChange = () => {};
</script>
