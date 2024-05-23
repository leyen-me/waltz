<template>
  <div id="follower"></div>
</template>

<script setup lang="ts">
import useDebounce from "~/utils/debounce";
const props = defineProps({
  parent: {
    type: String,
    required: true,
  },
});

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

const handleMouseMove = useDebounce((event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
  props.parent.split(",").map((p) => {
    const elements = document.querySelectorAll(`${p} *`);
    const targetElements = Array.prototype.filter.call(
      elements,
      function (element) {
        return ["H1", "H3", "P", "IMG", "H2", "SPAN", "A", "INPUT"].includes(
          element.tagName
        );
      }
    );
    for (let i = 0; i < targetElements.length; i++) {
      const content = targetElements[i];
      const rect = content.getBoundingClientRect();
      if (
        event.clientX > rect.left - 10 &&
        event.clientX < rect.right + 10 &&
        event.clientY > rect.top - 10 &&
        event.clientY < rect.bottom + 10
      ) {
        scale = 2.4;
        break;
      } else {
        scale = 1;
      }
    }
  });
}, 5);

onMounted(() => {
  cursor = document.querySelector("#follower");
  animate();
  document.addEventListener("mousemove", handleMouseMove);
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
  transition: transform 500ms ease;
  z-index: 1000;
  mix-blend-mode: difference;
}
</style>
