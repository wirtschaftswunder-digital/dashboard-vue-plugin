<template>
	<div class="flex">
		<span class="my-auto mr-2 hidden">Filter: </span>
		<Input v-on:update:model-value="table.setGlobalFilter" placeholder="Suche" class="h-8 ml-auto lg:flex"></Input>
	</div>
</template>

<script setup lang="ts" generic="TData">
import Input from '../ui/input/Input.vue'
import type { Table } from '@tanstack/vue-table'

defineProps<{ table: Table<TData> }>()
</script>
