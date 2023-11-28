import React, { useEffect } from 'react'

import OPEN_LOCK from "../../assets/open-lock.svg";
import CLOSE_LOCK from "../../assets/close-lock.svg";
import RED_CROSS from "../../assets/red-cross.svg";
import GREEN_TICK from "../../assets/green-tick.svg";

import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { useRouter } from 'next/navigation';
import store from '../../../../Redux/store'
import { isLoading } from '../../../../Redux/actions/loader'
import { setLoadedData } from '../../../../Redux/actions/pagination'
import { makeXMLRequest } from '../../../../utils/general'
import { block, unblock } from '../../../../utils/grandprix'
import {select_all, select_individual} from "../../../../utils/general"
import { useSelector } from 'react-redux';
import { TITLE_ADMIN_GRANDPRIX } from '../../../../constants/constants';


export const GrandPrix = (props:any) => {
  const data = useSelector((state:any) => {return state.PagesLoading.title===TITLE_ADMIN_GRANDPRIX?state.PagesLoading:null});
  const router = useRouter();

  useEffect(() => {
    if(!data?.data){
      store.dispatch(isLoading(true));
      makeXMLRequest(`/api/grand-prix/list?page_num=${data?data.page_num:1}`, "get").then((response:any) => {
        if(response.auth===true){
          store.dispatch(setLoadedData(TITLE_ADMIN_GRANDPRIX, response, data?data.page_num:1));
          store.dispatch(isLoading(false));
        }else
          router.push("/");
      }).catch((e) => {
        console.log(e)
        store.dispatch(isLoading(false));
        // store.dispatch(showNotification("Something went wrong. Please try again", true));
      });
    }
  }, [router, data]);


  return (
    <>
      {data?.data?
        <>
          <Navbar index={1}/>

          <title>{props.title}</title>

          <div className="container">

            <NameAndExportData url="/api/grand-prix/download-record" title="Grand Prix" />
            <SearchBar url="/api/grand-prix/search" title={TITLE_ADMIN_GRANDPRIX} deleteAll={false} addBtn={false} />

            <div className="table">

              <table>

                <thead>
                  <tr>
                    <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                    <th>Name</th>
                    <th>Grand Prix Owner's</th>
                    <th>Total Teams</th>
                    <th>Owner's Occupation</th>
                    <th>Owner's Yearly Income($)</th>
                    <th>Owner's Address</th>
                    <th>Block/Unblock</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  { data?.data.data.map((obj:any, index:number) => (
                    <tr key={index}>
                      <td><input type="checkbox" name="selection-box" value={obj._id} onChange={ select_individual } /></td>
                      <td>{obj.name}</td>
                      <td>{obj.ownerName}</td>
                      <td>{obj.totalTeams}</td>
                      <td>{obj.ownerOccupation}</td>
                      <td>{obj.ownerYearlyIncome+"$"}</td>
                      <td>{obj.ownerAddress}</td>
                      <td style={{textAlign: "center"}}>
                        <img style={{width:"25px", height:"25px"}} src={obj.isBlocked?CLOSE_LOCK:OPEN_LOCK} alt="" />
                      </td>
                      <td>
                        {obj.isBlocked?
                          <button onClick={ (e)=>{unblock(e, `${obj._id}`, data?data.page_num:1)} }>
                            <img src={GREEN_TICK} alt="" style={{width:"30px", height: "30px"}} />
                          </button>: 
                          <button onClick={ (e)=>{block(e, `${obj._id}`, data?data.page_num:1)} }>
                            <img src={RED_CROSS} alt="" style={{width:"30px", height: "30px"}} />
                          </button>}
                      </td>
                    </tr>))}

                </tbody>

              </table>

            </div>

            <Pagination title={TITLE_ADMIN_GRANDPRIX} page_num={data?data.page_num:1} start={data?.data.start} end={data?.data.end} total={(!(data?.data.start && data?.data.end))?data?.data.data.length:data?.data.total} />

            </div>
        </>:
        null
      }
    
    </>
  )
}