import { isLoading } from "../Redux/actions/loader";
import store from "../Redux/store";
import {toast} from "react-toastify";


export const unblock = (event:any, id:any, page_num:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    let data:any = {
        id: id,
        isBlocked: false,
    };
    toast.success("User Unblocked. Its prototype 😊");
    store.dispatch(isLoading(false));
    // makeXMLRequest("/api/grand-prix/update/status", "post", data).then((response:any) => {
        //     if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
    //     }
    // }).catch((err) => {console.log(err)});
}

export const block = (event:any, id:any, page_num:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    let data:any = {
        id: id,
        isBlocked: true,
    };
    toast.success("User Blocked. Its prototype 😊");
    store.dispatch(isLoading(false));
    // makeXMLRequest("/api/grand-prix/update/status", "post", data).then((response:any) => {
    //     if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
    //     }
    // }).catch((err) => {console.log(err)});
}

