<template>
	<div class="flex justify-between mb-2 mt-4">
		<slot />
		<DataTableFilter :table="table" class="mx-2 first:ml-0" />
		<DataTableVisibilitySettings :table="table" />
	</div>
	<div class="border border-black/25 rounded-md p-1">
		<Table>
			<TableHeader>
				<TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id" class="border-black/25">
					<TableHead v-for="header in headerGroup.headers" :key="header.id">
						<FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<template v-if="table.getRowModel().rows.length">
					<template v-for="row in table.getRowModel().rows" :key="row.id">
						<TableRow :data-state="row.getIsSelected() ? 'selected' : undefined" class="border-black/25">
							<TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
								<FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
							</TableCell>
						</TableRow>
					</template>
				</template>
				<template v-else>
					<TableRow>
						<TableCell :colspan="columns.length" class="text-center h-20"> {{ nothingFoundText ?? "Keine Ergebnisse gefunden." }} </TableCell>
					</TableRow>
				</template>
			</TableBody>
		</Table>
	</div>
	<div class="mt-2">
		<DataTablePagination :table="table" />
	</div>
</template>

<script setup lang="ts" generic="TData, TValue">
import {
	FlexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getExpandedRowModel,
	useVueTable,
	type ColumnDef,
	type SortingState,
	type VisibilityState,
	type ExpandedState,
} from "@tanstack/vue-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { valueUpdater } from "../../lib/utils";
import { ref } from "vue";
import DataTablePagination from "../DataTable/DataTablePagination.vue";
import DataTableVisibilitySettings from "../DataTable/DataTableVisibilitySettings.vue";
import DataTableFilter from "../DataTable/DataTableFilter.vue";

defineOptions({ name: "DataTable" });

const props = defineProps<{
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pageSize?: number;
	columnVisibility?: VisibilityState;
	nothingFoundText?: string;
}>();

const emit = defineEmits<(e: "updateVisibility", state: VisibilityState) => void>();

const sorting = ref<SortingState>([
	{
		id: "id",
		desc: false,
	},
]);
const columnVisibility = ref<VisibilityState>(props.columnVisibility ?? {});

const globalFilter = ref("");

const expanded = ref<ExpandedState>({});

const table = useVueTable({
	get data() {
		return props.data;
	},
	get columns() {
		return props.columns;
	},

	initialState: {
		pagination: {
			pageSize: props.pageSize ?? 5,
		},
	},
	state: {
		get sorting() {
			return sorting.value;
		},
		get columnVisibility() {
			return columnVisibility.value;
		},
		get globalFilter() {
			return globalFilter.value;
		},
		get expanded() {
			return expanded.value;
		},
	},
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
	onGlobalFilterChange: (updaterOrValue) => {
		valueUpdater(updaterOrValue, globalFilter);
	},
	getFilteredRowModel: getFilteredRowModel(),
	onColumnVisibilityChange: (updaterOrValue) => {
		valueUpdater(updaterOrValue, columnVisibility);
		emit("updateVisibility", columnVisibility.value);
	},
	getExpandedRowModel: getExpandedRowModel(),
	onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
	getSubRows: (row) => (row as unknown as { children: any }).children,
	filterFromLeafRows: true,
	maxLeafRowFilterDepth: 1,
    paginateExpandedRows: false,
});
</script>
