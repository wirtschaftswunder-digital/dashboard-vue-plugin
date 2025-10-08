import type { DropdownMenuRadioItemProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
type __VLS_Props = DropdownMenuRadioItemProps & {
    class?: HTMLAttributes["class"];
};
declare var __VLS_17: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_17) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    select: (event: Event) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    onSelect?: ((event: Event) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
