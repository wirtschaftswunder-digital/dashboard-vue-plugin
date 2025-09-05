<template>
	<div v-if="arr" :class="class">
		<template v-for="item in arr">
			<Button v-if="item.url" variant="link" @click="() => openUrl(item.url!)" :class="item.classes" class="p-0 cursor-pointer h-max">{{ item.text }}</Button>
			<span v-else :class="item.classes" class="h-max">{{ item.text }}</span>
			<br v-if="item.newLine" />
		</template>
	</div>
</template>

<script setup lang="ts">
import { MultiTextCardProps } from "@/lib/common.types";
import Button from "../ui/button/Button.vue";

function openUrl(url: string) {
	window.location.replace(url);
}

defineProps<{ arr?: MultiTextCardProps[]; class?: string }>();
</script>
