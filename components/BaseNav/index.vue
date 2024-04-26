<template>
    <Menu :model="items" class="w-full h-full flex flex-col justify-between menu">
        <template #start>
            <span class="inline-flex align-items-center gap-1 px-2 py-2">
                <IconLogo class="text-[var(--primary-color)]"></IconLogo>
                <span class="text-xl font-semibold">NUXT</span>
            </span>
        </template>
        <template #submenuheader="{ item }">
            <span class="text-primary font-bold text-sm">{{ item.label || "" }}</span>
        </template>
        <template #item="{ item, props }">
            <a v-ripple class="flex align-items-center" v-bind="props.action"
                :class="handleActive(item.url as string) ? 'active text-[var(--primary-color)] font-bold' : ''"
                @click="item.url && emits('itemClick', item.url)">
                <span :class="item.icon" />
                <span class="ml-2 text-sm">{{ item.label }}</span>
                <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
                        item.shortcut }}</span>
            </a>
        </template>
        <template #end>
            <button v-ripple
                class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2"
                    shape="circle" />
                <span class="inline-flex flex-column">
                    <span class="font-bold">Amy Elsner</span>
                    <span class="text-sm">Admin</span>
                </span>
            </button>
        </template>
    </Menu>
</template>

<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';

const emits = defineEmits(['itemClick'])
defineProps({
    items: {
        type: Array<MenuItem>,
        required: true,
    }
})

const route = useRoute()
const router = useRouter()
const handleActive = (url: string) => {
    let flag = false
    const { id } = route.params
    if (route.path === url) {
        flag = true
    }
    if (id !== "0" && id !== undefined) {
        flag = false
    }
    return flag
}
</script>