<template>
	<Card @click="openUrl" :class="url ? 'cursor-pointer' : ''">
		<CardContent>
			<div v-if="title" class="text-base font-normal text-gray-500" :class="titleClass">
				<span>{{ title }}</span>
			</div>
			<div v-if="content" class="ml-2 text-2xl font-bold my-2" :class="contentClass">
				<span>{{ content }}</span>
			</div>
			<div v-if="description" class="font-normal" :class="descriptionClass">
				<span>{{ description }}</span>
			</div>
			<div v-if="note" class="text-sm text-gray-500 mt-2" :class="noteClass">
				<span>{{ note }}</span>
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { BasicCardProps } from "../../lib/common.types";
import Card from "../ui/card/Card.vue";
import CardContent from "../ui/card/CardContent.vue";

defineOptions({ name: "StyledCard" });
const props = defineProps<{ content?: string; contentClass?: string; note?: string; noteClass?: string } & BasicCardProps>();

function openUrl() {
	if (props.url) {
		window.location.replace(props.url);
	}
}
</script>
