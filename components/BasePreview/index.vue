<template>
  <v-md-preview :text="modelValue"></v-md-preview>
</template>

<script setup>
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";

// vuepress主题
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// 代码高亮
import Prism from 'prismjs';

// 支持表情
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";

// 支持TodoList
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";

// 支持代码行
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";

// 支持代码高亮行
import "@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css";
import createHighlightLinesPlugin from "@kangc/v-md-editor/lib/plugins/highlight-lines/index";

// 支持复制代码
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";

const emits = defineEmits(["update:modelValue", "save"]);
const props = defineProps({
  modelValue: {
    type: String,
    default: () => "",
  },
});


VMdPreview.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});
VMdPreview.use(createEmojiPlugin());
VMdPreview.use(createTodoListPlugin());
VMdPreview.use(createLineNumbertPlugin());
VMdPreview.use(createHighlightLinesPlugin());
VMdPreview.use(createCopyCodePlugin());
</script>
