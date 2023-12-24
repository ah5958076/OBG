import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { navigateTo, postRequest } from "./general";
import { ADMIN_INVENTORY_STORE_ROUTE, ADMIN_INVENTORY_UPDATE_ROUTE } from "@/constants/backend-routes";
import { UNAUTHORIZED } from "@/constants/constants";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { toast } from "react-toastify";
import { hideDialog } from "@/Redux/actions/dialogs";
import { loadNewData } from "@/Redux/actions/pagination";
import { TITLE_ADMIN_INVENTORY } from "@/constants/page-titles";






export const addInventoryHandler = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data:any = new FormData(e.target);

    postRequest(ADMIN_INVENTORY_STORE_ROUTE, data).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_INVENTORY, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
        store.dispatch(isLoading(false));
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}



export const updateInventoryHandler = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data:any = new FormData(e.target);

    postRequest(ADMIN_INVENTORY_UPDATE_ROUTE, data).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_INVENTORY, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
        store.dispatch(isLoading(false));
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    })
}
