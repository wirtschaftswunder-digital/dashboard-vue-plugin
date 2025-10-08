<script setup lang="ts">
import { ref } from 'vue';
import Switch from '../ui/switch/Switch.vue';
const props = defineProps<{initialValue?: boolean, label?: string}>()
const state = ref(false)
const emit = defineEmits<(e: 'update', state: boolean) => void>()
</script>

<template>
    <Switch :model-value="state" @update:model-value="(state) => emit('update', state)">{{ label }}</Switch>
</template>