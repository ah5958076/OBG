import { hideDialog, showDialog } from "../Redux/actions/dialogs";
import { isLoading } from "../Redux/actions/loader";
import { loadNewData } from "../Redux/actions/pagination";
import store from "../Redux/store";
import { ALLOWED_EXTENSIONS, DIALOG_ADD_GP_LEAGUES, DIALOG_UPDATE_GP_LEAGUES, TITLE_ADMIN_GPLEAGUES } from "../constants/constants";
import { makeFormRequest, makeXMLRequest, openEditDialog } from "./general";
let showNotification:any=null


export const openAddNewDialog = () => {
    store.dispatch(isLoading(true));
    makeXMLRequest("/api/game/list?page_num=-1", "get").then((response:any) => {
        store.dispatch(isLoading(false));
        if(!response.auth)
            window.location.replace("/");
        else if(response?.data)
            store.dispatch(showDialog(DIALOG_ADD_GP_LEAGUES, response.data));
        else
            store.dispatch(showNotification("There is unexpected error. Please refresh and try again", true));
    }).catch((err) => {
        console.log(err)
        store.dispatch(isLoading(false));
        store.dispatch(showNotification("Something went wrong. Please try again", true));
    });
}

export const addNewHandler = (e:any) => {
    e.preventDefault();
    
    store.dispatch(isLoading(true));
    let formData:any = new FormData()
    formData.append("name", e.target.elements.name.value);
    formData.append("gameName", e.target.elements.gameName.value);
    formData.append("entryFee", e.target.elements.entryFee.value);
    formData.append("prize", e.target.elements.prize.value);
    formData.append("teamSize", e.target.elements.teamSize.value);
    formData.append("totalTeams", e.target.elements.totalTeams.value);
    formData.append("startingDate", e.target.elements.startingDate.value);
    formData.append("endingDate", e.target.elements.endingDate.value);
    formData.append("picture", e.target.elements.picture.files[0]);

    const ext:any = formData?.get("picture").name.split(".").pop().toLowerCase();
    if(!ALLOWED_EXTENSIONS.toLowerCase().includes(ext)) {
        store.dispatch(isLoading(false));
        store.dispatch(showNotification("Only Images with ("+ALLOWED_EXTENSIONS+") extensions are allowed", true));
        return;
    }

    makeFormRequest("/api/gp-league/store/", "post", formData).then((response:any) => {
        if(!response.auth)
            window.location.replace("/")
        else if(response.isError){
            store.dispatch(isLoading(false));
            store.dispatch(showNotification(response.data, response.isError));
        }else{
            store.dispatch(hideDialog());
            store.dispatch(loadNewData(TITLE_ADMIN_GPLEAGUES, store.getState().PagesLoading.page_num));
        }
    }).catch(async (err) => {
        let error = await err;
        if(error.includes("Only Images are allowed")){
            store.dispatch(isLoading(false));
            store.dispatch(showNotification("Only "+ALLOWED_EXTENSIONS+" are allowed", true));
        }else{
            store.dispatch(isLoading(false));
            store.dispatch(showNotification("Something went wrong. Please try again", true));
        }
    });
}

export const fetchGamesforEditDialog = (id:any) => {
    store.dispatch(isLoading(true));
    makeXMLRequest("/api/game/list?page_num=-1", "get").then((response:any) => {
        if(!response.auth)
            window.location.replace("/")
        else if(response.isError){
            store.dispatch(isLoading(false));
            store.dispatch(showNotification(response.data, true));
        }else
            openEditDialog(DIALOG_UPDATE_GP_LEAGUES, id, "/api/gp-league/show", {games: response.data});
    }).catch((err) => {
        console.log(err);
        store.dispatch(isLoading(false));
        store.dispatch(showNotification("Something went wrong. Please try again", true));
    });
}

export const updateLeagueHanlder = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data = e.target.elements;
    let formData:any = new FormData();
    formData.set("id", data.id.value);
    formData.set("name", data.name.value);
    formData.set("gameName", data.gameName.value);
    formData.set("entryFee", data.entryFee.value);
    formData.set("prize", data.prize.value);
    formData.set("teamSize", data.teamSize.value);
    formData.set("totalTeams", data.totalTeams.value);
    formData.set("startingDate", data.startingDate.value);
    formData.set("endingDate", data.endingDate.value);
    formData.set("picture", data.picture.files[0]);
    formData.set("old_picture", data.old_picture.value);

    makeFormRequest("/api/gp-league/update", "post", formData).then((response:any) => {
        if(!response.auth)
            window.location.replace("/");
        else if(response.isError){
            store.dispatch(isLoading(false));
            store.dispatch(showNotification(response.data, response.isError));
        }else{
            store.dispatch(hideDialog());
            store.dispatch(loadNewData(TITLE_ADMIN_GPLEAGUES, store.getState().PagesLoading.page_num));
        }
    }).catch((err) => {
        console.log(err);
        store.dispatch(isLoading(false));
        store.dispatch(showNotification("Something went wrong. Please try again", true));
    })
}