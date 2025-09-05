<template>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <i class="fas fa-question-circle"></i>
            </TooltipTrigger>
            <TooltipContent>
                <span>{{ content }}</span>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</template>

<script setup lang="ts">
import Tooltip from '../ui/tooltip/Tooltip.vue';
import TooltipContent from '../ui/tooltip/TooltipContent.vue';
import TooltipProvider from '../ui/tooltip/TooltipProvider.vue';
import TooltipTrigger from '../ui/tooltip/TooltipTrigger.vue';
defineOptions({name: "HintTooltip"})
defineProps<{content: string}>()
</script>