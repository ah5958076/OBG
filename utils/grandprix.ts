import { isLoading } from "../Redux/actions/loader";
import store from "../Redux/store";
import {toast} from "react-toastify";
import { postRequest } from "./general";
import { ADMIN_GRAND_PRIX_STATUS_ROUTE } from "@/constants/backend-routes";
import { TITLE_ADMIN_GRANDPRIX } from "@/constants/page-titles";
import { loadNewData } from "@/Redux/actions/pagination";


export const unblock = (id:any, page_num:any) => {
    store.dispatch(isLoading(true));
    let data:any = {
        id: id,
        isBlocked: false,
    };
    postRequest(ADMIN_GRAND_PRIX_STATUS_ROUTE, data).then((response:any) => {
        if(response.isError){
            toast.error(response.data);
            store.dispatch(isLoading(false));
        }else{
            store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
        }
    }).catch((err) => {console.log(err)});
}

export const block = (id:any, page_num:any) => {
    store.dispatch(isLoading(true));
    let data:any = {
        id: id,
        isBlocked: true,
    };
    postRequest(ADMIN_GRAND_PRIX_STATUS_ROUTE, data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            toast.error(response.data);
        }else{
            store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
        }
    }).catch((err) => {console.log(err)});
}

