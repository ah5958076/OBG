import React, { useEffect } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import { NameAndExportData } from "@/Components/NameAndExportData/NameAndExportData"
import Navbar from "@/Components/Navbar/Navbar"
import { SearchBar } from "@/Components/SearchBar/SearchBar"
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_CONFIRMATION } from '@/constants/dialog-names'
import { TITLE_ADMIN_FANTASY_LEAGUES } from '@/constants/page-titles'
import { useSelector } from 'react-redux'
import { computeDate, getRequest, navigateTo, openDeleteDialog, select_all, select_individual } from '@/utils/general'
import { addNewHandler, openAddNewDialog, updateDialogDisplayHandler } from '@/utils/fantasyLeagues';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { ADMIN_FANTASY_LEAGUE_DELETE_ROUTE, ADMIN_FANTASY_LEAGUE_DOWNLOAD_RECORD_ROUTE, ADMIN_FANTASY_LEAGUE_LIST_ROUTE, ADMIN_FANTASY_LEAGUE_SEARCH_ROUTE } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';
import Link from 'next/link';





const FantasyLeagues = () => {
  const data = useSelector((state: any) => { return state.pagination.title === TITLE_ADMIN_FANTASY_LEAGUES ? state.pagination : null });

  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_FANTASY_LEAGUE_LIST_ROUTE}?pageNum=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(TITLE_ADMIN_FANTASY_LEAGUES, response?.data?.result, data?data.page_num : 1));
          store.dispatch(isLoading(false));
      }).catch((err: any) => {
        if(err?.status===UNAUTHORIZED){
          localStorage.removeItem("token");
          navigateTo(null, ROUTE_SIGNIN);
        }
        toast.error(err?.data?.message);
        store.dispatch(isLoading(false));
      });
    }
  }, [data]);
  

  return (

    <>

      <Navbar index={3} />

      <title>{TITLE_ADMIN_FANTASY_LEAGUES}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url={ADMIN_FANTASY_LEAGUE_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_FANTASY_LEAGUES} />
        <SearchBar AddNewHandler={openAddNewDialog} url={ADMIN_FANTASY_LEAGUE_SEARCH_ROUTE} title={TITLE_ADMIN_FANTASY_LEAGUES} addDialog={addNewHandler} deleteDialog={DIALOG_CONFIRMATION} />


        <div className={tableStyles.table}>
          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={select_all} /></th>
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

              {(data?.data && data?.data?.total)?
                data?.data?.data?.map((obj: any, index: number) => (
                  <tr key={index}>
                    <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual} /></td>
                    <td>{obj.name}</td>
                    <td>{obj.grandPrixLeague.name}</td>
                    <td>{obj.type}</td>
                    <td>{obj.year}</td>
                    <td>{obj.totalTeams}</td>
                    <td>{obj.teamSize}</td>
                    <td>{computeDate(obj.createdAt)}</td>
                    <td>{obj.winner}</td>
                    <td>
                      <Link href="#" onClick={(e) => { updateDialogDisplayHandler(obj._id) }}>
                        <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }}/>
                      </Link>
                      <Link href="#" onClick={() => { openDeleteDialog(TITLE_ADMIN_FANTASY_LEAGUES, ADMIN_FANTASY_LEAGUE_DELETE_ROUTE, obj._id) }}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#df4646" }}/>
                      </Link>
                    </td>
                  </tr>
                )) : <tr><td colSpan={10}>No data found</td></tr>
              }
            </tbody>

          </table>
        </div>

        <Pagination title={TITLE_ADMIN_FANTASY_LEAGUES} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end)) ? data?.data?.data.length : data?.data?.total} />

      </div>

    </>
  )

}

export default FantasyLeagues;