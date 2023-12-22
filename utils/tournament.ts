import { isLoading } from "@/Redux/actions/loader"
import store from "@/Redux/store"
import { getRequest, navigateTo } from "./general";
import { ADMIN_GAMES_LIST_ROUTE } from "@/constants/backend-routes";
import { UNAUTHORIZED } from "@/constants/constants";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { toast } from "react-toastify";
import { showDialog } from "@/Redux/actions/dialogs";
import { DIALOG_ADD_TOURNAMENTS } from "@/constants/dialog-names";

export const openTournamentEditDialog = (id:string) => {

}



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

}



export const updateTournamentHandler = (e:any) => {}