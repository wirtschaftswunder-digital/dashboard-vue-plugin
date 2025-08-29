<template>
	<Card>
		<CardHeader v-if="title || description">
			<div v-if="title" :class="titleClass">
				{{ title }}
			</div>
			<div v-if="description" :class="descriptionClass">
				{{ description }}
			</div>
		</CardHeader>
		<CardContent>
			<span v-for="item in items" :class="item.classes">{{ item.text }}<br v-if="item.newLine"/></span>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { BasicCardProps } from "@/lib/common.types";
import Card from "../ui/card/Card.vue";
import CardContent from "../ui/card/CardContent.vue";
import CardDescription from "../ui/card/CardDescription.vue";
import CardHeader from "../ui/card/CardHeader.vue";
import CardTitle from "../ui/card/CardTitle.vue";

defineOptions({ name: "MultiTextCard" });

const props = defineProps<{items: {text: string, classes?: string, newLine?: boolean}[] } & BasicCardProps>();
</script>
