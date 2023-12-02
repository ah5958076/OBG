import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import images from "@/constants/images";
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { Pagination } from '@/Components/Pagination/Pagination'
import { block, unblock } from '@/utils/grandprix'
import {select_all, select_individual} from "@/utils/general"
import { useSelector } from 'react-redux';
import { TITLE_ADMIN_GRANDPRIX } from '@/constants/page-titles';
import Image from 'next/image';


const GrandPrix = (props:any) => {
  const data = useSelector((state:any) => { return state.pagination.title===TITLE_ADMIN_GRANDPRIX?state.pagination:null });

  useEffect(() => {
    // if(!data?.data){
    //   store.dispatch(isLoading(true));
    //   makeXMLRequest(`/api/grand-prix/list?page_num=${data?data.page_num:1}`, "get").then((response:any) => {
    //     if(response.auth===true){
    //       store.dispatch(setLoadedData(TITLE_ADMIN_GRANDPRIX, response, data?data.page_num:1));
    //       store.dispatch(isLoading(false));
    //     }else
    //       router.push("/");
    //   }).catch((e) => {
    //     console.log(e)
    //     store.dispatch(isLoading(false));
    //     // store.dispatch(showNotification("Something went wrong. Please try again", true));
    //   });
    // }
  }, [data]);


  return (
    <>
      {/* {data?.data? */}
        <>
          <Navbar index={1}/>

          <title>{TITLE_ADMIN_GRANDPRIX}</title>

          <div className={tableStyles.container}>

            <NameAndExportData url="/api/grand-prix/download-record" title={TITLE_ADMIN_GRANDPRIX} />
            <SearchBar url="/api/grand-prix/search" title={TITLE_ADMIN_GRANDPRIX} deleteAll={false} addBtn={false} />

            <div className={tableStyles.table}>

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
                    <th className={tableStyles.center}>Block/Unblock</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td><input type="checkbox" name="selection-box" value={1} onChange={ select_individual } /></td>
                    <td>Name 1</td>
                    <td>Owner 1</td>
                    <td>4</td>
                    <td>Occupation 1</td>
                    <td>10,000$</td>
                    <td>Address 1</td>
                    <td className={tableStyles.center}>
                      <Image width={25} height={25} src={images.CLOSE_LOCK} alt="" />
                    </td>
                    <td>
                        <button className='not-a-button' onClick={ (e)=>{unblock(e, ``, data?data.page_num:1)} }>
                          <Image src={images.GREEN_TICK} alt="..." width={30} height={30} />
                        </button>
                        <button className='not-a-button' onClick={ (e)=>{block(e, ``, data?data.page_num:1)} }>
                          <Image src={images.RED_CROSS} alt="..." width={30} height={30} />
                        </button>
                    </td>
                  </tr>
                  
                  <tr>
                    <td><input type="checkbox" name="selection-box" value={1} onChange={ select_individual } /></td>
                    <td>Name 1</td>
                    <td>Owner 1</td>
                    <td>4</td>
                    <td>Occupation 1</td>
                    <td>10,000$</td>
                    <td>Address 1</td>
                    <td className={tableStyles.center}>
                      <Image width={25} height={25} src={images.CLOSE_LOCK} alt="" />
                    </td>
                    <td>
                        <button className='not-a-button' onClick={ (e)=>{unblock(e, ``, data?data.page_num:1)} }>
                          <Image src={images.GREEN_TICK} alt="..." width={30} height={30} />
                        </button>
                        <button className='not-a-button' onClick={ (e)=>{block(e, ``, data?data.page_num:1)} }>
                          <Image src={images.RED_CROSS} alt="..." width={30} height={30} />
                        </button>
                    </td>
                  </tr>


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
                        <img style={{width:"25px", height:"25px"}} src={obj.isBlocked?images.CLOSE_LOCK:images.OPEN_LOCK} alt="" />
                      </td>
                      <td>
                        {obj.isBlocked?
                          <button onClick={ (e)=>{unblock(e, `${obj._id}`, data?data.page_num:1)} }>
                            <img src={images.GREEN_TICK} alt="" style={{width:"30px", height: "30px"}} />
                          </button>: 
                          <button onClick={ (e)=>{block(e, `${obj._id}`, data?data.page_num:1)} }>
                            <img src={images.RED_CROSS} alt="" style={{width:"30px", height: "30px"}} />
                          </button>}
                      </td>
                    </tr>))}

                </tbody>

              </table>

            </div>

            <Pagination title={TITLE_ADMIN_GRANDPRIX} page_num={data?data.page_num:1} start={data?.data.start} end={data?.data.end} total={(!(data?.data.start && data?.data.end))?data?.data.data.length:data?.data.total} />

            </div>
        </>
        {/* : */}
        {/* null */}
      {/* } */}
    
    </>
  )
}

export default GrandPrix;