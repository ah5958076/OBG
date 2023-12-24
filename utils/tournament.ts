import { isLoading } from "@/Redux/actions/loader"
import store from "@/Redux/store"
import { getRequest, navigateTo, postRequest } from "./general";
import { ADMIN_GAMES_LIST_ROUTE, ADMIN_TOURNAMENTS_SHOW_ROUTE, ADMIN_TOURNAMENTS_STORE_ROUTE, ADMIN_TOURNAMENTS_UPDATE_ROUTE } from "@/constants/backend-routes";
import { UNAUTHORIZED } from "@/constants/constants";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { toast } from "react-toastify";
import { hideDialog, showDialog } from "@/Redux/actions/dialogs";
import { DIALOG_ADD_TOURNAMENTS, DIALOG_UPDATE_TOURNAMENTS } from "@/constants/dialog-names";
import { loadNewData } from "@/Redux/actions/pagination";
import { TITLE_ADMIN_TOURNAMENTS } from "@/constants/page-titles";







export const openAddNewDialog = () => {
    store.dispatch(isLoading(true));

    getRequest(`${ADMIN_GAMES_LIST_ROUTE}?pageNum=-1`).then((response:any) => {
        store.dispatch(showDialog(DIALOG_ADD_TOURNAMENTS, response?.data?.result));
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



export const addTournamentHandler = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data:any = new FormData(e.target);
    if(data.get("catagory")==="-") data.set("catagory", "");
    if(data.get("gameName")==="-") data.set("gameName", "");

    postRequest(ADMIN_TOURNAMENTS_STORE_ROUTE, data).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_TOURNAMENTS, store.getState().pagination.page_num));
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
    })
}



export const openTournamentEditDialog = (id:string) => {
    store.dispatch(isLoading(true));

    getRequest(`${ADMIN_GAMES_LIST_ROUTE}?pageNum=-1`).then((response1:any) => {
        getRequest(`${ADMIN_TOURNAMENTS_SHOW_ROUTE}/${id}`).then((response2:any) => {
            let data:any = {
                "games": response1?.data?.result,
                "tournament": response2?.data?.result,
            }
            store.dispatch(showDialog(DIALOG_UPDATE_TOURNAMENTS, data));
            store.dispatch(isLoading(false));
        }).catch((err:any) => {
            if(err?.status===UNAUTHORIZED){
                localStorage.removeItem("token");
                return navigateTo(null, ROUTE_SIGNIN);
            }
            toast.error(err?.data?.message);
            store.dispatch(isLoading(false));
        })
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}



export const updateTournamentHandler = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data:any = new FormData(e.target);

    postRequest(ADMIN_TOURNAMENTS_UPDATE_ROUTE, data).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_TOURNAMENTS, store.getState().pagination.page_num));
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