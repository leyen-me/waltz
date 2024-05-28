<template>
  <t-select-input
    :value="modelValue"
    :popup-visible="popupVisible"
    :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
    placeholder="请选择"
    clearable
    @clear="handleClear"
    @popup-visible-change="(e) => (popupVisible = e)"
    @input-change="handleInputChange"
  >
    <template #panel>
      <ul class="h-80 overflow-y-auto cursor-pointer">
        <li
          class="h-8 flex items-center"
          style="border-bottom: solid 1px rgba(0, 0, 0, 0.2)"
          v-for="item in manifest"
          :key="item.icon"
          @click="() => handleClick(item)"
        >
          <t-icon :name="item.stem" size="16px"></t-icon>
          <span class="ml-2">
            {{ item.stem }}
          </span>
        </li>
      </ul>
    </template>
    <template #suffixIcon>
      <t-icon name="chevron-down"></t-icon>
    </template>
  </t-select-input>
</template>

<script setup lang="ts">
import { manifest } from "tdesign-icons-vue-next";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
  },
});
const popupVisible = ref(false);

const handleClear = () => {
  popupVisible.value = false;
  emits("update:modelValue", "");
};
const handleClick = (item: any) => {
  popupVisible.value = false;
  emits("update:modelValue", item.stem);
};
const handleInputChange = () => {};
</script>
