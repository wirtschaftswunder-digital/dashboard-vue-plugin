<template>
	<div class="flex items-center justify-between px-2">
		<div class="flex-1 text-sm text-muted-foreground hidden">
			<span class="">{{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s) selected.</span>
		</div>
		<div class="flex items-center space-x-2">
			<p class="text-sm font-medium" style="margin: 0 0.5rem 0 0;">Anzahl pro Seite</p>
			<Select :model-value="`${table.getState().pagination.pageSize}`" @update:model-value="updatePageSize">
				<SelectTrigger class="h-8 w-[80px]">
					<SelectValue :placeholder="`${getPageSizeStr(table.getState().pagination.pageSize)}`" />
				</SelectTrigger>
				<SelectContent side="top">
					<SelectItem v-for="pageSize in pageSizes" :key="pageSize" :value="`${pageSize}`" >
						{{ getPageSizeStr(pageSize) }}
					</SelectItem>
				</SelectContent>
			</Select>
            <span class="ml-2 text-sm font-medium">Insgesamt: {{ table.getFilteredRowModel().rows.length }}</span>
		</div>
		<div class="flex items-center space-x-6 lg:space-x-8">
			<div class="flex w-[120px] items-center justify-end text-sm font-medium">
				Seite {{ table.getState().pagination.pageIndex + 1 }} von
				{{ table.getPageCount() }}
			</div>
			<div class="flex items-center space-x-2">
				<Button variant="outline" class="w-8 h-8 p-0 lg:flex" :disabled="!table.getCanPreviousPage()" @click="table.setPageIndex(0)">
					<span class="sr-only">Go to first page</span>
					<i class="fas fa-arrow-alt-to-left w-4 h-4" style="margin: 0;"/>
				</Button>
				<Button variant="outline" class="w-8 h-8 p-0" style="margin-left: 0.25rem;" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
					<span class="sr-only">Go to previous page</span>
					<i class="fas fa-chevron-left w-4 h-4" style="margin: 0;"/>
				</Button>
				<Button variant="outline" class="w-8 h-8 p-0" style="margin-left: 0.25rem;" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
					<span class="sr-only">Go to next page</span>
					<i class="fas fa-chevron-right w-4 h-4" style="margin: 0;" />
				</Button>
				<Button variant="outline" class="w-8 h-8 p-0 lg:flex" style="margin-left: 0.25rem;" :disabled="!table.getCanNextPage()" @click="table.setPageIndex(table.getPageCount() - 1)">
					<span class="sr-only">Go to last page</span>
					<i class="fas fa-arrow-alt-to-right w-4 h-4" style="margin: 0;"/>
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" generic="TData">

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import type { AcceptableValue } from 'reka-ui';
import { DataTablePaginationProps } from '@/lib/common.types';

const props = defineProps<DataTablePaginationProps<TData>>()

const emit = defineEmits<(e: 'updatePageSize', size: number) => void>()

const pageSizes = [5, 10, 20, 40, 9999]

function getPageSizeStr(size: number){
    return pageSizes.indexOf(size) === pageSizes.length-1 ? 'Alle' : `${size}`
}

function updatePageSize(value: AcceptableValue){
    //@ts-expect-error
    props.table.setPageSize(value)
    const newValue = parseInt(`${value}`) ?? 10;
    emit('updatePageSize', newValue)
    //settings.setItemsPerPage(newValue)

}
</script>
