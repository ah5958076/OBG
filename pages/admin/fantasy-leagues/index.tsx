import React, { useEffect } from 'react'

import { NameAndExportData } from "@/Components/NameAndExportData/NameAndExportData"
import Navbar from "@/Components/Navbar/Navbar"
import { SearchBar } from "@/Components/SearchBar/SearchBar"
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_ADD_FANTASY_LEAGUES, DIALOG_CONFIRMATION } from '@/constants/dialog-names'
import { TITLE_ADMIN_FANTASY_LEAGUES } from '@/constants/page-titles'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { computeDate, openDeleteDialog, select_all, select_individual } from '@/utils/general'
import { fetchGrandPrixforEditDialog, openAddNewDialog } from '@/utils/fantasyLeagues';


const FantasyLeagues = (props:any) => {
  const data = useSelector((state:any) => {return state.pagination.title===TITLE_ADMIN_FANTASY_LEAGUES?state.pagination:null});
  const router = useRouter();

  useEffect(() => {
    // if(!data?.data){
    //   store.dispatch(isLoading(true));
    //   makeXMLRequest(`/api/fantasy-league/list?page_num=${data?data.page_num:1}`, "get").then((response:any) => {
    //     if(response.auth===true){
    //       store.dispatch(setLoadedData(TITLE_ADMIN_FANTASY_LEAGUES, response, data?data.page_num:1));
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
    
      <Navbar index={3}/>

      <title>{TITLE_ADMIN_FANTASY_LEAGUES}</title>

      <div className="container">

        <NameAndExportData url="/api/fantasy-league/download-record" title="Fantasy Leagues" />
        <SearchBar AddNewHandler={ openAddNewDialog } url="/api/fantasy-league/search" title={TITLE_ADMIN_FANTASY_LEAGUES} addDialog={DIALOG_ADD_FANTASY_LEAGUES} deleteDialog={DIALOG_CONFIRMATION} />
        

        <div className="table">
          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>Name</th>
                <th>Grand Prix League</th>
                <th>Type</th>
                <th>Year</th>
                <th>Total Teams</th>
                <th>Team Size</th>
                <th>Draft Date & Time</th>
                <th>Winner</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.data?
                data?.data.data.map((obj:any, index:number) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual}/></td>
                    <td>{obj.name}</td>
                    <td>{obj.grandPrixLeague.name}</td>
                    <td>{obj.type}</td>
                    <td>{obj.year}</td>
                    <td>{obj.totalTeams}</td>
                    <td>{obj.teamSize}</td>
                    <td>{computeDate(obj.createdAt)}</td>
                    <td>{obj.winner}</td>
                    <td>
                      <button onClick={()=>{fetchGrandPrixforEditDialog(obj._id)}}>
                        <i className="fa-solid fa-pen" style={{color: "#89bfeb"}}></i>
                      </button>
                      <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_FANTASY_LEAGUES, "/api/fantasy-league/delete", obj._id)}}>
                        <i className="fa-solid fa-trash-can" style={{color: "#df4646"}}></i>
                      </button>
                    </td>
                  </tr>
                )):(<tr></tr>)
              }
            </tbody>

          </table>
        </div>

        <Pagination title={TITLE_ADMIN_FANTASY_LEAGUES} page_num={data?.data?data.data.page_num:1} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end))?data?.data?.data.length:data?.data?.total} />

      </div>

    </>
  )

}

export default FantasyLeagues;