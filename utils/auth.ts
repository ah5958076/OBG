import { ROUTE_VERIFY_CODE } from "@/constants/constants";
import store from "../Redux/store"
let showNotification:any=null; 
import { isLoading } from "@/Redux/actions/loader";
// import { makeXMLRequest } from "./general"; 


export const loginHandler = async (event:any) => {
    store.dispatch(isLoading(true));
    event.preventDefault();
    let data:any = {
        "email": event.target.email.value,
        "password": event.target.password.value
    }
    // makeXMLRequest("/api/login", "post", data).then((response:any) => {
    //     if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }
    //     else
    //         window.location.replace("/admin/dashboard");
    // }).catch((e) => {console.log(e)});
}

export const signupHandler = async (event:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true))
    if(event.target.new_password.value!==event.target.confirm_password.value){
        store.dispatch(isLoading(false));
        store.dispatch(showNotification("New and confirm password not matched", true));
        return;
    }
    
    let data:any = {
        name: event.target.name.value,
        username: event.target.username.value,
        email: event.target.email.value,
        new_password: event.target.new_password.value,
        confirm_password: event.target.confirm_password.value,
    };

    // makeXMLRequest("/api/signup", "post", data).then((response:any) => {
    //     if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         window.location.replace("/");
    //     }
    // }).catch((err) => {
    //     console.log(err);
    // });
}

export const logoutUser = async (event:any) => {
    store.dispatch(isLoading(true));
    event.preventDefault();
    // makeXMLRequest("/api/logout", "get").then((response:any) => {
    //     if(response.auth){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification("Unexpected Error. Please try again", true));
    //     }else{
    //         window.location.replace("/");
    //     }
    // }).catch((err) => {console.log(err)});
}

export const forgotPassword = async (event:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    
    let data:any = {
        'email': event.target.elements.email.value,
    }
    localStorage.setItem("reset-data", JSON.stringify(data));
    window.location.replace(ROUTE_VERIFY_CODE);

    // makeXMLRequest("/api/forgot-password", "post", data).then((response:any) => {
    //     if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         window.location.replace("/forgot-password/verify-code");
    //         store.dispatch(showNotification(response.data));
    //     }
    // }).catch((err:any) => {console.log(err)});
}

export const resendCode = (event:any):any => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    event.preventDefault();
    let data:any = {
        "from_cookie": true,
    }
    // makeXMLRequest("/api/forgot-password", "post", data).then((response:any) => {
    //     store.dispatch(isLoading(false))
    //     if(response.isError){
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         store.dispatch(showNotification("Code sent again to your given email"));
    //     }
    // }).catch((err) => {console.log(err)});
}

export const verifyCode = async (event:any) => {
    store.dispatch(isLoading(true));
    event.preventDefault();

    let session:any = localStorage.getItem("reset-data");
    session = session?JSON.parse(session):null;
    if(!session || !session?.email) window.location.replace("/auth/login");
    session.isVerified=true;
    localStorage.setItem("reset-data", JSON.stringify(session));
    window.location.replace("/auth/reset-password");

    // let data:any = {
    //     code: event.target.elements.code.value,
    // }
    // makeXMLRequest("/api/verifycode", "post", data).then((response:any) => {
    //     if(response.isError){
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }else{
    //         window.location.replace("/forgot-password/verify-code/reset");
    //     }
    // }).catch((err) => {console.log(err)});    
}

export const changePasswordAtLoginHandler = async (event:any) => {
    store.dispatch(isLoading(true));
    event.preventDefault();
    let data:any = {
        "new_password": event.target.elements.new_password.value,
        "confirm_password": event.target.elements.confirm_password.value
    }

    if (data["new_password"] !== data["confirm_password"]) {
        store.dispatch(isLoading(false));
        store.dispatch(showNotification("New and confirm password not matched", true))
        return;
    }

    // makeXMLRequest("/api/change-password", "post", data).then((response:any) => {
    //     if(!response.isError)
    //         window.location.replace("/");
    //     else{
    //         store.dispatch(isLoading(false));
    //         store.dispatch(showNotification(response.data, response.isError));
    //     }
    // }).catch((err) => {console.log(err)});

    console.log(data);
}







export const changePasswordHandler = async (event:any) => {
    event.preventDefault();
    let data = {
        "old_password": event.target.elements.old_password.value,
        "new_password": event.target.elements.new_password.value,
        "confirm_password": event.target.elements.confirm_password.value
    }

    if (data["new_password"] !== data["confirm_password"]) {
        store.dispatch(showNotification("New and confirm password not matched", true))
        return;
    }

    console.log(data);
}