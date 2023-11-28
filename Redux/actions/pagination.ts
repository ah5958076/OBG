import { AnyAction } from "redux"

export const loadNewData = (page_title:string, page_num:number=1):AnyAction => {
    return {
        title: page_title,
        data: null,
        page_num: page_num,
        type: ""
    }
}
export const setLoadedData = (page_title:string, data:any, page_num:number=1):AnyAction => {
    return {
        title: page_title,
        data: data,
        page_num: page_num,
        type: ""
    }
}