<template>
  <template v-for="menu in menus" :key="menu.path">
    <!-- 没有children的一级菜单不显示 -->
    <template v-if="level <= 1 && menu.children.length <= 0"></template>
    <t-menu-item
      :value="menu.path"
      v-else-if="!menu.children || (menu.children && menu.children.length <= 0)"
      style="--td-text-color-secondary: rgba(255, 255, 255, 0.9)"
    >
      <template #icon>
        <t-icon :name="menu.icon" v-if="menu.icon" />
      </template>
      {{ menu.title }}
    </t-menu-item>
    <template v-else>
      <t-menu-group
        v-if="level <= 1"
        :title="menu.title"
        style="--td-text-color-placeholder: rgba(255, 255, 255, 0.5)"
      >
        <BaseMenu :menus="menu.children" :level="level + 1" />
      </t-menu-group>
      <!-- 三级以上显示 -->
      <t-submenu v-else :value="menu.path" :title="menu.title">
        <template #icon>
          <t-icon :name="menu.icon" v-if="menu.icon" />
        </template>
        <BaseMenu :menus="menu.children" />
      </t-submenu>
    </template>
  </template>
</template>

<script setup lang="ts">
const props = defineProps({
  menus: {
    type: Array<any>,
    required: true,
  },
  level: {
    type: Number,
    required: false,
    default: () => 1,
  },
});
</script>
