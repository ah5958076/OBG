import { isLoading } from "../Redux/actions/loader";
import store from "../Redux/store";
import { toast } from "react-toastify";
import { navigateTo, postRequest } from "./general";
import { ADMIN_GRAND_PRIX_STATUS_ROUTE } from "@/constants/backend-routes";
import { TITLE_ADMIN_GRANDPRIX } from "@/constants/page-titles";
import { loadNewData } from "@/Redux/actions/pagination";
import { ROUTE_SIGNIN } from "@/constants/routes";


export const unblock = (id: any, page_num: any) => {
    store.dispatch(isLoading(true));
    let data: any = {
        id: id,
        isBlocked: false,
    };

    postRequest(ADMIN_GRAND_PRIX_STATUS_ROUTE, data).then((response: any) => {
        toast.success(response?.data?.message);
        store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
    }).catch((err) => {
        if(err?.status===400)
            return navigateTo(null, ROUTE_SIGNIN);
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}

export const block = (id: any, page_num: any) => {
    store.dispatch(isLoading(true));
    let data: any = {
        id: id,
        isBlocked: true,
    };
    postRequest(ADMIN_GRAND_PRIX_STATUS_ROUTE, data).then((response: any) => {
        toast.success(response?.data?.message);
        store.dispatch(loadNewData(TITLE_ADMIN_GRANDPRIX, page_num));
    }).catch((err) => {
        if(err?.status===400)
            return navigateTo(null, ROUTE_SIGNIN);
        toast.success(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}

