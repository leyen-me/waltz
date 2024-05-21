<template>
  <div id="follower"></div>
</template>

<script setup lang="ts">
onMounted(() => {
  document.addEventListener("mousemove", (e) => {
    const follower = document.getElementById("follower");
    const contents = document.querySelectorAll(".home");

    // 更新小圆圈的位置
    follower.style.left = e.pageX + "px";
    follower.style.top = e.pageY + "px";
    follower.style.opacity = 1; // 显示圆圈

    // 遍历所有内容元素，判断鼠标是否在其上方
    contents.forEach((content) => {
      const rect = content.getBoundingClientRect();
      if (
        e.clientX > rect.left &&
        e.clientX < rect.right &&
        e.clientY > rect.top &&
        e.clientY < rect.bottom
      ) {
        // 鼠标在元素上，改变样式
        // content.style.color = "black"; // 反色效果
        // follower.style.transform = "scale(2)"; // 圆圈变大
      } else {
        // 鼠标不在元素上，恢复默认样式
        // content.style.color = "white";
        // follower.style.transform = "scale(1)";
      }
    });
  });
});
</script>

<style scoped>
#follower {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  pointer-events: none; /* 防止圆圈影响鼠标事件 */
  opacity: 0; /* 默认隐藏 */
  transition: all 0.2s ease; /* 动画过渡效果 */
  z-index: 1000; /* 确保圆圈在顶层 */
}
</style>
