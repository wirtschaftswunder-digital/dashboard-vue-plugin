import { App, Component } from "vue";
import SimpleCard from "./components/allowed/SimpleCard.vue";
import ConfirmDialog from "./components/allowed/ConfirmDialog.vue";
import Dashboard from "./components/allowed/Dashboard.vue";
import MultiTextCard from "./components/allowed/MultiTextCard.vue";
import AdvancedCard from "./components/allowed/AdvancedCard.vue";
import StyledCard from "./components/allowed/StyledCard.vue";
import StyledMultiCard from "./components/allowed/StyledMultiCard.vue";
import HintTooltip from "./components/allowed/HintTooltip.vue";
import { ViteLoader } from "./lib/injector.ts";
declare const components: {
    SimpleCard: import("vue").DefineComponent<{
        content?: string;
        contentClass?: string;
    } & import("./lib/common.types.ts").BasicCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        content?: string;
        contentClass?: string;
    } & import("./lib/common.types.ts").BasicCardProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
    ConfirmDialog: {
        new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<{
            okText?: string;
            cancelText?: string;
            onOk?: () => void;
            onCancel?: () => void;
        }> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {}, false, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<{
            okText?: string;
            cancelText?: string;
            onOk?: () => void;
            onCancel?: () => void;
        }> & Readonly<{}>, {}, {}, {}, {}, {}>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import("vue").ComponentOptionsBase<Readonly<{
        okText?: string;
        cancelText?: string;
        onOk?: () => void;
        onCancel?: () => void;
    }> & Readonly<{}>, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
        $slots: {
            trigger?: (props: {}) => any;
        } & {
            header?: (props: {}) => any;
        } & {
            default?: (props: {}) => any;
        } & {
            footer?: (props: {}) => any;
        };
    });
    Dashboard: import("vue").DefineComponent<{
        source: import("./lib/common.types.ts").DashboardBuildSource;
    }, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        source: import("./lib/common.types.ts").DashboardBuildSource;
    }> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
    MultiTextCard: import("vue").DefineComponent<{
        items: import("./lib/common.types.ts").MultiTextCardProps[];
    } & import("./lib/common.types.ts").BasicCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        items: import("./lib/common.types.ts").MultiTextCardProps[];
    } & import("./lib/common.types.ts").BasicCardProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
    AdvancedCard: import("vue").DefineComponent<{
        html: string;
    } & import("./lib/common.types.ts").BasicCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        html: string;
    } & import("./lib/common.types.ts").BasicCardProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
    StyledCard: import("vue").DefineComponent<{
        content?: string;
        contentClass?: string;
        note?: string;
        noteClass?: string;
    } & import("./lib/common.types.ts").BasicCardProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        content?: string;
        contentClass?: string;
        note?: string;
        noteClass?: string;
    } & import("./lib/common.types.ts").BasicCardProps> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
    StyledMultiCard: import("vue").DefineComponent<{
        itemsTitle?: import("./lib/common.types.ts").MultiTextCardProps[];
        titleClass?: string;
        contentClass?: string;
        descriptionClass?: string;
        noteClass?: string;
        itemsContent?: import("./lib/common.types.ts").MultiTextCardProps[];
        itemsDescription?: import("./lib/common.types.ts").MultiTextCardProps[];
        itemsNote?: import("./lib/common.types.ts").MultiTextCardProps[];
        url?: string;
    }, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        itemsTitle?: import("./lib/common.types.ts").MultiTextCardProps[];
        titleClass?: string;
        contentClass?: string;
        descriptionClass?: string;
        noteClass?: string;
        itemsContent?: import("./lib/common.types.ts").MultiTextCardProps[];
        itemsDescription?: import("./lib/common.types.ts").MultiTextCardProps[];
        itemsNote?: import("./lib/common.types.ts").MultiTextCardProps[];
        url?: string;
    }> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
    HintTooltip: import("vue").DefineComponent<{
        content?: string;
        classTrigger?: string;
        classContent?: string;
        contentHtml?: string;
    }, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
        content?: string;
        classTrigger?: string;
        classContent?: string;
        contentHtml?: string;
    }> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
};
export { SimpleCard, ConfirmDialog, Dashboard, MultiTextCard, AdvancedCard, StyledCard, StyledMultiCard, HintTooltip, };
export { ViteLoader, };
export type AllowedComponents = keyof typeof components;
export declare function getCadiComponent(name: string): Component;
export declare function getPlugin(): {
    install(app: App, _?: any): App<any>;
};
