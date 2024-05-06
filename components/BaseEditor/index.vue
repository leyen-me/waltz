<template>
    <v-md-editor v-model="modelValue.content" :left-toolbar :rightToolbar height="95.5vh" :autofocus="true"
        @save="emits('save')" placeholder="文章内容" :disabled-menus="[]"
        @upload-image="(event, insertImage, files) => emits('upload', event, insertImage, files)"></v-md-editor>
</template>
<!--  -->

<script setup>
// 基础
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

// github主题
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// 代码高亮
import hljs from './js/highlight';
import './css/highlight.css';

// 支持表情
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

// 支持公式
import "./css/katex.min.css"
import "./js/katex.min.js"
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn'

// 支持流程图
import "./js/mermaid.min.js"
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';

// 支持TodoList
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

// 支持代码行
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

// 支持代码高亮行
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';

// 支持复制代码
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';

const emits = defineEmits(['update:modelValue', 'save'])
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            content: ""
        }
    }
})

// const innerValue = ref(props.modelValue)
// watch(() => props.modelValue, (newValue, oldValue) => {
//     innerValue.value = newValue
// })


VMdEditor.use(githubTheme, {
    Hljs: hljs,
});
VMdEditor.use(createEmojiPlugin())
VMdEditor.use(createMermaidPlugin())
VMdEditor.use(createKatexPlugin())
VMdEditor.use(createTodoListPlugin())
VMdEditor.use(createLineNumbertPlugin())
VMdEditor.use(createHighlightLinesPlugin())
VMdEditor.use(createCopyCodePlugin())
// VMdEditor.use(createImageManagerPlugin())

const leftToolbar = ref("bold clear code emoji h hr image-manager italic link ol quote strikethrough table ul todo-list tip image redo undo save")
const rightToolbar = ref("preview review toc sync-scroll fullscreen")
</script>