type __VLS_Props = {
    /**
     * Test
     */
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
};
declare var __VLS_10: {}, __VLS_28: {}, __VLS_30: {}, __VLS_36: {};
type __VLS_Slots = {} & {
    trigger?: (props: typeof __VLS_10) => any;
} & {
    header?: (props: typeof __VLS_28) => any;
} & {
    default?: (props: typeof __VLS_30) => any;
} & {
    footer?: (props: typeof __VLS_36) => any;
};
declare const __VLS_base: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
