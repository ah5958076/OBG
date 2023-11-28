"use client"
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import Loader from "../../Components/Loader/Loader";
import Admin from "./admin/page";
import Login from "./auth/login";


export default function Home() {
  let router = useRouter()
  // router.push("/auth/login");

  return (
    <>
      
      <Provider store={store}>
        <Loader/>
        <Login/>
        <Admin/>
      </Provider>
    
    </>
  )
  
}
