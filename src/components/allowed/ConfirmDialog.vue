<template>
	<Dialog :open="isOpen" @update:open="setOpen">
		<DialogTrigger as-child>
			<slot name="trigger">
				<Button></Button>
			</slot>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>
					<slot name="header" />
				</DialogTitle>
			</DialogHeader>
			<div>
				<slot />
			</div>
			<DialogFooter>
				<slot name="footer">
					<Button @click="cancel" variant="outline">{{ props.cancelText ?? "Abbrechen" }}</Button>
					<Button @click="ok">{{ props.okText ?? "OK" }}</Button>
				</slot>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "../ui/button/Button.vue";
import Dialog from "../ui/dialog/Dialog.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";
import DialogFooter from "../ui/dialog/DialogFooter.vue";
import DialogHeader from "../ui/dialog/DialogHeader.vue";
import DialogTitle from "../ui/dialog/DialogTitle.vue";
import DialogTrigger from "../ui/dialog/DialogTrigger.vue";
defineOptions({ name: "ConfirmDialog" });
const props = withDefaults(defineProps<{
	modelValue?: boolean;
	/**
	 * Test
	 */
	okText?: string;
	cancelText?: string;
	onOk?: () => void;
	onCancel?: () => void;
}>(), {
	modelValue: undefined,
});

const emit = defineEmits<{
	"update:modelValue": [open: boolean];
}>();

const internalOpen = ref(false);
const isOpen = computed(() => props.modelValue ?? internalOpen.value);

function setOpen(open: boolean) {
	if (open === isOpen.value) return;
	if (props.modelValue === undefined) internalOpen.value = open;
	emit("update:modelValue", open);
}

function ok() {
	setOpen(false);
	if (props.onOk) props.onOk();
}
function cancel() {
	setOpen(false);
	if (props.onCancel) props.onCancel();
}
</script>
