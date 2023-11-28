import { AnyAction } from "redux"
export const showDialog = (dialogName:string="", data:any=null):AnyAction => {
    return {
        name: dialogName,
        isShowing: true,
        data: data,
        type:"DIALOGS"
    }
}

export const hideDialog = ():AnyAction => {
    return {
        name: "", 
        isShowing: false,
        data: null,
        type:"DIALOGS"
    }
}