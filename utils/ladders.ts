import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { ADMIN_GAMES_LIST_ROUTE, ADMIN_LADDERS_STORE_ROUTE, ADMIN_LADDERS_SHOW_ROUTE, ADMIN_LADDERS_UPDATE_ROUTE } from "@/constants/backend-routes";
import { DIALOG_ADD_GP_LEAGUES, DIALOG_ADD_LADDERS, DIALOG_UPDATE_LADDERS } from "@/constants/dialog-names";
import { getRequest, navigateTo, postRequest } from "./general";
import { hideDialog, showDialog } from "@/Redux/actions/dialogs";
import { UNAUTHORIZED } from "@/constants/constants";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { toast } from "react-toastify";
import { TITLE_ADMIN_LADDERS } from "@/constants/page-titles";
import { loadNewData } from "@/Redux/actions/pagination";






export const openAddNewDialog = () => {
    store.dispatch(isLoading(true));
    getRequest(`${ADMIN_GAMES_LIST_ROUTE}?pageNum=-1`).then((response: any) => {
        store.dispatch(showDialog(DIALOG_ADD_LADDERS, response?.data?.result));
        store.dispatch(isLoading(false));
    }).catch((err) => {
        if (err?.status === UNAUTHORIZED) {
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}



export const addLadderHandler = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data: any = new FormData(e.target);
    if (data.get("gameName") === "-")
        data.set("gameName", "");
    if (data.get("status") === "-")
        data.set("status", "");

    postRequest(ADMIN_LADDERS_STORE_ROUTE, data).then((response: any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_LADDERS, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
        store.dispatch(isLoading(false));
    }).catch(async (err) => {
        if (err?.status === UNAUTHORIZED) {
            localStorage.removeItem("token");
            navigateTo(null, ROUTE_SIGNIN)
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}



export const openEditDialog = (id: string) => {
    store.dispatch(isLoading(true));

    getRequest(ADMIN_GAMES_LIST_ROUTE + "?pageNum=-1").then((response1: any) => {

        getRequest(`${ADMIN_LADDERS_SHOW_ROUTE}/${id}`).then((response2: any) => {
            let data = {
                "ladder": response2?.data?.result,
                "games": response1?.data?.result
            }
            store.dispatch(showDialog(DIALOG_UPDATE_LADDERS, data));
            store.dispatch(isLoading(false));
        }).catch((err) => {
            if (err?.status === UNAUTHORIZED) {
                localStorage.removeItem("token");
                return navigateTo(null, ROUTE_SIGNIN);
            }
            toast.error(err?.data?.message);
            store.dispatch(isLoading(false));
        });

    }).catch((err) => {
        if (err?.status === UNAUTHORIZED) {
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}



export const updateLadderHandler = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));
    let data: any = new FormData(e.target);
    if (data.get("gameName") === "-")
        data.set("gameName", "");
    if (data.get("status") === "-")
        data.set("status", "");

    postRequest(ADMIN_LADDERS_UPDATE_ROUTE, data).then((response: any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_LADDERS, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
        store.dispatch(isLoading(false));
    }).catch(async (err) => {
        if (err?.status === UNAUTHORIZED) {
            localStorage.removeItem("token");
            navigateTo(null, ROUTE_SIGNIN)
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}