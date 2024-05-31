<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed top-0 left-0 z-[500] w-full h-full bg-[rgba(0,0,0,0.4)]"
      @click="handleClose"
      @contextmenu="handleClose"
    >
      <div
        class="absolute rounded-md bg-[var(--web-bg-6)] border border-[var(--web-border-1)] border-solid"
        :style="{ top: y + 'px', left: x + 'px', width: w + 'px' }"
      >
        <ul>
          <li
            @click.stop="v.onClick && v.onClick()"
            class="h-8"
            style="border-bottom: 1px solid var(--web-border-1)"
            :style="{ height: h + 'px' }"
            v-for="(v, k) in items"
            :key="v.id"
          >
            <t-button
              style="
                width: 100%;
                height: 100%;
                border-radius: 0;
                justify-content: flex-start;
              "
              variant="text"
            >
              <div class="flex items-center justify-start">
                <t-icon :name="v.icon" size="16px"></t-icon>
                <span class="ml-2 text-sm">{{ v.title }}</span>
              </div>
            </t-button>
          </li>
        </ul>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  items: {
    type: Array<any>,
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
  w: {
    type: Number,
    required: true,
  },
  h: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const handleClose = (event: MouseEvent) => {
  event.preventDefault();
  emits("update:modelValue", false);
};
</script>
