<template>
	<Dialog>
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
					<DialogClose>
						<Button @click="props.onCancel" variant="destructive">{{ props.cancelText ?? "Abbrechen" }}</Button>
					</DialogClose>
					<Button @click="props.onOk">{{ props.okText ?? "OK" }}</Button>
				</slot>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<script setup lang="ts">
import Button from "../ui/button/Button.vue";
import Dialog from "../ui/dialog/Dialog.vue";
import DialogClose from "../ui/dialog/DialogClose.vue";
import DialogContent from "../ui/dialog/DialogContent.vue";
import DialogFooter from "../ui/dialog/DialogFooter.vue";
import DialogHeader from "../ui/dialog/DialogHeader.vue";
import DialogTitle from "../ui/dialog/DialogTitle.vue";
import DialogTrigger from "../ui/dialog/DialogTrigger.vue";
defineOptions({ name: "ConfirmDialog" });
const props = defineProps<{
	/**
	 * Test
	 */
	okText?: string;
	cancelText?: string;
	onOk?: () => void;
	onCancel?: () => void;
}>();
</script>
