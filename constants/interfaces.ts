import { ChangeEventHandler } from "react"

export interface TYPE_DIALOG_STATE {
    name: string,
    isShowing: boolean,
    data: any,
    type?: String
}

export interface TYPE_LOADER_STATE {
    type?: String,
    flag: boolean
}

export interface TYPE_PAGINATION_STATE {
    title: string,
    data: any,
    page_num: number,
    type?: string
}

export interface TYPE_INPUT {
    title: string,
    name:string, 
    required:boolean, 
    type?:string,
    icon?:any,
    onChnage?:any,
    value?:string
}