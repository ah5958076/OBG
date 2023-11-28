"use client"
import React, { useEffect, useState } from 'react'
import styles from "./dashboard.module.css";

import Navbar from "@/Components/Navbar/Navbar";
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
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
          
          <title>{props.title}</title>

          <div className={styles.real_time_values}>
            <div className={styles.real_values}>
              <span>{data.users}</span>
              <p>Total Users</p>
            </div>
            <div className={styles.real_values}>
              <span>{data.active_users}</span>
              <p>Active Users</p>
            </div>
            <div className={styles.real_values}>
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