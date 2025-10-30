<template>
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger>
                <slot name="trigger">
                    <i :class="classTrigger" class="fas fa-question-circle" style="margin-left: 0.4rem"></i>
                </slot>
			</TooltipTrigger>
			<TooltipContent align="start" side="bottom" class="border vite-hint-content">
				<slot>
					<span v-if="content" class="text-base" :class="classContent">{{ content }}</span>
					<div v-else v-html="contentHtml" />
				</slot>
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
</template>

<script setup lang="ts">
import Tooltip from "../ui/tooltip/Tooltip.vue";
import TooltipContent from "../ui/tooltip/TooltipContent.vue";
import TooltipProvider from "../ui/tooltip/TooltipProvider.vue";
import TooltipTrigger from "../ui/tooltip/TooltipTrigger.vue";
defineOptions({ name: "HintTooltip" });
defineProps<{ content?: string; classTrigger?: string; classContent?: string; contentHtml?: string }>();
</script>

<style lang="css">
.vite-hint-content {
	box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
	color: black;
	background-color: white;
	max-width: 35rem;
}
</style>
