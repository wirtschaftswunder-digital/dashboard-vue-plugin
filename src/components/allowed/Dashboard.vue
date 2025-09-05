<template>
	<div
		class="grid gap-4 p-4 w-max mx-auto"
		:style="{
			gridTemplateColumns: `repeat(${gridSize.x}, 1fr)`,
			gridTemplateRows: `repeat(${gridSize.y}, 1fr)`,
		}"
	>
		<div
			v-for="comp in placableItems"
			class="whitespace-nowrap"
			:style="{
				gridColumn: comp.size ? `span ${comp.size.x}` : undefined,
				gridRow: comp.size ? `span ${comp.size.y}` : undefined,
			}"
		>
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

// const placeableItems = computed(() => {
//     const items = []
//     for(const item of source.items){

//     }
//     return source.items.filter(i => !i.size || Math.max(i.size.x, i.size.x2 ?? 0) <= gridSize.value.x && Math.max(i.size.y, i.size.y2 ?? 0) <= gridSize.value.y)
// })

const placableItems = computed(() => {
    const xSize = gridSize.value.x
    const ySize = gridSize.value.y
	const grid: boolean[][] = Array.from({ length: ySize }, () => Array(xSize).fill(false));

	const result: typeof source.items = [];

	const canPlace = (x: number, y: number, w: number, h: number) => {
		if (x + w > xSize || y + h > ySize) return false;
		for (let yy = y; yy < y + h; yy++) {
			for (let xx = x; xx < x + w; xx++) {
				if (grid[yy][xx]) return false;
			}
		}
		return true;
	};

	const place = (x: number, y: number, w: number, h: number) => {
		for (let yy = y; yy < y + h; yy++) {
			for (let xx = x; xx < x + w; xx++) {
				grid[yy][xx] = true;
			}
		}
	};

	for (const item of source.items) {
        const xItem = item.size?.x ?? 1
        const yItem = item.size?.y ?? 1
		let placed = false;
		for (let y = 0; y < ySize; y++) {
			for (let x = 0; x < xSize; x++) {
				if (canPlace(x, y, xItem, yItem)) {
					place(x, y, xItem, yItem);
					result.push(item);
					placed = true;
					break;
				}
			}
			if (placed) break;
		}
	}

	return result;
});
</script>
