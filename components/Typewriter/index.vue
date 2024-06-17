<template>
  {{ displayedText }}
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const textIndex = ref(0);
const textList = ref(props.text.split("&"));
const displayedText = ref("");

let index = ref(0);
let isTyping = ref(true);

let t3: any = null;
let t4: any = null;

watch(
  () => isTyping.value,
  (newValue) => {
    if (t3) {
      clearTimeout(t3);
    }
    if (newValue) {
      // 前进
      let t1 = setInterval(() => {
        if (index.value < textList.value[textIndex.value].length) {
          displayedText.value += textList.value[textIndex.value].charAt(
            index.value
          );
          index.value++;
        } else {
          if (t1) {
            clearInterval(t1);
          }
          // 当到达字符串末尾时，开始回退
          t3 = setTimeout(() => {
            isTyping.value = false;
          }, 2000);
        }
      }, 100);
    } else {
      // 回退
      let t2 = setInterval(() => {
        if (index.value >= 0) {
          displayedText.value = displayedText.value.slice(0, -1);
          index.value--;
        } else {
          // 当文本被完全回退后，重新开始打字
          if (textIndex.value >= textList.value.length - 1) {
            textIndex.value = 0;
          } else {
            textIndex.value += 1;
          }
          if (t2) {
            clearInterval(t2);
          }
          isTyping.value = true;
        }
      }, 100);
    }
  }
);

onMounted(() => {
  // 默认显示第一条
  displayedText.value = textList.value[textIndex.value];
  index.value = textList.value[textIndex.value].length - 1;

  // 2秒后切换下一条
  t4 = setTimeout(() => {
    isTyping.value = false; // 回退标识
  }, 2000);
});

onUnmounted(() => {
  if (t4) {
    clearTimeout(t4);
  }
});
</script>

<style scoped></style>
