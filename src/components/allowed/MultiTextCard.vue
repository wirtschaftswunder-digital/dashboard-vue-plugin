<template>
	<Card @click="openUrl">
		<CardContent>
            <div v-if="title" :class="titleClass">
				{{ title }}
			</div>
			<div v-if="description" :class="descriptionClass">
				{{ description }}
			</div>
			<span v-for="item in items" :class="item.classes">{{ item.text }}<br v-if="item.newLine"/></span>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { BasicCardProps, MultiTextCardProps } from "../../lib/common.types";
import Card from "../ui/card/Card.vue";
import CardContent from "../ui/card/CardContent.vue";

defineOptions({ name: "MultiTextCard" });

const props = defineProps<{items: MultiTextCardProps[] } & BasicCardProps>();

function openUrl(){
    if(props.url){
        window.location.replace(props.url)
    }
}

</script>
