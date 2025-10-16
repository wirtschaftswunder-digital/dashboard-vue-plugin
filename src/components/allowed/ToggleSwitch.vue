<script setup lang="ts">
import { ref } from 'vue';
import Switch from '../ui/switch/Switch.vue';
const props = defineProps<{initialValue?: boolean, label?: string}>()
const state = ref(!!props.initialValue)
const emit = defineEmits<(e: 'update', state: boolean) => void>()
</script>

<template>
    <div class="text-xl size-5">
        <Switch class="" v-model="state" @update:model-value="(state) => emit('update', state)">{{ label }}</Switch>
    </div>
</template>