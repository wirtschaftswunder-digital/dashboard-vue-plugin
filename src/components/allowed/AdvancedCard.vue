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
            <div v-html="html"/>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { BasicCardProps } from "@/lib/common.types";
import Card from "../ui/card/Card.vue";
import CardContent from "../ui/card/CardContent.vue";
import CardHeader from "../ui/card/CardHeader.vue";

defineOptions({ name: "AdvancedCard" });

defineProps<{ html: string } & BasicCardProps>();
</script>
