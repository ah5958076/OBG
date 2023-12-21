import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { navigateTo, postRequest } from "./general";
import { ADMIN_GAMES_STORE_ROUTE, ADMIN_GAMES_UPDATE_ROUTE } from "@/constants/backend-routes";
import { UNAUTHORIZED } from "@/constants/constants";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { toast } from "react-toastify";
import { loadNewData } from "@/Redux/actions/pagination";
import { TITLE_ADMIN_GAMES } from "@/constants/page-titles";
import { hideDialog } from "@/Redux/actions/dialogs";





export const addGameHandler = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let formData:any = new FormData(e.target);
    if(formData.get("type")==="-") formData.set("type", "");
    if(formData.get("platform")==="-") formData.set("platform", "");

    postRequest(ADMIN_GAMES_STORE_ROUTE, formData).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_GAMES, store.getState().pagination.page_num));
        store.dispatch(hideDialog())
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



export const updateGameHandler = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let formData:any = new FormData(e.target);
    if(formData.get("type")==="-") formData.set("type", "");
    if(formData.get("platform")==="-") formData.set("platform", "");

    postRequest(ADMIN_GAMES_UPDATE_ROUTE, formData).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_GAMES, store.getState().pagination.page_num));
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