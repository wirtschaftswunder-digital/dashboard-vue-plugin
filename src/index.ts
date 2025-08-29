//import "../dist/dashboard-vue-plugin.css"
import "../dist_style/tailwind_output.css"
import { App, Component } from "vue";
import SimpleCard from "./components/allowed/SimpleCard.vue";
import Missing from "./components/common/Missing.vue";
import ConfirmDialog from "./components/allowed/ConfirmDialog.vue";
import Dashboard from "./components/allowed/Dashboard.vue";
import MultiTextCard from "./components/allowed/MultiTextCard.vue";
import AdvancedCard from "./components/allowed/AdvancedCard.vue";

const components = {
    SimpleCard,
    ConfirmDialog,
    Dashboard,
    MultiTextCard,
    AdvancedCard,
}

export {
    SimpleCard,
    ConfirmDialog,
    Dashboard,
    MultiTextCard,
    AdvancedCard,
}

export type AllowedComponents = keyof typeof components

export function getCadiComponent(name: string): Component {
    return name in components ? components[name as AllowedComponents] : Missing
}



export function getPlugin() {
    return {
        install(app: App, options?: any) {
            for (const component of Object.values(components)) {
                if (component.name)
                    app.component(component.name, component)
                else
                    console.error("Every shared component needs a name")
            }
            return app
        }
    }
}