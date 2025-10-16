import { Column, Table } from "@tanstack/vue-table"
import { VNode } from "vue"

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
    className?: string
    newLine?: boolean
    url?: string
    sameTab?: boolean
}

export interface DataTableColumnHeaderProps {
	column: Column<any, any>
	title: string | VNode
	hint?: string
}

export interface DataTableViewOptionsProps<TData> {
	table: Table<TData>
}

export interface DataTablePaginationProps<TData> {
	table: Table<TData>
}