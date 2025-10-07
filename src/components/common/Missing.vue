<template>
	<div>Component "{{ name }}" not found</div>
</template>

<script setup lang="ts">
defineProps<{name?: string}>()
</script>