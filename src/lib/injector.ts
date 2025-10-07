import { Component, createApp, h } from "vue";
import { getCadiComponent, getPlugin } from "..";
import type { Pinia } from "pinia";







export function renderVue(getLocalComponent: (name: string) => Component | null, rootComponent: Component, piniaInstance: Pinia) {
    console.log("Loading Vue")

    const mountPoints = document.querySelectorAll("div[data-vue-component]")
    for (const elem of mountPoints) {
        const name = elem.getAttribute("data-vue-component") || "?"
        const slots: Record<string, () => any> = {}

        elem.querySelectorAll('template[data-slot]').forEach(template => {
            const slotName = template.getAttribute('data-slot') ?? ""
            //console.log("slot name", slotName)
            const content = template.innerHTML
            template.remove()
            slots[slotName] = () => h('div', { innerHTML: content })
        })
        if (elem.innerHTML.trim().length > 1)
            slots["default"] = () => h('div', { innerHTML: elem.innerHTML })
        const component = getLocalComponent(name) ?? getCadiComponent(name)
        let props: Record<string, unknown> = {}
        let baseProps: Record<string, unknown> = {}
        try {
            props = JSON.parse(elem.getAttribute("data-vue-props") || "{}")
        } catch { }
        try {
            baseProps = JSON.parse(elem.getAttribute("data-base-props") || "{}")
        } catch { }
        elem.removeAttribute("data-vue-props")
        elem.removeAttribute("data-base-props")
        if (component !== getCadiComponent("Missing")){
            elem.removeAttribute("data-vue-component")
        }else{
            props['name'] = name
        }
        const app = createApp({
            render() {
                return h(rootComponent, baseProps, {
                    default: () => h(component, props, slots)
                })
            },
        })
        app.use(piniaInstance)
        app.use(getPlugin)
        app.mount(elem)
    }
}

export function ViteLoader(localComponents: Component[], rootComponent: Component, piniaInstance: Pinia) {
    function getLocalComponent(name: string): Component | null {
        for (const component of Object.values(localComponents)) {
            if (component.name === name) return component
        }
        return null
    }

    if (document.readyState !== "loading") {
        renderVue(getLocalComponent, rootComponent, piniaInstance)
    } else {
        document.addEventListener('DOMContentLoaded', () => renderVue(getLocalComponent, rootComponent, piniaInstance))
    }

    const w = window as (Window & { renderVueComponents?: () => void })
    if (!w.renderVueComponents)
        w.renderVueComponents = () => renderVue(getLocalComponent, rootComponent, piniaInstance)
}