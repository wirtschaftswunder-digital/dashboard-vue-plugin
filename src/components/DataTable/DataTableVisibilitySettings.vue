<template>
	<DropdownMenu v-if="columns.length > 0">
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="sm" class="h-8 ml-auto lg:flex">
				<i class="fas fa-sliders-h w-4 h-4 mr-2" />
				<span>Ansicht</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end" class="w-[150px]">
			<DropdownMenuLabel>Einzelne Spalten ein-/ausblenden</DropdownMenuLabel>
			<DropdownMenuSeparator />

			<DropdownMenuCheckboxItem
				v-for="column in columns"
				:key="column.id"
				class="capitalize"
				:modelValue="column.getIsVisible()"
				@update:modelValue="(value) => column.toggleVisibility(!!value)"
			>
				{{ column.id }}
			</DropdownMenuCheckboxItem>
		</DropdownMenuContent>
	</DropdownMenu>
	<div v-else />
</template>

<script setup lang="ts" generic="TData">
import { computed } from "vue";

import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataTableViewOptionsProps } from "../../lib/common.types";

const props = defineProps<DataTableViewOptionsProps<TData>>();

const columns = computed(() =>
	props.table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide() && column.id !== "id")
);
</script>
