import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import images from "@/constants/images";
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { Pagination } from '@/Components/Pagination/Pagination'
import { block, unblock } from '@/utils/grandprix'
import {getRequest, navigateTo, select_all, select_individual} from "@/utils/general"
import { useSelector } from 'react-redux';
import { TITLE_ADMIN_GRANDPRIX } from '@/constants/page-titles';
import Image from 'next/image';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { setLoadedData } from '@/Redux/actions/pagination';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { ADMIN_GRAND_PRIX_DOWNLOAD_RECORD_ROUTE, ADMIN_GRAND_PRIX_LIST_ROUTE, ADMIN_GRAND_PRIX_SEARCH_ROUTE } from '@/constants/backend-routes';


const GrandPrix = () => {
  const data = useSelector((state:any) => { return state.pagination?.title===TITLE_ADMIN_GRANDPRIX?state.pagination:"ok" });

  useEffect(() => {
    // if(!data?.data){
    //   store.dispatch(isLoading(true));
    //   getRequest(`${ADMIN_GRAND_PRIX_LIST_ROUTE}?pageNum=${data?data.page_num:1}`).then((response:any) => {
    //     store.dispatch(isLoading(false));
    //     if(response.auth?.auth===true){
    //       store.dispatch(setLoadedData(TITLE_ADMIN_GRANDPRIX, response, data?data.page_num:1));
    //     } else{ navigateTo(null, ROUTE_SIGNIN) }
    //   }).catch((e) => {
    //     console.log(e)
    //     navigateTo(null, ROUTE_SIGNIN)
    //   });
    // }
  }, [data]);


  return (
    <>
      {data?
        <>
          <Navbar index={1}/>

          <title>{TITLE_ADMIN_GRANDPRIX}</title>

          <div className={tableStyles.container}>

            <NameAndExportData url={ADMIN_GRAND_PRIX_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_GRANDPRIX} />
            <SearchBar url={ADMIN_GRAND_PRIX_SEARCH_ROUTE} title={TITLE_ADMIN_GRANDPRIX} deleteAll={false} addBtn={false} />

            <div className={tableStyles.table}>

              <table>

                <thead>
                  <tr>
                    {/* <th><input type="checkbox" name="select_all" onChange={ select_all } /></th> */}
                    <th>Name</th>
                    <th>Grand Prix Owner's</th>
                    <th>Total Teams</th>
                    <th>Owner's Occupation</th>
                    <th>Owner's Yearly Income($)</th>
                    <th>Owner's Address</th>
                    <th className={tableStyles.center}>Block/Unblock</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  { data?.data?.data?.map((obj:any, index:number) => (

                    <tr key={index}>
                      {/* <td><input type="checkbox" name="selection-box" value={obj._id} onChange={ select_individual } /></td> */}
                      <td>{obj.name}</td>
                      <td>{obj.grandPrixOwner}</td>
                      <td>{obj.totalTeams}</td>
                      <td>{obj.ownerOccupation}</td>
                      <td>{obj.ownerYearlyIncome}$</td>
                      <td>{obj.ownerAddress}</td>
                      <td className={tableStyles.center}>
                        <Image width={25} height={25} src={obj.isBlock?images.CLOSE_LOCK:images.OPEN_LOCK} alt="" />
                      </td>
                      <td>
                      {obj.isBlock?
                            <button onClick={ ()=>{unblock(obj._id, data?data.page_num:1)} }>
                              <Image title='Unblock this user' src={images.GREEN_TICK} alt="" style={{width:"30px", height: "30px"}} />
                            </button>: 
                            <button onClick={ ()=>{block(obj._id, data?data.page_num:1)} }>
                              <Image title='Block this user' src={images.RED_CROSS} alt="" style={{width:"30px", height: "30px"}} />
                            </button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination title={TITLE_ADMIN_GRANDPRIX} page_num={data?data?.page_num:1} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end))?data?.data?.data?.length:data?.data?.total} />

            </div>
        </> : ""}

    </>
  )
}

export default GrandPrix;