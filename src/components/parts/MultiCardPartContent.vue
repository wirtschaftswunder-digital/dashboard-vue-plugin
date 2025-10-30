<template>
	<Button
		v-if="item.url"
		variant="link"
		@click="() => openUrl(item.url!, item.sameTab)"
		:class="(item.classes + ' ' + item.className).trim()"
		class="p-0 cursor-pointer h-max"
	>
		{{ item.text }}
	</Button>
	<span v-else :class="((item.classes ?? '') + ' ' + (item.className ?? '')).trim()" class="h-max">{{ item.text }}</span>
	<br v-if="item.newLine" />
</template>

<script lang="ts" setup>
import { MultiTextCardProps } from '@/lib/common.types';

defineProps<{item: MultiTextCardProps}>()

function openUrl(url: string, sameTab = false) {
    if(sameTab){
        window.location.assign(url)
    }else{
        window.open(url);
    }
}
</script>