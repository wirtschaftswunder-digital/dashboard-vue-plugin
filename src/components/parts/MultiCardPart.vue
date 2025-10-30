<template>
	<div v-if="arr" :class="class">
		<template v-for="item in arr">
            <HintTooltip v-if="item.hint" :content="item.hint">
                <template #trigger>
                    <MultiCardPartContent :item="item"/>
                </template>
            </HintTooltip>
            <MultiCardPartContent v-else :item="item"/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { MultiTextCardProps } from "../../lib/common.types";
import HintTooltip from "../allowed/HintTooltip.vue";
import MultiCardPartContent from "./MultiCardPartContent.vue";



defineProps<{ arr?: MultiTextCardProps[]; class?: string }>();
</script>
