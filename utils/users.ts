import { hideDialog, showDialog } from "@/Redux/actions/dialogs"
import { isLoading } from "@/Redux/actions/loader"
import store from "@/Redux/store"
import { DIALOG_ADD_USER_INVENTORY, DIALOG_USER_PROFILE } from "@/constants/dialog-names"
import { getRequest, navigateTo, postRequest } from "./general"
import { ADMIN_INVENTORY_LIST_ROUTE, ADMIN_INVENTORY_SHOW_ROUTE, ADMIN_USERS_ADD_INVENTORY_ROUTE, ADMIN_USERS_SHOW_ROUTE, ADMIN_USERS_STORE_ROUTE, ADMIN_USERS_UPDATE_ROUTE } from "@/constants/backend-routes"
import { loadNewData } from "@/Redux/actions/pagination"
import { TITLE_ADMIN_USERS } from "@/constants/page-titles"
import { toast } from "react-toastify"
import { UNAUTHORIZED } from "@/constants/constants"
import { ROUTE_SIGNIN } from "@/constants/routes"



export const showProfile = (userID:string) => {
    store.dispatch(isLoading(true));
    store.dispatch(showDialog(DIALOG_USER_PROFILE));
    store.dispatch(isLoading(false));
}


export const openInventoryDialog = (userID:string) => {
    store.dispatch(isLoading(true));
    getRequest(`${ADMIN_INVENTORY_LIST_ROUTE}?pageNum=-1`).then((response:any) => {
        let data = {
            userID: userID,
            data: response?.data?.result
        }
        store.dispatch(showDialog(DIALOG_ADD_USER_INVENTORY, data));
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


export const addInventoryToUser = (userID:string, inventoryID:string) => {
    store.dispatch(isLoading(true));

    let data:any = {
        userID,
        inventoryID
    }

    postRequest(ADMIN_USERS_ADD_INVENTORY_ROUTE, data).then((response:any) => {
        toast.success(response?.data?.message);
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


export const addUserHandler = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));
    let data:any = {
        "fullName": e.target.elements.name.value,
        "username": e.target.elements.username.value,
        "password": e.target.elements.password.value,
        "email": e.target.elements.email.value,
        "about": e.target.elements.about.value,
        "balance": e.target.elements.credit.value,
    }

    postRequest(ADMIN_USERS_STORE_ROUTE, data).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_USERS, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
        store.dispatch(isLoading(false))
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false))
    });
}


export const updateUserHandler = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data:any = {
        "id": e.target.elements.id.value,
        "fullName": e.target.elements.name.value,
        "username": e.target.elements.username.value,
        "email": e.target.elements.email.value,
        "about": e.target.elements.about.value,
        "balance": e.target.elements.credit.value,
    }

    
    postRequest(ADMIN_USERS_UPDATE_ROUTE, data).then((response:any) => {
        store.dispatch(loadNewData(TITLE_ADMIN_USERS, store.getState().pagination.page_num));
        store.dispatch(hideDialog());
        toast.success(response?.data?.message);
        store.dispatch(isLoading(false))
    }).catch((err:any) => {
        if(err?.status===UNAUTHORIZED){
            localStorage.removeItem("token");
            return navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false))
    });
}