import fileDownload from "js-file-download";
import { isLoading } from "../Redux/actions/loader";
import store from "../Redux/store";
import { loadNewData, setLoadedData } from "../Redux/actions/pagination";
import { hideDialog, showDialog } from "../Redux/actions/dialogs";
import { DIALOG_CONFIRMATION } from "../constants/dialog-names";
import { toast } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";
// axios.defaults.baseURL=process.env.BACKEND_BASE_URL || "http://localhost:3001/";


const month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



export const navigateTo = (event: any, url: string) => {
    if (event) event.preventDefault();
    store.dispatch(isLoading(true));
    window.location.replace(url);
}

export const upload_image_preview = (e: any) => {
    e.preventDefault();
    let url = URL.createObjectURL(e.target.files[0]);
    e.target.parentElement.querySelector("img").src = url;
}

export const select_all = (e: any) => {
    document.querySelectorAll("input[type='checkbox']").forEach((element: any) => element.checked = e.target.checked);
}

export const select_individual = (e: any) => {
    let selectAll_check: any = document.querySelector("input[type='checkbox']");
    let checks: any = document.querySelectorAll("input[type='checkbox']:not([name='select_all'])");
    let all_checked = true;
    for (let i of checks) {
        if (!i.checked) {
            all_checked = false;
            break;
        }
    }
    selectAll_check.checked = all_checked;
}

export const export_data = (e: any) => {
    e.preventDefault();
    store.dispatch(isLoading(true));
    let file_name = e.currentTarget.title + ".xlsx";
    let url = e.currentTarget.name;
    getRequest(url).then((response: any) => {
        if (!response.auth)
            window.location.replace("/")
        else if (response.isError) {
            store.dispatch(isLoading(false));
            // store.dispatch(showNotification(response.data, response.isError));
        } else {
            fetch("/" + response.data).then(async (res) => {
                fileDownload(await res.arrayBuffer(), file_name);
                store.dispatch(isLoading(false));
            }).catch((err) => {
                console.log(err);
                store.dispatch(isLoading(false));
                // store.dispatch(showNotification("Something went wrong. Please try again", true));
            });
        }
    }).catch((err) => {
        console.log(err)
        store.dispatch(isLoading(false));
        // store.dispatch(showNotification("Something went wrong. Please try again", true));
    });
}

export const searchData = (value: string, title: any, url: any) => {
    let data: any = {
        filter: value,
    }
    if (value) {
        getRequest(url).then((response: any) => {
            if (response.auth) {
                if (response.isError) {
                    // store.dispatch(showNotification("Unexpected Error", true));
                } else {
                    store.dispatch(setLoadedData(title, response, 1));
                }
            } else
                window.location.replace("/");
        }).catch((err) => {
            console.log(err)
            store.dispatch(isLoading(false));
            // store.dispatch(showNotification("Something went wrong. Please try again", true));
        });
    } else {
        let newURL = url.split("/");
        newURL.pop();
        newURL = newURL.join("/") + "/list"
        // getRequest(newURL+"?page_num="+page_num).then((response:any) => {
        //     if(response.auth){
        //         if(response.isError){
        //             // store.dispatch(showNotification("Unexpected Error", true));
        //         }else{
        //             store.dispatch(setLoadedData(title, response, 1));
        //         }
        //     }else
        //         window.location.replace("/");
        // }).catch((err) => {
        //     console.log(err)
        //     store.dispatch(isLoading(false));
        //     // store.dispatch(showNotification("Something went wrong. Please try again", true));
        // });
    }
}

export const computeDate = (date: any) => {
    let _date = new Date(date);
    return month_array[_date.getMonth()] + " " + ((_date.getDate() < 10) ? "0" : "") + _date.getDate() + ", " + _date.getFullYear();
}

export const openEditDialog = (dialog_name: any, id: any, url: any = null, extendedData: any = null) => {
    store.dispatch(isLoading(true));
    let data: any = { id: id }

    store.dispatch(showDialog(dialog_name))
    store.dispatch(isLoading(false));


    // postRequest(url, data).then((response:any) => {
    //     if(!response.auth)
    //         window.location.replace("/")
    //     else if(!response.isError){
    //         store.dispatch(showDialog(dialog_name, {...extendedData, ...response.data}));
    //         store.dispatch(isLoading(false));
    //     }else{
    //         store.dispatch(isLoading(false));
    //         // store.dispatch(showNotification(response.data, true));
    //     }
    // }).catch((err) => {
    //     console.log(err)
    //     store.dispatch(isLoading(false));
    //     // store.dispatch(showNotification("Something went wrong. Please try again", true));
    // })
}

export const openDeleteDialog = (page_title: any, url: any = null, id: any = null) => {
    store.dispatch(isLoading(true));

    let ids: any = [];
    if (id) {
        ids.push(id);
    } else {
        ids = [];
        let checks: any = document.querySelectorAll("input[type='checkbox']:not([name='select_all'])");
        for (let i of checks) {
            if (i.checked) {
                ids.push(i.value)
            }
        }
    }

    let data = {
        pageTitle: page_title,
        url: url,
        ids: ids,
        // mode: OPENED_FOR_DELETION
    }
    store.dispatch(showDialog(DIALOG_CONFIRMATION, data));
    store.dispatch(isLoading(false));
}

export const confirmationHandler = async (options: any) => {
    store.dispatch(isLoading(true));
    toast.success("Deleted Successfully. Its prototype 😊")
    // if(/*options?.mode===OPENED_FOR_DELETION &&*/ options?.ids){
    //     let data:any = {ids: options.ids};
    //     getRequest(options.url).then((response:any) => {
    //         if(!response.auth)
    //         window.location.replace("/")
    //         else if(response.isError){
    //             store.dispatch(isLoading(false));
    //             // store.dispatch(showNotification(response.data, response.isError));
    //         }else{
    //             store.dispatch(hideDialog());
    //             // store.dispatch(loadNewData(options.pageTitle, store.getState().PagesLoading.page_num));
    //         }
    //     }).catch((err) => {console.log(err)});
    // }else{
    //     store.dispatch(isLoading(false));
    //     // store.dispatch(showNotification("Nothing to do with dialog. Please refresh and try again", true));
    //     store.dispatch(hideDialog());
    // }
    store.dispatch(hideDialog());
    store.dispatch(isLoading(false));
}

export const getRequest = (url: string) => {
    return new Promise(async (resolve, reject) => {
        let token = localStorage.getItem("token") || "";
        let response: any = await axios.get(url, {
            headers: {
                "Authorization": `${token}`
            }
        }).catch((e: any) => console.log(e));
        if (response?.status === 200)
            resolve(response?.data);
        reject(response?.message);
    });
}

export const postRequest = (url: any, data = null) => {
    return new Promise(async (resolve, reject) => {
        let token = localStorage.getItem("token") || "";
        let response: any = await axios.post(url, data, {
            headers: {
                "Authorization": `${token}`
            }
        }).catch((e: any) => {
            toast.error(e.response.data.message);
            // console.log(e)
        });
        if (response?.status === 200)
            resolve(response?.data);
        reject(response?.message);


    });
}