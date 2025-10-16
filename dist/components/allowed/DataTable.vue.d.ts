import { type ColumnDef, type VisibilityState } from "@tanstack/vue-table";
declare const __VLS_export: <TData, TValue>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_PrettifyLocal<{
        columns: ColumnDef<TData, TValue>[];
        data: TData[];
        pageSize?: number;
        columnVisibility?: VisibilityState;
        nothingFoundText?: string;
    } & {
        onUpdateVisibility?: ((state: VisibilityState) => any) | undefined;
    }> & import("vue").PublicProps;
    expose: (exposed: {}) => void;
    attrs: any;
    slots: {
        default?: (props: {}) => any;
    };
    emit: (e: "updateVisibility", state: VisibilityState) => void;
}>) => import("vue").VNode & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
