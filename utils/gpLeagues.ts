import { hideDialog, showDialog } from "../Redux/actions/dialogs";
import { isLoading } from "../Redux/actions/loader";
import store from "../Redux/store";
import { toast } from "react-toastify";
import { DIALOG_ADD_GP_LEAGUES, DIALOG_UPDATE_GP_LEAGUES } from "../constants/dialog-names";
import { getRequest, navigateTo, postRequest } from "./general";
import { ADMIN_GAMES_LIST_ROUTE, ADMIN_GP_LEAGUES_SHOW_ROUTE, ADMIN_GP_LEAGUES_STORE_ROUTE, ADMIN_GP_LEAGUES_UPDATE_ROUTE } from "@/constants/backend-routes";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { loadNewData } from "@/Redux/actions/pagination";
import { TITLE_ADMIN_GPLEAGUES } from "@/constants/page-titles";
import { UNAUTHORIZED } from "@/constants/constants";




export const openAddNewDialog = () => {
    store.dispatch(isLoading(true));
    getRequest(`${ADMIN_GAMES_LIST_ROUTE}?pageNum=-1`).then((response: any) => {
        store.dispatch(showDialog(DIALOG_ADD_GP_LEAGUES, response?.data?.result));
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

export const addNewHandler = (e: any) => {
    e.preventDefault();

    store.dispatch(isLoading(true));

    let formData: any = new FormData()
    formData.append("name", e.target.elements.name.value);
    formData.append("gameName", e.target.elements.gameName.value);
    formData.append("entryFee", e.target.elements.entryFee.value);
    formData.append("prize", e.target.elements.prize.value);
    formData.append("teamSize", e.target.elements.teamSize.value);
    formData.append("totalTeams", e.target.elements.totalTeams.value);
    formData.append("startingDate", e.target.elements.startingDate.value);
    formData.append("endingDate", e.target.elements.endingDate.value);
    formData.append("picture", e.target.elements.picture.files[0]);


    postRequest(ADMIN_GP_LEAGUES_STORE_ROUTE, formData).then((response: any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_GPLEAGUES, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
    }).catch(async (err) => {
        if (err?.status === UNAUTHORIZED) {
            localStorage.removeItem("token");
            navigateTo(null, ROUTE_SIGNIN)
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}

export const updateDialogDisplayHandler = (id: any) => {
    store.dispatch(isLoading(true));

    getRequest(ADMIN_GAMES_LIST_ROUTE + "?pageNum=-1").then((response1: any) => {

        getRequest(`${ADMIN_GP_LEAGUES_SHOW_ROUTE}/${id}`).then((response2: any) => {
            let data = {
                "gpLeagues": response2?.data?.result,
                "games": response1?.data?.result
            }
            store.dispatch(showDialog(DIALOG_UPDATE_GP_LEAGUES, data));
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

export const updateLeagueHanlder = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let formData: any = new FormData(e.target);

    postRequest(ADMIN_GP_LEAGUES_UPDATE_ROUTE, formData).then((response: any) => {
        toast.success(response?.data?.message);
        store.dispatch(loadNewData(TITLE_ADMIN_GPLEAGUES, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
    }).catch((err) => {
        if (err?.status === UNAUTHORIZED) {
            localStorage.removeItem("token");
            navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}