<template>
	<Card @click="openUrl" :class="url ? 'cursor-pointer' : ''">
		<CardContent>
			<MultiCardPart :arr="itemsTitle" class="text-base font-normal text-gray-500" :class="titleClass" />
			<MultiCardPart :arr="itemsContent" class="ml-2 text-2xl font-bold my-2" :class="contentClass" />
			<MultiCardPart :arr="itemsDescription" class="font-normal" :class="descriptionClass" />
			<MultiCardPart :arr="itemsNote" class="text-sm text-gray-500 mt-2" :class="noteClass" />
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { MultiTextCardProps } from "../../lib/common.types";
import Card from "../ui/card/Card.vue";
import CardContent from "../ui/card/CardContent.vue";
import MultiCardPart from "../parts/MultiCardPart.vue";

defineOptions({ name: "MultiTextCard" });

const props = defineProps<{
	itemsTitle?: MultiTextCardProps[];
	titleClass?: string;
	contentClass?: string;
	descriptionClass?: string;
	noteClass?: string;
	itemsContent?: MultiTextCardProps[];
	itemsDescription?: MultiTextCardProps[];
	itemsNote?: MultiTextCardProps[];
	url?: string;
}>();

function openUrl() {
	if (props.url) {
		window.location.replace(props.url);
	}
}
</script>
