import { ROUTE_ADMIN_DASHBOARD, ROUTE_RESET_PASSWORD, ROUTE_SIGNIN, ROUTE_USER_DASHBOARD, ROUTE_VERIFY_CODE } from "@/constants/routes";
import store from "../Redux/store"
import { isLoading } from "@/Redux/actions/loader";
import { getRequest, navigateTo, postRequest } from "./general";
import { toast } from "react-toastify";
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, RESET_PASSWORD_ROUTE, SIGNUP_ROUTE, VERIFY_CODE_ROUTE } from "@/constants/backend-routes";


// before login functions...
export const loginHandler = async (event:any) => {
    event.preventDefault();    
    store.dispatch(isLoading(true));
    let data:any = {
        "email": event.target.email.value,
        "password": event.target.password.value
    }

    postRequest(LOGIN_ROUTE, data).then((response:any) => {
        console.log(response);
        if(response.isError){
            store.dispatch(isLoading(false));
            toast.error(response.data);
        } else {
            localStorage.setItem("token", response.data?.token);
            store.dispatch(isLoading(false));
            toast.success("Login Successfuly");
            if(response.data?.role==="Admin")
                navigateTo(null, ROUTE_ADMIN_DASHBOARD);
            else if(response.data?.role==="User")
                navigateTo(null, ROUTE_USER_DASHBOARD);
        }
    }).catch((e) => {
        store.dispatch(isLoading(false));
        console.log(e)
    });
}

export const signupHandler = async (event:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true))
    
    let data:any = {
        fullName: event.target.name.value,
        username: event.target.username.value,
        email: event.target.email.value,
        password: event.target.new_password.value,
    };

    if(data.password!==event.target.confirm_password.value){
        store.dispatch(isLoading(false));
        toast.error("New and confirm password not matched");
        return;
    }
    
    postRequest(SIGNUP_ROUTE, data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            toast.error(response.data);
        }else{
            toast.success(response.data);
            navigateTo(null, ROUTE_SIGNIN);
        }
    }).catch((err) => {
        store.dispatch(isLoading(false));
        console.log(err);
    });
}

export const logoutUser = (event:any) => {    
    event.preventDefault();
    store.dispatch(isLoading(true));
    getRequest(LOGOUT_ROUTE).then((response:any) => {
        store.dispatch(isLoading(false));
        if(response.isError) {toast.error(response.data)}
        else {
            toast.success(response.data); 
            localStorage.removeItem("token");
            navigateTo(null, ROUTE_SIGNIN);
        }
    }).catch((err) => {
        store.dispatch(isLoading(false));
        console.log(err)
    });
}

export const forgotPassword = async (event:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    
    let data:any = {
        'email': event.target.elements.email.value,
    }

    postRequest(FORGOT_PASSWORD_ROUTE, data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            toast.error(response.data);
        }else{
            localStorage.setItem("reset-data", JSON.stringify(data));
            toast.success(response.data);
            navigateTo(null, ROUTE_VERIFY_CODE)
        }
    }).catch((err:any) => {
        store.dispatch(isLoading(true));
        console.log(err);
    });
}

export const resendCode = (event:any):any => {
    event.preventDefault();
    store.dispatch(isLoading(true));

    let data = JSON.parse(localStorage.getItem("reset-data") || "{}");
    if(!data || !data?.email){
        toast.error("Unexpected Error. Please refresh and try again");
        return;
    }

    postRequest(FORGOT_PASSWORD_ROUTE, data).then((response:any) => {
        store.dispatch(isLoading(false))
        if(response.isError) {toast.error(response.data)}
        else {toast.success(response.data)}
    }).catch((err) => {
        store.dispatch(isLoading(false))
        console.log(err)
    });
}

export const verifyCode = async (event:any) => {
    store.dispatch(isLoading(true));
    event.preventDefault();

    let session:any = localStorage.getItem("reset-data");
    session = session?JSON.parse(session):null;
    if(!session || !session?.email) {navigateTo(null, ROUTE_SIGNIN);return}
    
    let data:any = {
        reset_code: event.target.elements.code.value,
        email: session?.email,
    }

    postRequest(VERIFY_CODE_ROUTE, data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            toast.error(response.data);
        }else{
            session.isVerified=true;
            localStorage.setItem("reset-data", JSON.stringify(session));
            toast.success(response.data);
            navigateTo(null, ROUTE_RESET_PASSWORD);
        }
    }).catch((err) => {
        store.dispatch(isLoading(false));
        console.log(err);
    });    
}

export const changePasswordAtLoginHandler = async (event:any) => {
    event.preventDefault();
    store.dispatch(isLoading(true));
    
    if(event.target.new_password.value!==event.target.confirm_password.value){
        store.dispatch(isLoading(false));
        toast.error("New and confirm password not matched");
        return;
    }

    let data:any = {
        "password": event.target.elements.new_password.value,
    }

    let session =JSON.parse(localStorage.getItem("reset-data") || "{}");
    if(session?.email)
        data.email=session.email;
    else{
        toast.error("Unexpected Error. Please try again");
        return;
    }

    postRequest(RESET_PASSWORD_ROUTE, data).then((response:any) => {
        if(response.isError){
            store.dispatch(isLoading(false));
            toast.error(response.data);
        } else {
            store.dispatch(isLoading(false));
            toast.success(response.data);
            navigateTo(null, ROUTE_SIGNIN);
        }
    }).catch((err) => {
        store.dispatch(isLoading(false));
        console.log(err);
    });
}






// after login function...
export const changePasswordHandler = async (event:any) => {
    event.preventDefault();
    let data = {
        "old_password": event.target.elements.old_password.value,
        "new_password": event.target.elements.new_password.value,
        "confirm_password": event.target.elements.confirm_password.value
    }

    if (data["new_password"] !== data["confirm_password"]) {
        return;
    }

    console.log(data);
}