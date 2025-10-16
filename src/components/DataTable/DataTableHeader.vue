<template>
	<div v-if="column.getCanSort() || column.getCanHide()" :class="cn('flex space-x-2', $attrs.class ?? '')">
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button variant="ghost" size="sm" class="-ml-3 h-8 data-[state=open]:bg-accent">
					<span>{{ title }}</span>
					<span v-if="hint" class="ml-2"
						><TooltipProvider>
							<Tooltip>
								<TooltipTrigger><i class="fas fa-question-circle"></i></TooltipTrigger>
								<TooltipContent>
									{{ hint }}
								</TooltipContent>
							</Tooltip>
						</TooltipProvider></span
					>
					<i v-if="column.getIsSorted() === 'desc'" class="fas fa-arrow-down w-4 h-4 ml-2" />
					<i v-else-if="column.getIsSorted() === 'asc'" class="fas fa-arrow-up w-4 h-4 ml-2" />
					<i v-else-if="column.getCanSort()" class="fas fa-sort-alt w-4 h-4 ml-2" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start">
				<template v-if="column.getCanSort()">
					<DropdownMenuItem @click="column.toggleSorting(false)">
						<i class="fas fa-arrow-up mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Aufsteigend
					</DropdownMenuItem>
					<DropdownMenuItem @click="column.toggleSorting(true)">
						<i class="fas fa-arrow-down mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
						Absteigend
					</DropdownMenuItem>
				</template>
				<DropdownMenuSeparator v-if="column.getCanSort() && column.getCanHide()" />
				<DropdownMenuItem v-if="column.getCanHide()" @click="column.toggleVisibility(false)">
					<i class="fas fa-eye-slash mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
					Ausblenden
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>

	<div v-else :class="$attrs.class">
		{{ title }}
	</div>
</template>

<script setup lang="ts">

import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import TooltipTrigger from '../ui/tooltip/TooltipTrigger.vue'
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue'
import Tooltip from '../ui/tooltip/Tooltip.vue'
import TooltipContent from '../ui/tooltip/TooltipContent.vue'
import { DataTableColumnHeaderProps } from '../../lib/common.types'

defineProps<DataTableColumnHeaderProps>()
</script>

<script lang="ts">
export default {
	inheritAttrs: false,
}
</script>
