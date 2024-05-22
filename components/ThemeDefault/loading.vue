<template>
  <div
    class="dot-container w-full h-[500px] flex justify-center items-center bg-[var(--theme-loading-bg-color)] my-8"
  >
    <div class="dot w-[80px] h-[80px] xl:w-[120px] xl:h-[120px]"></div>
    <div class="dot w-[80px] h-[80px] xl:w-[120px] xl:h-[120px]"></div>
  </div>
</template>

<style scoped>
.dot-container {
  filter: contrast(50);
  overflow: hidden;
  font-size: 24px;
}

.dot {
  position: relative;
  border-radius: 999px;
  animation: r 1500ms linear infinite;
  animation-fill-mode: forwards;
}

.dot:first-child {
  transform-origin: bottom right;
}
.dot:last-child {
  transform-origin: top left;
}

.dot::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  filter: blur(25px);
  border-radius: 999px;
}

@keyframes r {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
