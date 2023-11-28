"use client"
import React, { useEffect, useState } from 'react'
import "./Dashboard.css"

import Navbar from '../../../../Components/Navbar/Navbar';
import { getRequest } from '../../../../utils/general';
import { isLoading } from '../../../../Redux/actions/loader';
import store from '../../../../Redux/store';
import { useRouter } from 'next/navigation';

const Dashboard = (props:any) => {
  const [data, setData]:any = useState("hello");
  const router = useRouter();

  useEffect(() => {
    store.dispatch(isLoading(true));
    getRequest("/api/dashboard/list").then((data:any) => {
      store.dispatch(isLoading(false));
      if(data.auth===true)
        setData(data);
      else
        router.push("/");
    }).catch((e) => {
      console.log(e);
      store.dispatch(isLoading(false));
      // store.dispatch(showNotification("Something went wrong. Please try again", true));
    })
  }, [router]);

  return (
    <>

      {data?
        <>
        
          <Navbar index={0}/>
          
          <title>{props.title}</title>

          <div className="real-time-values">
            <div className="real-values">
              <span>{data.users}</span>
              <p>Total Users</p>
            </div>
            <div className="real-values">
              <span>{data.active_users}</span>
              <p>Active Users</p>
            </div>
            <div className="real-values">
              <span>{data.games}</span>
              <p>Total Games</p>
            </div>
          </div>
      
        </> :
      ""}

    </>

  )
}

export default Dashboard