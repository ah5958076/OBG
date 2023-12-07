import { isLoading } from "@/Redux/actions/loader";
import store from "@/Redux/store";
import { VERIFY_TOKEN_ROUTE } from "@/constants/backend-routes";
import { ROUTE_ADMIN_DASHBOARD, ROUTE_SIGNIN, ROUTE_USER_DASHBOARD } from "@/constants/routes";
import { getRequest, navigateTo } from "@/utils/general";
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    store.dispatch(isLoading(true));
    getRequest(VERIFY_TOKEN_ROUTE).then((data:any) => {
      if(data.auth?.auth) {
        if(data.auth?.role==="Admin")
          navigateTo(null, ROUTE_ADMIN_DASHBOARD);
        else if(data.auth?.role==="User")
          navigateTo(null, ROUTE_USER_DASHBOARD);
      }
      else {navigateTo(null, ROUTE_SIGNIN)}
    }).catch((e) =>{
      console.log(e);
      navigateTo(null, ROUTE_SIGNIN);
    });
  });

  return (<></>)
}
