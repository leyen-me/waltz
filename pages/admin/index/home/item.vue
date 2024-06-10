<template>
    <div class="flex-1 w-0 bg-[var(--web-bg-2)] relative flex flex-col pt-28 px-4 mr-2">
        <img :src="icon" class="w-48 h-48 absolute -top-20 left-0" />
        <span>
            {{ title  }}
        </span>
        <span class="font-logo text-[64px]">
            {{ num }}
        </span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
});

</script>