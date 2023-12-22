import React, { useEffect, useRef } from 'react'
import tableStyles from "@/styles/pagesTables.module.css";

import images from "@/constants/images";
import Navbar from '@/Components/Navbar/Navbar'
import { NameAndExportData } from '@/Components/NameAndExportData/NameAndExportData'
import { SearchBar } from '@/Components/SearchBar/SearchBar'
import { Pagination } from '@/Components/Pagination/Pagination'
import { DIALOG_ADD_TOURNAMENTS, DIALOG_CONFIRMATION, DIALOG_UPDATE_TOURNAMENTS } from '@/constants/dialog-names'
import Image from 'next/image';
import { TITLE_ADMIN_TOURNAMENTS } from '@/constants/page-titles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { computeDate, getRequest, navigateTo, openDeleteDialog, select_all, select_individual } from '@/utils/general';
import { openAddNewDialog, openTournamentEditDialog } from '@/utils/tournament';
import { useSelector } from 'react-redux';
import store from '@/Redux/store';
import { isLoading } from '@/Redux/actions/loader';
import { ADMIN_TOURNAMENTS_DELETE_ROUTE, ADMIN_TOURNAMENTS_DOWNLOAD_RECORD_ROUTE, ADMIN_TOURNAMENTS_LIST_ROUTE, ADMIN_TOURNAMENTS_SEARCH_ROUTE, BASE_URL } from '@/constants/backend-routes';
import { setLoadedData } from '@/Redux/actions/pagination';
import { UNAUTHORIZED } from '@/constants/constants';
import { ROUTE_SIGNIN } from '@/constants/routes';
import { toast } from 'react-toastify';


const Tournaments = () => {
  const data = useSelector((state: any) => { return state.pagination.title === TITLE_ADMIN_TOURNAMENTS ? state.pagination : null });

  useEffect(() => {
    if (!data?.data) {
      store.dispatch(isLoading(true));
      getRequest(`${ADMIN_TOURNAMENTS_LIST_ROUTE}?pageNum=${data ? data.page_num : 1}`).then((response: any) => {
          store.dispatch(setLoadedData(TITLE_ADMIN_TOURNAMENTS, response?.data?.result, data?data.page_num : 1));
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


  let tournamentCatagory_AllRef:any = useRef();
  let tournamentCatagory_GeneralRef:any = useRef();
  let tournamentCatagory_GrandPrixRef:any = useRef();

  const manageClick = (e:any) => {
    if(e.currentTarget===tournamentCatagory_AllRef.current){
      tournamentCatagory_AllRef.current.setAttribute("data-active", "yes");
      tournamentCatagory_GeneralRef.current.setAttribute("data-active", "no");
      tournamentCatagory_GrandPrixRef.current.setAttribute("data-active", "no");
    }
    else if(e.currentTarget===tournamentCatagory_GeneralRef.current){
      tournamentCatagory_AllRef.current.setAttribute("data-active", "no");
      tournamentCatagory_GeneralRef.current.setAttribute("data-active", "yes");
      tournamentCatagory_GrandPrixRef.current.setAttribute("data-active", "no");
    }
    else if(e.currentTarget===tournamentCatagory_GrandPrixRef.current){
      tournamentCatagory_AllRef.current.setAttribute("data-active", "no");
      tournamentCatagory_GeneralRef.current.setAttribute("data-active", "no");
      tournamentCatagory_GrandPrixRef.current.setAttribute("data-active", "yes");
    }
  }

  return (

    <>

      <Navbar index={6} />

      <title>{TITLE_ADMIN_TOURNAMENTS}</title>

      <div className={tableStyles.container}>

        <NameAndExportData url={ADMIN_TOURNAMENTS_DOWNLOAD_RECORD_ROUTE} title={TITLE_ADMIN_TOURNAMENTS} >
          <button ref={tournamentCatagory_AllRef} data-active="yes" onClick={manageClick}>All</button>
          <button ref={tournamentCatagory_GeneralRef} data-active="no" onClick={manageClick}>General</button>
          <button ref={tournamentCatagory_GrandPrixRef} data-active="no" onClick={manageClick}>Grand Prix</button>
        </NameAndExportData>

        <SearchBar AddNewHandler={openAddNewDialog} url={ADMIN_TOURNAMENTS_SEARCH_ROUTE} title={TITLE_ADMIN_TOURNAMENTS} deleteDialog={DIALOG_CONFIRMATION} />

        <div className={tableStyles.table}>

          <table>

            <thead>
              <tr>
                <th><input type="checkbox" name="select_all" onChange={select_all} /></th>
                <th>Tournament</th>
                <th>Category</th>
                <th>Game</th>
                <th>Picture</th>
                <th>Entry Fee</th>
                <th>Prize</th>
                <th>Team Size</th>
                <th>Total Teams</th>
                <th>Start Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {(data?.data && data?.data?.total)?
              data?.data?.data?.map((obj: any, index: number) => (
                <tr key={index}>
                  <td><input type="checkbox" name="selection-box" value={obj._id} onChange={select_individual} /></td>
                  <td>{obj.name}</td>
                  <td>{obj.catagory}</td>
                  <td>{obj.gameName.name}</td>
                  <td className={tableStyles.imgCenter} >
                    <Image src={obj.picture?BASE_URL+obj.picture:images.USER} alt="" width={50} height={50} />
                  </td>
                  <td>${obj.entryFee}</td>
                  <td>${obj.prize}</td>
                  <td>{obj.teamSize}</td>
                  <td>{obj.totalTeams}</td>
                  <td>{computeDate(obj.startingDate)}</td>
                  <td>
                    <a className='not-a-button' onClick={() => { openTournamentEditDialog(obj._id) }}>
                      <FontAwesomeIcon icon={faPen} style={{ color: "#89bfeb" }} />
                    </a>
                    <a className='not-a-button' onClick={() => { openDeleteDialog(TITLE_ADMIN_TOURNAMENTS, ADMIN_TOURNAMENTS_DELETE_ROUTE, obj._id) }}>
                      <FontAwesomeIcon icon={faTrashCan} style={{ color: "#df4646" }} />
                    </a>
                  </td>
                </tr>
              )) : <tr><td colSpan={11}>No Data Found</td></tr>}
              
            </tbody>

          </table>

        </div>

        <Pagination title={TITLE_ADMIN_TOURNAMENTS} start={data?.data?.start} end={data?.data?.end} total={(!(data?.data?.start && data?.data?.end))? data?.data?.data?.length : data?.data?.total} />

      </div>

    </>

  )

}


export default Tournaments;