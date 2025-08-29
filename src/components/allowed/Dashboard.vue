<template>
	<div
		class="grid gap-4 p-4 w-min mx-auto"
		:style="{
			gridTemplateColumns: 'minmax(min-content, 1fr) minmax(min-content, 1fr) minmax(min-content, 1fr)',
			//gridTemplateColumns: `repeat(${gridSize.x}, 1fr)`,
			gridTemplateRows: `repeat(${gridSize.y}, 1fr)`,
		}"
	>
		<div v-for="comp in source.items" class="whitespace-nowrap">
			<component :is="getCadiComponent(comp.component)" v-bind="comp.props" class="h-full"> </component>
		</div>
	</div>
</template>

<script setup lang="ts">
import "../../main.css";
import { computed } from "vue";
import { getCadiComponent } from "../../index";
import { DashboardBuildSource } from "@/lib/common.types";
defineOptions({ name: "Dashboard" });
const { source } = defineProps<{ source: DashboardBuildSource }>();
const gridSize = computed(() => {
	return {
		x: source.global ? source.meta.gridSize.x : source.meta.gridSizeApp.x,
		y: source.global ? source.meta.gridSize.y : source.meta.gridSizeApp.y,
	};
});
</script>
