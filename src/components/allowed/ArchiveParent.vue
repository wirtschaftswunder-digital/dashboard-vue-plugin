<template>
	<Accordion type="single" collapsible>
		<AccordionItem value="item-1">
			<AccordionTrigger>
				<slot name="trigger">
					<Button variant="outline" class="bg-[#cacbcd] pr-1" style="font-size: 1rem">
						<span>Archiv</span>
						<i class="fas fa-archive"></i>
					</Button>
				</slot>
				<template v-slot:icon><div /></template>
			</AccordionTrigger>

			<AccordionContent><slot /></AccordionContent>
		</AccordionItem>
	</Accordion>
</template>

<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "@/components/ui/button";
defineOptions({name: "ArchiveParent"})
</script>
