import { AnyAction } from "redux"

export const isLoading = (flag:boolean=false):AnyAction => {
    return {
        type: "LOADER",
        flag: flag
    }
}