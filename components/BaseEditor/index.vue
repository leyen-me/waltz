<template>
  <v-md-editor
    v-model="modelValue.content"
    :left-toolbar
    :rightToolbar
    height="auto"
    :autofocus="true"
    placeholder="文章内容"
    :disabled-menus="[]"
    @save="emits('save')"
    @info="emits('info')"
    @upload-image="(event:any, insertImage:any, files:any) => emits('upload', event, insertImage, files)"
  ></v-md-editor>
</template>

<script setup lang="ts">
/**
 * base
 * 基础
 */
import VMdEditor from "@kangc/v-md-editor";
/**
 * vuepress theme
 * vuepress 主题
 */
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
/**
 * Code Highlighting
 * 代码高亮
 */
import Prism from "prismjs";
/**
 * emoji
 * 表情
 */
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
/**
 * Show code line
 * 显示代码行
 */
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
/**
 * Line of Code Highlighting
 * 代码行高亮
 */
import createHighlightLinesPlugin from "@kangc/v-md-editor/lib/plugins/highlight-lines/index";

/**
 * Copy Code
 * 复制代码
 */
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";

/**
 * 基础信息
 */
import createInfoPlugin from "./plugins/info";

const emits = defineEmits(["update:modelValue", "save", "info", "upload"]);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      content: "";
    },
  },
});

VMdEditor.use(vuepressTheme, {
  Prism,
  extend(md: any) {
    /**
     * md is an instance of markdown-it, where you can modify the configuration and use the plugin to extend the syntax.
     *
     * md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
     * md.set(option).use(plugin);
     */
  },
});
VMdEditor.use(createEmojiPlugin());
VMdEditor.use(createLineNumbertPlugin());
VMdEditor.use(createHighlightLinesPlugin());
VMdEditor.use(createCopyCodePlugin());
VMdEditor.use(createInfoPlugin());

const leftToolbar = ref(
  "bold clear code emoji h hr italic link ol quote strikethrough table ul tip image redo undo save info"
);
const rightToolbar = ref("preview sync-scroll fullscreen");
</script>
