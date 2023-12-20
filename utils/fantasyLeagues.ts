import { ADMIN_FANTASY_LEAGUE_SHOW_ROUTE, ADMIN_FANTASY_LEAGUE_STORE_ROUTE, ADMIN_FANTASY_LEAGUE_UPDATE_ROUTE, ADMIN_GRAND_PRIX_LIST_ROUTE } from "@/constants/backend-routes";
import { hideDialog, showDialog } from "../Redux/actions/dialogs";
import { isLoading } from "../Redux/actions/loader";
import { loadNewData } from "../Redux/actions/pagination";
import store from "../Redux/store";
import { DIALOG_ADD_FANTASY_LEAGUES, DIALOG_UPDATE_FANTASY_LEAGUES } from "../constants/dialog-names";
import { TITLE_ADMIN_FANTASY_LEAGUES } from "../constants/page-titles";
import { getRequest, navigateTo, postRequest } from "./general";
import { UNAUTHORIZED } from "@/constants/constants";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { toast } from "react-toastify";





export const openAddNewDialog = () => {
    store.dispatch(isLoading(true));
    getRequest(`${ADMIN_GRAND_PRIX_LIST_ROUTE}?page_num=-1`).then((response:any) => {
        store.dispatch(showDialog(DIALOG_ADD_FANTASY_LEAGUES, response?.data?.result));
        store.dispatch(isLoading(false));
    }).catch((err) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        store.dispatch(isLoading(false));
        toast.error(err?.data?.message);
    });
}

export const addNewHandler = (e:any) => {
    e.preventDefault();
    
    store.dispatch(isLoading(true));
    let data:any = {
        "name": e.target.elements.name.value,
        "grandPrixLeague": e.target.elements.grandPrixLeague.value,
        "totalTeams": e.target.elements.totalTeams.value,
        "teamSize": e.target.elements.teamSize.value,
        "draftDateTime": e.target.elements.draftDateTime.value,
    }
    
    postRequest(ADMIN_FANTASY_LEAGUE_STORE_ROUTE, data).then((response:any) => {
        store.dispatch(hideDialog());
        store.dispatch(loadNewData(TITLE_ADMIN_FANTASY_LEAGUES, store.getState().pagination.page_num));
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}

export const updateDialogDisplayHandler = (id:any) => {
    store.dispatch(isLoading(true));
    
    getRequest(`${ADMIN_GRAND_PRIX_LIST_ROUTE}?page_num=-1`).then((response1:any) => {
        getRequest(`${ADMIN_FANTASY_LEAGUE_SHOW_ROUTE}/${id}`).then((response2:any) => {
            let data = {
                "grandPrix": response1?.data?.result,
                "fantasyLeague": response2?.data?.result,
            }
            store.dispatch(showDialog(DIALOG_UPDATE_FANTASY_LEAGUES, data));
            store.dispatch(isLoading(false));
        }).catch((err:any) => {
            if(err?.status===UNAUTHORIZED){
                localStorage.removeItem("token");
                return navigateTo(null,ROUTE_SIGNIN);
            }
            toast.error(err?.data?.message);
            store.dispatch(isLoading(false));            
        })
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null,ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}

export const updateLeagueHanlder = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data:any = {
        "id": e.target.elements.id.value,
        "name": e.target.elements.name.value,
        "grandPrixLeague": e.target.elements.grandPrixLeague.value,
        "teamSize": e.target.elements.teamSize.value,
        "totalTeams": e.target.elements.totalTeams.value,
        "draftDateTime": e.target.elements.draftDateTime.value,
    }

    postRequest(ADMIN_FANTASY_LEAGUE_UPDATE_ROUTE, data).then((response:any) => {
        toast.success(response?.data?.message);
        store.dispatch(loadNewData(TITLE_ADMIN_FANTASY_LEAGUES, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        store.dispatch(isLoading(false));
    }).catch((err:any) => {
        console.log(err);
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}