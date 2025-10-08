import type { VariantProps } from "class-variance-authority";
export { default as Button } from "./Button.vue";
export declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "icon" | "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type ButtonVariants = VariantProps<typeof buttonVariants>;
