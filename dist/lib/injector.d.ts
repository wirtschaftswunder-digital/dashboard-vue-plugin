import { Component } from "vue";
import type { Pinia } from "pinia";
export declare function renderVue(getLocalComponent: (name: string) => Component | null, rootComponent: Component, piniaInstance: Pinia): void;
export declare function ViteLoader(localComponents: Component[], rootComponent: Component, piniaInstance: Pinia): void;
