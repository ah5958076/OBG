import React, { useEffect } from 'react'

import NO_PIC from "../../assets/no-pic.png";
import { Navbar } from '../../../../Components/Navbar/Navbar'
import { SearchBar } from '../../../../Components/SearchBar/SearchBar'
import { NameAndExportData } from '../../../../Components/NameAndExportData/NameAndExportData'
import { Pagination } from '../../../../Components/Pagination/Pagination'
import { DIALOG_ADD_GP_LEAGUES, DIALOG_CONFIRMATION, TITLE_ADMIN_GPLEAGUES } from '../../../../constants/constants'
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux'
import store from '../../../../Redux/store'
import { isLoading } from '../../../../Redux/actions/loader'
import { computeDate, makeXMLRequest, openDeleteDialog, select_all, select_individual } from '../../../../utils/general'
import { setLoadedData } from '../../../../Redux/actions/pagination'
import { fetchGamesforEditDialog, openAddNewDialog } from '../../../../utils/gpLeagues';
import Image from 'next/image';


export const GPLeagues = (props:any) => {
  const data = useSelector((state:any) => {return state.PagesLoading.title===TITLE_ADMIN_GPLEAGUES?state.PagesLoading:null});
  const router = useRouter();

  useEffect(() => {
    if(!data?.data){
      store.dispatch(isLoading(true));
      makeXMLRequest(`/api/gp-league/list?page_num=${data?data.page_num:1}`, "get").then((response:any) => {
        if(response.auth===true){
          store.dispatch(setLoadedData(TITLE_ADMIN_GPLEAGUES, response, data?data.page_num:1));
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

      <Navbar index={2}/>

      <title>{props.title}</title>

      <div className="container">

        <NameAndExportData url="/api/gp-league/download-record" title="GP Leagues" />
        <SearchBar AddNewHandler={ openAddNewDialog } url="/api/gp-league/search" title={TITLE_ADMIN_GPLEAGUES} addDialog={DIALOG_ADD_GP_LEAGUES} deleteDialog={DIALOG_CONFIRMATION} />

        <div className="table">
          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={ select_all } /></th>
                <th>Name</th>
                <th>Game</th>
                <th>Picture</th>
                <th>Entry Fee</th>
                <th>Prize</th>
                <th>Team Size</th>
                <th>Total Teams</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {data?.data?
                data?.data.data.map((obj:any, index:any) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual}/></td>
                    <td>{obj.name}</td>
                    <td>{obj.gameName.name}</td>
                    <td className="td-pic"><Image src={ obj.picture?"/"+obj.picture:NO_PIC } alt="" /></td>
                    <td>{obj.entryFee}</td>
                    <td>{obj.prize}</td>
                    <td>{obj.teamSize}</td>
                    <td>{obj.totalTeams}</td>
                    <td>{computeDate(obj.startingDate)}</td>
                    <td>{computeDate(obj.endingDate)}</td>
                    <td>
                      <button onClick={()=>{fetchGamesforEditDialog(obj._id)}}>
                        <i className="fa-solid fa-pen" style={{color: "#89bfeb"}}></i>
                      </button>
                      <button onClick={()=>{openDeleteDialog(TITLE_ADMIN_GPLEAGUES, "/api/gp-league/delete", obj._id)}}>
                        <i className="fa-solid fa-trash-can" style={{color: "#df4646"}}></i>
                      </button>
                    </td>
                  </tr>
                )):(<tr></tr>)
              }
            </tbody>

          </table>
        </div>

        <Pagination title={TITLE_ADMIN_GPLEAGUES} page_num={data?.data?data.data.page_num:1} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end))?data?.data?.data.length:data?.data?.total} />

      </div>

    </>
  )

}