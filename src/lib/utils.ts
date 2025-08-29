import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ExternalToast, toast } from "vue-sonner";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type ToastType = "ok" | "success" | "error" | "info"
export function showToast(type: ToastType, title: string, options?: ExternalToast) {
    if (type === "ok" || type === "success") {
        toast.success(title, {
            classes: {
                icon: "text-green-400"
            }, ...options
        })
    } else if (type === "error") {
        toast.error(title, {
            classes: {
                icon: "text-red-400"
            }, ...options
        })
    } else if (type === "info") {
        toast.info(title, options)
    } else {
        toast(title, options)
    }
}