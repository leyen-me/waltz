<template>
  <v-md-preview :text="modelValue"></v-md-preview>
</template>

<script setup>
import VMdPreview from "@kangc/v-md-editor/lib/preview";
// vuepress主题
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
// 代码高亮
import Prism from "prismjs";
// 支持表情
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
// 支持TodoList
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
// 支持代码行
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// 支持代码高亮行
import createHighlightLinesPlugin from "@kangc/v-md-editor/lib/plugins/highlight-lines/index";
// 支持复制代码
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";

import "prismjs/components/prism-java";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-python";
import "prismjs/components/prism-docker";
import "@/components/BaseEditor/languages/vue";

const emits = defineEmits(["update:modelValue", "save"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
});

const { NUXT_ENV } = useRuntimeConfig().public;

// console.log(Prism());

VMdPreview.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});

if (NUXT_ENV === "production") {
  // 生产环境
  // 服务端渲染会调用两次
  // ESmodule会导致下列问题

  if (Object.hasOwnProperty.call(createEmojiPlugin, "default")) {
    VMdPreview.use(createEmojiPlugin["default"]());
  } else {
    VMdPreview.use(createEmojiPlugin());
  }

  if (Object.hasOwnProperty.call(createTodoListPlugin, "default")) {
    VMdPreview.use(createTodoListPlugin["default"]());
  } else {
    VMdPreview.use(createTodoListPlugin());
  }

  if (Object.hasOwnProperty.call(createLineNumbertPlugin, "default")) {
    VMdPreview.use(createLineNumbertPlugin["default"]());
  } else {
    VMdPreview.use(createLineNumbertPlugin());
  }

  if (Object.hasOwnProperty.call(createHighlightLinesPlugin, "default")) {
    VMdPreview.use(createHighlightLinesPlugin["default"]());
  } else {
    VMdPreview.use(createHighlightLinesPlugin());
  }

  if (Object.hasOwnProperty.call(createCopyCodePlugin, "default")) {
    VMdPreview.use(createCopyCodePlugin["default"]());
  } else {
    VMdPreview.use(createCopyCodePlugin());
  }

} else {
  // 开发环境
  VMdPreview.use(createEmojiPlugin());
  VMdPreview.use(createTodoListPlugin());
  VMdPreview.use(createLineNumbertPlugin());
  VMdPreview.use(createHighlightLinesPlugin());
  VMdPreview.use(createCopyCodePlugin());
}
</script>
