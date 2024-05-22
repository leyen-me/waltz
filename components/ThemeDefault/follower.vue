<template>
  <div id="follower"></div>
</template>

<script setup lang="ts">
let cursor: HTMLElement | null = null;
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let scale = 1;
let speed = 0.5;

function animate() {
  let distX = mouseX - cursorX;
  let distY = mouseY - cursorY;
  cursorX = cursorX + distX * speed;
  cursorY = cursorY + distY * speed;
  cursor!.style.transform = `scale(${scale})`;
  cursor!.style.left = cursorX + "px";
  cursor!.style.top = cursorY + "px";
  requestAnimationFrame(animate);
}

onMounted(() => {
  cursor = document.querySelector("#follower");
  animate();
  document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
    const contents = document.querySelectorAll("h1,h3,p,img,h2,span,a");
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      const rect = content.getBoundingClientRect();
      if (
        event.clientX > rect.left &&
        event.clientX < rect.right &&
        event.clientY > rect.top &&
        event.clientY < rect.bottom
      ) {
        scale = 2.4;
        break
      } else {
        scale = 1;
      }
    }
  });
  document.addEventListener("mousedown", (event) => {
    scale = 2.4;
  });
  document.addEventListener("mouseup", (event) => {
    scale = 1;
  });
});
</script>

<style scoped>
#follower {
  width: 28px;
  height: 28px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background-color: white;
  pointer-events: none;
  transition: transform 550ms ease;
  z-index: 1000;
  mix-blend-mode: difference;
}
</style>
