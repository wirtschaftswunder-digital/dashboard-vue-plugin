<template>
	<Card @click="openUrl">
		<CardContent>
			<div v-if="title" :class="titleClass">
				<span>{{ title }}</span>
			</div>
			<div v-if="description" :class="descriptionClass">
				<span>{{ description }}</span>
			</div>
			<div v-if="content" :class="contentClass">
				<span>{{ content }}</span>
			</div>
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

defineOptions({ name: "SimpleCard" });
const props = defineProps<{ content?: string; contentClass?: string } & BasicCardProps>();

function openUrl(){
    if(props.url){
        window.location.replace(props.url)
    }
}


</script>
