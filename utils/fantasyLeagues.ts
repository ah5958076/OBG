import { hideDialog, showDialog } from "../Redux/actions/dialogs";
import { isLoading } from "../Redux/actions/loader";
import { loadNewData } from "../Redux/actions/pagination";
import store from "../Redux/store";
import { DIALOG_ADD_FANTASY_LEAGUES, DIALOG_ADD_USER_INVENTORY, DIALOG_UPDATE_FANTASY_LEAGUES } from "../constants/dialog-names";
import { TITLE_ADMIN_FANTASY_LEAGUES } from "../constants/page-titles";
// import { makeXMLRequest, openEditDialog } from "./general";

let ALLOWED_EXTENSIONS:string=process.env.ALLOWED_EXTENSIONS || "";

export const openAddNewDialog = () => {
    store.dispatch(isLoading(true));
    // makeXMLRequest("/api/grand-prix/list?page_num=-1", "get").then((response) => {
    //     store.dispatch(isLoading(false));
    //     if(!response.auth)
    //         window.location.replace("/");
    //     else if(response?.data)
    //         store.dispatch(showDialog(DIALOG_ADD_FANTASY_LEAGUES, response.data));
    //     else
    //         store.dispatch(showNotification("There is unexpected error. Please refresh and try again", true));
    // }).catch((err) => {
    //     console.log(err)
    //     store.dispatch(isLoading(false));
    //     store.dispatch(showNotification("Something went wrong. Please try again", true));
    // });
}

export const addNewHandler = (e:any) => {
    e.preventDefault();
    
    store.dispatch(isLoading(true));
    let data = {
        "name": e.target.elements.name.value,
        "grandPrixLeague": e.target.elements.grandPrix_league.value,
        "totalTeams": e.target.elements.total_teams.value,
        "teamSize": e.target.elements.team_size.value,
        "year": e.target.elements.year.value,
    }
    
    // makeXMLRequest("/api/fantasy-league/store/", "post", data).then((response) => {
    //     if(!response.auth)
    //         window.location.replace("/")
    //     else if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         store.dispatch(hideDialog());
    //         store.dispatch(loadNewData(TITLE_ADMIN_FANTASY_LEAGUES, store.getState().PagesLoading.page_num));
    //     }
    // }).catch(async (err) => {
    //     let error = await err;
    //     if(error.includes("Only Images are allowed")){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification("Only "+ALLOWED_EXTENSIONS+" are allowed", true));
    //     }else{
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification("Something went wrong. Please try again", true));
    //     }
    // });
}

export const fetchGrandPrixforEditDialog = (id:any) => {
    store.dispatch(isLoading(true));

    // let dummyData = {
    //     "name":"Name",
    //     "grandPrixLeague": {
    //         "_id":"-"
    //     },
    //     "totalTeams":"4",
    //     "teamSize":"4",
    //     "year":"2022"
    // }
    // store.dispatch(showDialog(DIALOG_UPDATE_FANTASY_LEAGUES, dummyData))

    store.dispatch(isLoading(false));
    
    // makeXMLRequest("/api/grand-prix/list?page_num=-1", "get").then((response) => {
    //     if(!response.auth)
    //         window.location.replace("/")
    //     else if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, true));
    //     }else
    //         openEditDialog(DIALOG_UPDATE_FANTASY_LEAGUES, id, "/api/fantasy-league/show", {grandPrix: response.data});
    // }).catch((err) => {
    //     console.log(err);
    //     store.dispatch(isLoading(false));
    //     store.dispatch(showNotification("Something went wrong. Please try again", true));
    // });
}

export const updateLeagueHanlder = (e:any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));

    let data={
        "id": e.target.elements.id.value,
        "name": e.target.elements.name.value,
        "grandPrixLeague": e.target.elements.grandPrix_league.value,
        "teamSize": e.target.elements.team_size.value,
        "totalTeams": e.target.elements.total_teams.value,
        "year": e.target.elements.year.value,
    }

    // makeXMLRequest("/api/fantasy-league/update", "post", data).then((response) => {
    //     if(!response.auth)
    //         window.location.replace("/");
    //     else if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         store.dispatch(hideDialog());
    //         store.dispatch(loadNewData(TITLE_ADMIN_FANTASY_LEAGUES, store.getState().PagesLoading.page_num));
    //     }
    // }).catch((err) => {
    //     console.log(err);
    //     store.dispatch(isLoading(false));
    //     store.dispatch(showNotification("Something went wrong. Please try again", true));
    // })
}