import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { VERIFY_TOKEN_ROUTE } from "@/constants/backend-routes";
import { ROUTE_ADMIN_DASHBOARD, ROUTE_SIGNIN, ROUTE_USER_DASHBOARD } from "@/constants/routes";
import { getRequest, navigateTo } from "@/utils/general";
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    store.dispatch(isLoading(true));
    getRequest(VERIFY_TOKEN_ROUTE).then((response:any) => {
      console.log(response);
      if(response?.data?.result?.user?.role==="Admin")
        navigateTo(null, ROUTE_ADMIN_DASHBOARD);
      else if(response?.data?.result?.user?.role==="User")
        navigateTo(null, ROUTE_USER_DASHBOARD);
    }).catch((err) =>{
      localStorage.removeItem("token");
      navigateTo(null, ROUTE_SIGNIN)
    });
  });

  return (<></>)
}
