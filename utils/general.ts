import fileDownload from "js-file-download";
import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { loadNewData, setLoadedData } from "../Redux/actions/pagination";
import { hideDialog, showDialog } from "../Redux/actions/dialogs";
import { DIALOG_CONFIRMATION } from "../constants/dialog-names";
import { toast } from "react-toastify";
import axios from "axios";
import { ROUTE_SIGNIN } from "@/constants/routes";
import { BASE_URL } from "@/constants/backend-routes";
import { UNAUTHORIZED } from "@/constants/constants";


axios.defaults.baseURL=BASE_URL;


const month_array = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



export const navigateTo = (event: any, url: string) => {
    if (event) event.preventDefault();
    store.dispatch(isLoading(true));
    window.location.replace(url);
}

export const upload_image_preview = (e: any) => {
    e.preventDefault();
    try{
        let url = URL.createObjectURL(e?.target?.files[0]);
        if(e?.imageViewer)
            e.imageViewer(url);
        else
            e.target.parentElement.querySelector("img").src = url;
    }catch(e){}
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

export const export_data = (e: any, url: string) => {
    e.preventDefault();
    store.dispatch(isLoading(true));
    let file_name = e.currentTarget.title + ".xlsx";

    getRequest(url).then((response: any) => {
        let filePath = response?.data?.result?.path;
        
        fetch(BASE_URL+filePath).then(async (res) => {
            fileDownload(await res.arrayBuffer(), file_name);
            toast.success(response?.data?.message);
            store.dispatch(isLoading(false));
        }).catch((err) => {
            toast.error(err?.data?.message);
            store.dispatch(isLoading(false));
        });
    }).catch((err) => {
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
    });
}

export const searchData = (value: string, title: any, url: any) => {
    let data: any = {
        filter: value,
    }
    if (value) {
        postRequest(url, data).then((response: any) => {
            let response_data = {
                data: response?.data?.result.filteredData,
                start: 0,
                end: 0,
                total: response?.data?.result?.filteredData?.length
            }
            
            store.dispatch(setLoadedData(title, response_data, 1));
        }).catch((err) => {
            if(err?.status===400){
                localStorage.removeItem("token");
                navigateTo(null, ROUTE_SIGNIN);
            }
            toast.error(err?.data?.message);
            store.dispatch(isLoading(false));
        });
    } else {
        store.dispatch(loadNewData(title, 1));
    }
}

export const computeDate = (date: any) => {
    let _date = new Date(date);
    return month_array[_date.getMonth()] + " " + ((_date.getDate() < 10) ? "0" : "") + _date.getDate() + ", " + _date.getFullYear();
}

export const openEditDialog = (dialog_name: any, id: any, url: any = null) => {
    store.dispatch(isLoading(true));

    getRequest(`${url}/${id}`).then((response:any) => {
        store.dispatch(showDialog(dialog_name, response?.data?.result));
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
    if(options?.ids?.length>0){
        let data:any = {ids: options.ids};
        postRequest(options.url, data).then((response:any) => {
            let checkbox:any = document.querySelector("input[name='select_all']");
            checkbox.checked=false;
            store.dispatch(loadNewData(options.pageTitle, store.getState().pagination.page_num));
            store.dispatch(hideDialog());
            toast.success(response?.data?.message);
        }).catch((err) => {
            store.dispatch(isLoading(false));
            toast.error(err?.data?.message);
        });
    }else{
        store.dispatch(hideDialog());
        store.dispatch(isLoading(false));
        toast.error("Unexpected Error. Please try again");
    }
}

export const getRequest = (url: string) => {
    return new Promise(async (resolve, reject) => {
        let token = localStorage.getItem("token") || "";
        let response: any = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch((e: any) => {
            reject(e.response);
        });
        if (response?.status === 200)
            resolve(response);
    });
}

export const postRequest = (url: any, data = null) => {
    return new Promise(async (resolve, reject) => {
        let token = localStorage.getItem("token") || "";
        let response: any = await axios.post(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).catch((e: any) => {
            reject(e.response);
        });
        if (response?.status === 200)
            resolve(response);
    });
}