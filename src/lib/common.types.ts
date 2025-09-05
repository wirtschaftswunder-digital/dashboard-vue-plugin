export type XY = {
    x: number
    y: number
}
export type DashboardBuildItem = {
    component: string
    props: object
    children: Omit<DashboardBuildItem, "children">[]
    size?: XY
}
export type DashboardBuildMeta = {
    gridSize: XY
    gridSizeApp: XY
}
export type DashboardBuildSource = {
    global: boolean
    meta: DashboardBuildMeta
    items: DashboardBuildItem[]
}

export type BasicCardProps = {
    title?: string;
    titleClass?: string;
    description?: string;
    descriptionClass?: string;
    url?: string
}

export type MultiTextCardProps = {
    text: string
    classes?: string
    newLine?: boolean
    url?: string
}