import { showDialog } from "@/Redux/actions/dialogs"
import { isLoading } from "@/Redux/actions/loader"
import store from "@/Redux/store"
import { DIALOG_ADD_USER_INVENTORY, DIALOG_USER_PROFILE } from "@/constants/dialog-names"



export const showProfile = (userID:string) => {
    store.dispatch(isLoading(true));
    store.dispatch(showDialog(DIALOG_USER_PROFILE));
    store.dispatch(isLoading(false));
}

export const manageInventory = (userID:string) => {
    store.dispatch(isLoading(true));
    store.dispatch(showDialog(DIALOG_ADD_USER_INVENTORY));
    store.dispatch(isLoading(false));
}