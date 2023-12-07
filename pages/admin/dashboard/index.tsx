"use client"
import React, { useEffect, useState } from 'react'
import styles from "./dashboard.module.css";

import Navbar from "@/Components/Navbar/Navbar";
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { TITLE_ADMIN_DASHBOARD } from '@/constants/page-titles';
import { getRequest, navigateTo } from '@/utils/general';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { ADMIN_DASHBOARD_ROUTE } from '@/constants/backend-routes';

const Dashboard = (props:any) => {
  const [data, setData]:any = useState();

  useEffect(() => {    
    store.dispatch(isLoading(true));
    getRequest(ADMIN_DASHBOARD_ROUTE).then((data:any) => {
      if(data.auth?.auth===true){
        setData(data);
      }else{
        navigateTo(null, ROUTE_SIGNIN);
      }
      store.dispatch(isLoading(false));
    }).catch((e) => {
      console.log(e);
      navigateTo(null, ROUTE_SIGNIN);
      store.dispatch(isLoading(false));
    });
  }, []);

  return (
    <>

      {data?
        <>
        
          <Navbar index={0}/>
          
          <title>{TITLE_ADMIN_DASHBOARD}</title>

          <div className={styles.real_time_values}>
            <div className={styles.real_values}>
              <span>{data.totalUsers || 0}</span>
              <p>Total Users</p>
            </div>
            <div className={styles.real_values}>
              <span>{data.activeUsers || 0}</span>
              <p>Active Users</p>
            </div>
            <div className={styles.real_values}>
              <span>{data.totalGames || 0}</span>
              <p>Total Games</p>
            </div>
          </div>
      
        </> :
      ""}

    </>

  )
}

export default Dashboard