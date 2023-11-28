import { ROUTE_SIGNIN } from "@/constants/constants";
import { navigateTo } from "@/utils/general";
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    navigateTo(null, ROUTE_SIGNIN);
  });

  return (<></>)
}
