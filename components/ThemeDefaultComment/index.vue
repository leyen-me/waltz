<template>
  <div v-for="(v, k) in commmentList" :key="v.id" class="mt-8">
    <t-comment
      avatar="https://tdesign.gtimg.com/site/avatar.jpg"
      :datetime="v.createdAt"
      :content="v.content"
      class="comment-reply"
    >
      <template #author>
        <template v-if="level === 1">
          <span>{{ v.username }}</span>
        </template>
        <template v-else>
          <span>{{ v.username }}</span>
          <t-icon
            name="caret-right-small"
            size="medium"
            style="margin: 0 4px"
          />
          <span>{{ v.parentUsername }}</span>
        </template>
      </template>
      <template #actions>
        <t-space
          key="expand"
          :size="6"
          v-if="v.childrenCount"
          @click="emits('expand', v.id)"
        >
          <template v-if="v.children.length === 0">
            <t-icon name="chevron-down" />
            <span>展开{{ v.childrenCount }}条回复</span>
          </template>
          <template v-else>
            <t-icon name="chevron-up" />
            <span>收起{{ v.children.length }}条回复</span>
          </template>
        </t-space>
        <t-space key="like" :size="6" @click="emits('like', v)">
          <t-icon name="thumb-up" />
          <span>{{ v.likesCount }}</span>
        </t-space>
        <t-space
          key="reply"
          :size="6"
          @click="emits('reply', level === 1 ? v.id : pid)"
        >
          <t-icon name="chat" />
          <span>回复</span>
        </t-space>
      </template>

      <template #reply v-if="v.children && v.children.length !== 0">
        <ThemeDefaultComment
          :commmentList="v.children"
          :pid="v.id"
          :level="level + 1"
          @reply="(e) => emits('reply', e)"
          @like="(e) => emits('like', e)"
        ></ThemeDefaultComment>
        <t-space
          key="reply11"
          :size="6"
          v-if="v._page < v._total_page"
          @click="emits('loadMorePidComment', v)"
        >
          <t-icon name="load" />
          <span>加载更多</span>
        </t-space>
      </template>
    </t-comment>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(["reply", "like", "expand", "loadMorePidComment"]);
const props = defineProps({
  commmentList: {
    type: Array,
    required: true,
  },
  pid: {
    type: Number,
    required: false,
    default: () => 0,
  },
  level: {
    type: Number,
    required: false,
    default: () => 1,
  },
});
</script>
