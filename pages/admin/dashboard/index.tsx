"use client"
import React, { useEffect, useState } from 'react'
import styles from "./dashboard.module.css";

import Navbar from "@/Components/Navbar/Navbar";
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { TITLE_ADMIN_DASHBOARD } from '@/constants/page-titles';
// import { getRequest } from '../../../../utils/general';

const Dashboard = (props:any) => {
  const [data, setData]:any = useState("hello");

  useEffect(() => {
    store.dispatch(isLoading(false));

    // getRequest("/api/dashboard/list").then((data:any) => {
    //   store.dispatch(isLoading(false));
    //   if(data.auth===true)
    //     setData(data);
    //   else
    //     router.push("/");
    // }).catch((e) => {
    //   console.log(e);
    //   store.dispatch(isLoading(false));
    //   // store.dispatch(showNotification("Something went wrong. Please try again", true));
    // })
  });

  return (
    <>

      {data?
        <>
        
          <Navbar index={0}/>
          
          <title>{TITLE_ADMIN_DASHBOARD}</title>

          <div className={styles.real_time_values}>
            <div className={styles.real_values}>
              <span>{data.users || 0}</span>
              <p>Total Users</p>
            </div>
            <div className={styles.real_values}>
              <span>{data.active_users || 0}</span>
              <p>Active Users</p>
            </div>
            <div className={styles.real_values}>
              <span>{data.games || 0}</span>
              <p>Total Games</p>
            </div>
          </div>
      
        </> :
      ""}

    </>

  )
}

export default Dashboard