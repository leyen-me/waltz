<template>
  <div class="cursor">
    <span>阅读</span>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { isMobile } from "~/common/utils/osUtil";
import type Article from "~/server/models/Article";

/**
 * 该组件仅在电脑端显示
 */

const props = defineProps({
  list: {
    type: Array<Article>,
    required: true,
  },
  home: {
    type: Boolean,
    required: true,
  },
});

let cursor: any = null;
let span: any = null;
let t: any = null;
let initSize = 24;

/**
 * 监听主页
 */
const addEventListenerHome = () => {
  t = setTimeout(() => {
    const articleItems = document.querySelectorAll(".article-item");
    articleItems.forEach((articleItem) => {
      articleItem.addEventListener("mouseover", () => {
        gsap.to(cursor, {
          scale: 3,
          duration: 1,
          ease: "power3.out",
        });
        gsap.to(span, {
          opacity: 1,
          scale: 1,
          ease: "power3.out",
        });
      });
      articleItem.addEventListener("mouseout", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 1,
          ease: "power3.out",
        });
        gsap.to(span, {
          opacity: 0,
          scale: 0,
          ease: "power3.out",
        });
      });
    });
  }, 500);
};

const addEventListenerDetail = () => {
  t = setTimeout(() => {
    const linkItems = document.querySelectorAll("a");
    linkItems.forEach((link) => {
      link.addEventListener("mouseover", () => {
        gsap.to(cursor, {
          scale: 3,
          duration: 1,
          ease: "power3.out",
        });
      });
      link.addEventListener("mouseout", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 1,
          ease: "power3.out",
        });
      });
    });
  }, 500);
};

const cursorMove = (e: MouseEvent) => {
  gsap.to(cursor, {
    x: e.clientX + "px",
    y: e.clientY + "px",
    duration: 1,
    ease: "power3.out",
  });
};

onMounted(() => {
  cursor = document.querySelector(".cursor");
  span = document.querySelector(".cursor span");
  if (isMobile()) {
    return;
  }
  gsap.to(cursor, {
    width: initSize + "px",
    height: initSize + "px",
  });
  document.body.style.cursor = "none";

  watch(
    () => props.list,
    async () => {
      if (t) {
        clearTimeout(t);
      }
      if (props.home) {
        addEventListenerHome();
      } else {
        addEventListenerDetail();
      }
    },
    {
      immediate: true,
    }
  );

  document.addEventListener("mousemove", cursorMove);
});

onUnmounted(() => {
  if (isMobile()) {
    return;
  }
  document.body.style.cursor = "auto";
  document.removeEventListener("mousemove", cursorMove);
});
</script>

<style scoped>
.cursor {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 999px;
  pointer-events: none;
  mix-blend-mode: difference;
}

.cursor span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4px;
  opacity: 0;
  color: rgba(255, 136, 0, 0.833);
}
</style>
