import type { DropdownMenuRootProps } from "reka-ui";
declare var __VLS_7: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: import("vue").DefineComponent<DropdownMenuRootProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:open": (payload: boolean) => any;
}, string, import("vue").PublicProps, Readonly<DropdownMenuRootProps> & Readonly<{
    "onUpdate:open"?: ((payload: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
