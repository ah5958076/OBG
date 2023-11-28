import { isLoading } from "../Redux/actions/loader";
import { loadNewData } from "../Redux/actions/pagination";
import store from "../Redux/store";
import { TITLE_ADMIN_GRANDPRIX } from "../constants/constants";
import { makeXMLRequest } from "./general";
let showNotification:any=null




export const unblock = (event:any, id:any, page_num:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    let data:any = {
        id: id,
        isBlocked: false,
    };
    makeXMLRequest("/api/grand-prix/update/status", "post", data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            store.dispatch(showNotification(response.data, response.isError));
        }else{
            store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
        }
    }).catch((err) => {console.log(err)});
}

export const block = (event:any, id:any, page_num:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    let data:any = {
        id: id,
        isBlocked: true,
    };
    makeXMLRequest("/api/grand-prix/update/status", "post", data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            store.dispatch(showNotification(response.data, response.isError));
        }else{
            store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
        }
    }).catch((err) => {console.log(err)});
}

