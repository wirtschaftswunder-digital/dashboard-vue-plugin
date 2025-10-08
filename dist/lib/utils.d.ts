import { ClassValue } from "clsx";
import { ExternalToast } from "vue-sonner";
export declare function cn(...inputs: ClassValue[]): string;
type ToastType = "ok" | "success" | "error" | "info";
export declare function showToast(type: ToastType, title: string, options?: ExternalToast): void;
export {};
